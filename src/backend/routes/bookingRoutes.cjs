const express = require('express');
const router = express.Router();
const pool = require('../db/db.cjs');

router.post('/', async (req, res) => {
  const { user_id, show_id, seats, total_price } = req.body;
    const result = await pool.query(
      'INSERT INTO bookings (user_id, show_id, seats, total_price) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, show_id, JSON.stringify(seats), total_price]
    );
    res.json(result.rows[0]);
});

module.exports = router;
