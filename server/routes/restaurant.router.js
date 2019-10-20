const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');

/**
 * GET route template
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT *
                    FROM "restaurants"
                    WHERE "user_id" = $1
                        AND "collection_id" = $2;`;
    console.log(req.user.id, req.params.id);
    pool.query(queryText, [req.user.id, req.params.id])
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting restaurants', error),
        res.sendStatus(500);
    })
});


router.get('/single/:id', rejectUnauthenticated, (req, res) => {
    const restaurantId = req.params.id;
    // const userId = req.user.id
    let queryText = `SELECT "restaurants".id, "restaurants".name, "restaurants".google_places_id, "collections".name AS collection, "collections".id AS collection_id
                    FROM "restaurants"
                    JOIN "collections"
                        ON "collections".id = "restaurants".collection_id
                    WHERE "restaurants".id = $1;`;
    pool.query(queryText, [restaurantId])
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting restaurant data', error),
        res.sendStatus(500);
    })
});

router.get('/google/:id', rejectUnauthenticated, (req, res)=>{
    const placesId = req.params.id;
    const endpoint = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placesId}&key=${process.env.REACT_APP_API_KEY}`

    axios({
        method: 'GET',
        url: endpoint
    }).then((response)=>{
        res.send(response.data.result);
    }).catch((error)=>{
        console.log('error getting the google info', error)
        res.sendStatus(500);
    })
});

router.post('/', rejectUnauthenticated, (req, res) => {
    const name = req.body.name;
    const collectionId = req.body.collectionId;
    const userId = req.user.id;
    const googleId = req.body.placesId;
    
    let queryText = `INSERT INTO "restaurants" ("name", "collection_id", "user_id", "google_places_id")
                        VALUES ($1, $2, $3, $4)
                        RETURNING id;`;
    pool.query(queryText, [name, collectionId, userId, googleId])
    .then((result)=>{
        res.send(result.rows)
    }).catch((error)=>{
        console.log('error adding restaurant', error);
        res.sendStatus(500);
    })

});

router.put('/', rejectUnauthenticated, (req, res)=>{
    const restaurantId = req.body.restaurantId;
    const collectionId = req.body.collectionId;
    
    let queryText = `UPDATE "restaurants"
	                    SET "collection_id" = $1
                        WHERE "id" = $2;`;
    pool.query(queryText, [collectionId, restaurantId])
    .then((result)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error updating collection', error);
    })
})

router.delete('/:id', rejectUnauthenticated, (req, res)=>{
    const restaurantId = req.params.id;

    let queryText = `DELETE 
                    FROM "restaurants"
                    WHERE "id" = $1;`;
    pool.query(queryText, [restaurantId])
    .then((result)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error deleting the restaurant', error);
    })
})

module.exports = router;