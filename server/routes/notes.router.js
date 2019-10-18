const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/:id', rejectUnauthenticated, (req, res) => {
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

router.get('/update/:id', rejectUnauthenticated, (req, res) => {
    const noteId = req.params.id;
    let queryText = `SELECT *
                    FROM "notes"
                    WHERE "notes".id = $1;`;
    pool.query(queryText, [noteId])
    .then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting restaurant data', error),
        res.sendStatus(500);
    })
});

router.post('/', rejectUnauthenticated, (req, res) => {
    const restaurantId = req.body.restaurantId;
    const userId = req.user.id;
    const newNote = req.body.newNote;
    
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

router.put('/', rejectUnauthenticated, (req, res)=> {
    const newNote = req.body.newNote;
    const noteId = req.body.noteId;
    console.log(newNote, noteId);
    let queryText = `UPDATE "notes"
	                    SET "notes_field" = $1, "date_time_modified" = CURRENT_TIMESTAMP
                    WHERE "notes".id = $2;`;
    pool.query(queryText, [newNote, noteId])
    .then((result)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error updating note', error),
        res.sendStatus(500);
    })
})

router.delete('/:id', rejectUnauthenticated, (req, res)=> {
    const noteId = req.params.id;
    
    let queryText = `DELETE
                    FROM "notes"
                    WHERE "id" = $1;`;
    pool.query(queryText, [noteId])
    .then((result)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error updating note', error),
        res.sendStatus(500);
    })
})

module.exports = router;