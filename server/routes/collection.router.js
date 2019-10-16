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
router.post('/', (req, res) => {

});

module.exports = router;