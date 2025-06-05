const { pool } = require('../db/db.cjs');

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
