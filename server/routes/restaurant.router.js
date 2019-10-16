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

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;