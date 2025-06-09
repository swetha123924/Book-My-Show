const express = require('express');
const router = express.Router();
const {
  createTheater,
  getAllTheaters,
  updateTheater,
  deleteTheater,
  getTheatersByMovieTitle
} = require('../routes/theaterController.cjs');
const { pool } = require('../db/db.cjs');

const { verifyAdmin } = require('../Authorization/auth.cjs');

router.post('/', verifyAdmin, createTheater);
router.get('/', verifyAdmin, getAllTheaters);
router.put('/:id', verifyAdmin, updateTheater);
router.delete('/:id', verifyAdmin, deleteTheater);
// routes/theaterRoute.cjs
router.get('/theater', async (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ error: 'Movie title is required' });

  try {
    const result = await pool.query(
      `  SELECT *
        FROM theaters t
        JOIN movies m ON m.theater_name = t.name
        WHERE m.title = $1;`,
      [title]
    );

    // Group showtimes by theater
    const grouped = {};
    result.rows.forEach((row) => {
      if (!grouped[row.id]) {
        grouped[row.id] = {
          id: row.id,
          name: row.name,
          location: row.location,
          showtimes: [],
        };
      }
      grouped[row.id].showtimes.push(row.showtimes);
    });

    res.json(Object.values(grouped));
  } catch (err) {
    console.error('Error fetching theaters:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
