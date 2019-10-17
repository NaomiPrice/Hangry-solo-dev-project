const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
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


router.get('/single/:id', (req, res) => {
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

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;