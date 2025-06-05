const express = require('express');
const { pool } = require('../db/db.cjs');
const { verifyAdmin } = require('../Authorization/auth.cjs');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM movies ORDER BY created_by DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error getting movies:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM movies WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error getting movie:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', verifyAdmin, async (req, res) => {
  const { title, description, poster_url, release_date, show_time, price, seats } = req.body;

  if (!title || !show_time || !price || !seats) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(`
      INSERT INTO movies (title, description, poster_url, release_date, show_time, price, seats, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [title, description, poster_url, release_date, show_time, price, seats, req.user.id]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating movie:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', verifyAdmin, async (req, res) => {
  const { title, description, poster_url, release_date, show_time, price, seats } = req.body;

  try {
    const result = await pool.query(`
      UPDATE movies
      SET title = $1,
          description = $2,
          poster_url = $3,
          release_date = $4,
          show_time = $5,
          price = $6,
          seats = $7
      WHERE id = $8
      RETURNING *
    `, [title, description, poster_url, release_date, show_time, price, seats, req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating movie:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM movies WHERE id = $1 RETURNING id', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie deleted' });
  } catch (err) {
    console.error('Error deleting movie:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
