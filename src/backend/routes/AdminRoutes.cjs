const express = require('express');
const router = express.Router();
const { pool } = require('../db/db.cjs');
const { verifyAdmin } = require('../Authorization/auth.cjs');

<<<<<<< HEAD
// CREATE a new movie
router.post('/', verifyAdmin, async (req, res) => {
  const showTimeOnly = new Date(show_time).toTimeString().split(' ')[0]; 
  try {
   const {
  title, description, poster_url, release_date, show_time,
  price, seats, duration, genre, language, rating, trailer_url, theater_name
} = req.body;

    const createdBy = req.user.id;

    const result = await pool.query(
      `INSERT INTO movies (title, description, poster_url, release_date, show_time, price, seats, created_by, duration, genre, language, rating, trailer_url, theater_name)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING *`,
      [title, description, poster_url, release_date, showTimeOnly, price, seats, createdBy, duration, genre, language, rating, trailer_url, theater_name]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating movie:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// READ all movies created by this admin
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const adminId = req.user.id;
    const result = await pool.query('SELECT * FROM movies WHERE created_by = $1 ORDER BY id DESC', [adminId]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching movies:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// READ a single movie by ID
router.get('/:id', verifyAdmin, async (req, res) => {
  try {
    const adminId = req.user.id;
    const { id } = req.params;

    const result = await pool.query('SELECT * FROM movies WHERE id = $1 AND created_by = $2', [id, adminId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Movie not found or not authorized' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching movie:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE a movie// UPDATE a movie
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const adminId = req.user.id;
    const { id } = req.params;
    const {
      title,
      description,
      poster_url,
      release_date,
      show_time,
      price,
      seats,
      duration,
      genre,
      language,
      rating,
      trailer_url,
      theater_name
    } = req.body;

    const result = await pool.query(
      `UPDATE movies
       SET title = $1, description = $2, poster_url = $3, release_date = $4, show_time = $5,
           price = $6, seats = $7, duration = $8, genre = $9, language = $10,
           rating = $11, trailer_url = $12, theater_name = $13
       WHERE id = $14 AND created_by = $15
       RETURNING *`,
     [title, description, poster_url, release_date, show_time, price, seats, duration, genre, language, rating, trailer_url, theater_name, id, adminId]


    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Movie not found or not authorized' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating movie:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// DELETE a movie
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const adminId = req.user.id;
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM movies WHERE id = $1 AND created_by = $2 RETURNING id',
      [id, adminId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Movie not found or not authorized' });
    }

    res.status(200).json({ message: 'Movie deleted successfully', id: result.rows[0].id });
  } catch (err) {
    console.error('Error deleting movie:', err);
    res.status(500).json({ error: 'Server error' });
  }
=======
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
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
});

module.exports = router;
