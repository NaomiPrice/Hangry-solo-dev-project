const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT *
                    FROM "collections"
                    WHERE "user_id" = $1;`
    pool.query(queryText, [req.user.id]).then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting collections', error);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    const newCollection = req.body.newCollection;
    const queryText = `INSERT INTO "collections" ("name", "user_id")
                        VALUES ($1, $2);`;
    pool.query(queryText, [newCollection, userId])
    .then((result)=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('error creating new collection', error);
        res.sendStatus(500);
    })
});

module.exports = router;