const express = require('express');
const router = express.Router();
const {
  createTheater,
  getAllTheaters,
<<<<<<< HEAD
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
=======
  getTheaterById,
  updateTheater,
  deleteTheater,
  getTheatersForMovie
} = require('../routes/theaterController.cjs');
const { verifyAdmin, verifyUser } = require('../Authorization/auth.cjs');
const { pool } = require('../db/db.cjs');

router.post('/', verifyAdmin, async (req, res) => {
  const { name, location, seats, movie_name, show_time } = req.body;
  const createdBy = req.user.id;

  const total_seats = parseInt(seats, 10);
  if (isNaN(total_seats)) {
    return res.status(400).json({ error: "Invalid total_seats value" });
  }

  try {
    // 1. Create Theater
    const theaterResult = await pool.query(
      'INSERT INTO theaters (name, location, total_seats, created_by) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, location, total_seats, createdBy]
    );
    const theaterId = theaterResult.rows[0].id;

    // 2. Create dynamic table for theater
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS theater_${theaterId} (
        id SERIAL PRIMARY KEY,
        movie_id INT,
        show_time TIMESTAMP,
        seat_number INT,
        status VARCHAR(50) DEFAULT 'available'
      );
    `;
    await pool.query(createTableQuery);

    // 3. Insert Movie to global `movies` table
    const movieInsert = await pool.query(
      `INSERT INTO movies 
        (title, description, poster_url, release_date, show_time, price, seats, created_by) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [
        movie_name,                 
        "Auto generated",           
        "",                         
        new Date(),                 
        show_time,                   
        200,                         
        total_seats,                 
        createdBy                
      ]
    );
    
    const movieId = movieInsert.rows[0].id;

    // 4. Populate `theater_<id>` with seats for that movie and show time
    const insertSeats = [];
    for (let seat = 1; seat <= total_seats; seat++) {
      insertSeats.push(pool.query(
        `INSERT INTO theater_${theaterId} (movie_id, show_time, seat_number) VALUES ($1, $2, $3)`,
        [movieId, show_time, seat]
      ));
    }
    await Promise.all(insertSeats);

    res.json({ success: true, theaterId, movieId });
  } catch (err) {
    console.error('Error creating theater or movie:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
  }
});


<<<<<<< HEAD
=======
// router.post('/', verifyAdmin, async (req, res) => {
//   const { name, location, seats } = req.body;
//   const createdBy = req.user.id;

//   console.log("Received data:", { name, location, seats, createdBy });

//   const total_seats = parseInt(seats, 10);
//   if (isNaN(total_seats)) {
//     return res.status(400).json({ error: "Invalid total_seats value" });
//   }

//   try {
//     const result = await pool.query(
//       'INSERT INTO theaters (name, location, total_seats, created_by) VALUES ($1, $2, $3, $4) RETURNING id',
//       [name, location, total_seats, createdBy]
//     );

//     const theaterId = result.rows[0].id;

//     const createTableQuery = `
//       CREATE TABLE IF NOT EXISTS theater_${theaterId} (
//         id SERIAL PRIMARY KEY,
//         movie_id INT,
//         show_time TIMESTAMP,
//         seat_number INT,
//         status VARCHAR(50) DEFAULT 'available'
//       );
//     `;
//     await pool.query(createTableQuery);

//     res.json({ success: true, theaterId });
//   } catch (err) {
//     console.error('Error inserting theater:', err);
//     res.status(500).json({ error: 'Database error', details: err.message });
//   }
// });

router.get('/', async (req, res) => {
  try {
    const theaters = await getAllTheaters();
    res.status(200).json(theaters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET theater by ID
router.get('/:id', async (req, res) => {
  try {
    const theater = await getTheaterById(req.params.id);
    res.status(200).json(theater);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE theater by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, location, total_seats } = req.body;
    const updated = await updateTheater(req.params.id, name, location, total_seats);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE theater
router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteTheater(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET theaters for movie
router.get('/movie', async (req, res) => {
  try {
    const result = await getTheatersForMovie(req.query.movie_id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
module.exports = router;
