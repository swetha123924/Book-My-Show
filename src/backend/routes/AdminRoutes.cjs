const express = require('express');
const router = express.Router();
const { pool } = require('../db/db.cjs');
const { verifyAdmin } = require('../Authorization/auth.cjs');

router.post('/', verifyAdmin, async (req, res) => {
  const { title, description, poster_url, release_date, show_time, price, seats } = req.body;
  const createdBy = req.user.id;
    const result = await pool.query(
      `INSERT INTO movies (title, description, poster_url, release_date, show_time, price, seats, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [title, description, poster_url, release_date, show_time, price, seats, createdBy]
    );
    res.status(201).json(result.rows[0]);
});

module.exports = router;
