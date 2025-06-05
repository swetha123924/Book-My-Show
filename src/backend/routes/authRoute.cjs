require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {pool} = require('../db/db.cjs');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;


router.post('/register', async (req, res) => {
      const { username, email, password, role = 'user' } = req.body;
  
      const userExist = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (userExist.rows.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const result = await pool.query(
        "INSERT INTO users(name, password, email, role) VALUES($1, $2, $3, $4) RETURNING id, name, email, role",
        [username, hashedPassword, email, role]
      );
  
      const user = result.rows[0];
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: '1h',
      });
  
      if (role === 'user') {
        await pool.query(`
          CREATE TABLE IF NOT EXISTS booking_history_user_${user.id} (
            id SERIAL PRIMARY KEY,
            movie_title TEXT,
            booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            seat_number TEXT,
            amount_paid NUMERIC
          )
        `);
      } else if (role === 'admin') {
        await pool.query(`
          CREATE TABLE IF NOT EXISTS theaters_admin_${user.id} (
            id SERIAL PRIMARY KEY,
            theater_name TEXT,
            location TEXT,
            movie_title TEXT,
            show_time TIMESTAMP,
            available_seats INTEGER,
            price NUMERIC
          )
        `);
      }
  
      res.status(201).json({ token, user });
});
  
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
    localStorage.setItem('token', token); 
});


module.exports = router;
