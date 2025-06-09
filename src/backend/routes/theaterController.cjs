const { pool } = require('../db/db.cjs');

<<<<<<< HEAD
// Create a theater
exports.createTheater = async (req, res) => {
  const { name, location, seats } = req.body;
  const created_by = req.user.id;

  try {
    const result = await pool.query(
      `INSERT INTO theaters (name, location, total_seats, created_by)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, location, seats, created_by]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add theater' });
  }
};

// Get all theaters created by admin
exports.getAllTheaters = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM theaters WHERE created_by = $1 ORDER BY created_at DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch theaters' });
  }
};

// Update a theater
exports.updateTheater = async (req, res) => {
  const { id } = req.params;
  const { name, location, seats } = req.body;
  try {
    const result = await pool.query(
      `UPDATE theaters SET name = $1, location = $2, total_seats = $3 WHERE id = $4 AND created_by = $5 RETURNING *`,
      [name, location, seats, id, req.user.id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Theater not found or not authorized' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update theater' });
  }
};

// Delete a theater
exports.deleteTheater = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM theaters WHERE id = $1 AND created_by = $2 RETURNING *`,
      [id, req.user.id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Theater not found or not authorized' });
    res.json({ message: 'Theater deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete theater' });
  }
};

const getTheatersByMovieTitle = async (req, res) => {
  const { title } = req.query;
  if (!title) {
    return res.status(400).json({ error: 'Movie title is required' });
  }

  try {
    const result = await pool.query(
      `
     SELECT *
        FROM theaters t
        JOIN movies m ON m.theater_name = t.name
        WHERE m.title = $1;
      `,
      [title]
    );
    console.log('Fetched theaters:', result.rows); // Log the fetched theaters
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching theaters by title:', err);
    res.status(500).json({ error: 'Failed to fetch theaters' });
  }
};

exports.getTheatersByMovieTitle = getTheatersByMovieTitle;
=======
const createTheater =async (req, res) => {
  try {
    const { name, location, seats } = req.body;
    const created_by = req.user.id;

    const query = `
      INSERT INTO theaters (name, location, total_seats, created_by)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const values = [name, location, seats, created_by];
    const result = await pool.query(query, values);
    const theaterId = result.rows[0].id;

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

    res.status(201).json({ success: true, theaterId });
  } catch (err) {
    console.error(' Error creating theater:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET all theatres
async function getAllTheaters() {
  try {
    const result = await pool.query(`
      SELECT id, name, location, total_seats, created_by, created_at
      FROM theaters
      ORDER BY created_at DESC
    `);
    return result.rows;
  } catch (err) {
    console.error('Error fetching theatres:', err);
    throw new Error('Failed to fetch theatres');
  }
}

// GET theatre by ID
async function getTheaterById(theaterId) {
  try {
    const result = await pool.query(`
      SELECT id, name, location, total_seats, created_by, created_at
      FROM theaters
      WHERE id = $1
    `, [theaterId]);

    if (result.rows.length === 0) {
      throw new Error('Theater not found');
    }

    return result.rows[0];
  } catch (err) {
    console.error(`Error fetching theatre with ID ${theaterId}:`, err);
    throw new Error('Failed to fetch theatre');
  }
}

// UPDATE a theatre by ID
async function updateTheater(theaterId, name, location, totalSeats) {
  try {
    const result = await pool.query(`
      UPDATE theaters
      SET name = $1, location = $2, total_seats = $3
      WHERE id = $4
      RETURNING id, name, location, total_seats, created_by, created_at
    `, [name, location, totalSeats, theaterId]);

    if (result.rows.length === 0) {
      throw new Error('Theater not found');
    }

    return result.rows[0];
  } catch (err) {
    console.error(`Error updating theatre with ID ${theaterId}:`, err);
    throw new Error('Failed to update theatre');
  }
}

// DELETE a theatre by ID
async function deleteTheater(theaterId) {
  try {
    const result = await pool.query(`
      DELETE FROM theaters WHERE id = $1 RETURNING id
    `, [theaterId]);

    if (result.rows.length === 0) {
      throw new Error('Theater not found');
    }

    return { message: 'Theater deleted' };
  } catch (err) {
    console.error(`Error deleting theatre with ID ${theaterId}:`, err);
    throw new Error('Failed to delete theatre');
  }
}

// GET theatres for a specific movie
async function getTheatersForMovie(movieId) {
  try {
    const result = await pool.query(`
      SELECT t.id, t.name, t.location, t.total_seats, t.created_by, t.created_at
      FROM theaters t
      INNER JOIN movie_theatres mt ON mt.theatre_id = t.id
      WHERE mt.movie_id = $1
    `, [movieId]);

    return result.rows;
  } catch (err) {
    console.error('Error fetching theatres for movie:', err);
    throw new Error('Failed to fetch theatres for movie');
  }
}

module.exports = {
  createTheater,
  getAllTheaters,
  getTheaterById,
  updateTheater,
  deleteTheater,
  getTheatersForMovie
};
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
