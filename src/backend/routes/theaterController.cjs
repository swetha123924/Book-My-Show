const { pool } = require('../db/db.cjs');

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