
const express = require('express');
const router = express.Router();
const pool = require('../db'); // PostgreSQL pool

router.post('/', async (req, res) => {
  const { user_id, show_id, seats, total_price } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO bookings (user_id, show_id, seats, total_price)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, show_id, JSON.stringify(seats), total_price]
    );

    res.status(201).json({ success: true, booking: result.rows[0] });
  } catch (error) {
    console.error('Error inserting booking:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
