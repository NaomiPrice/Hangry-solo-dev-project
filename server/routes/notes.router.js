const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/:id', (req, res) => {
    const restaurantId = req.params.id;
    // const userId = req.user.id
    let queryText = `SELECT *
                    FROM "restaurants"
                    JOIN "notes"
                        ON "notes".restaurant_id = "restaurants".id
                    WHERE "restaurants".id = $1;`;
    pool.query(queryText, [restaurantId])
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting restaurant data', error),
        res.sendStatus(500);
    })
});

router.get('/update/:id', (req, res) => {
    const noteId = req.params.id;
    let queryText = `SELECT *
                    FROM "notes"
                    WHERE "notes".id = $1;`;
    pool.query(queryText, [noteId])
    .then((result)=>{
        console.log(result.rows)
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting restaurant data', error),
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
    const restaurantId = req.body.restaurantId;
    const userId = req.user.id;
    const newNote = req.body.newNote;
    console.log(restaurantId, userId, newNote);
    let queryText = `INSERT INTO "notes" ("notes_field", "user_id", "restaurant_id")
                    VALUES ($1, $2, $3);`;
    pool.query(queryText, [newNote, userId, restaurantId])
    .then((result)=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('error creating new note', error),
        res.sendStatus(500);
    })
});

module.exports = router;