const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect();
    console.log(' Connected to database');

    // 1. users table
    pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(200) UNIQUE NOT NULL,
        password VARCHAR(200) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW()
      );`);

    // 2. movies table
     pool.query(`
     CREATE TABLE IF NOT EXISTS movies (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      poster_url TEXT,
      release_date DATE,
      show_time TIMESTAMP NOT NULL,
      price INT NOT NULL,
      seats INT NOT NULL,
      created_by INT REFERENCES users(id)
    );`);

    // 3. theatres table
    pool.query(`
      CREATE TABLE IF NOT EXISTS theaters (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        location VARCHAR(200) NOT NULL,
        total_seats INTEGER NOT NULL,
        created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );`);    


    // 5. bookings table
    pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        show_id INTEGER REFERENCES shows(id) ON DELETE CASCADE,
        seats JSONB NOT NULL,
        total_price NUMERIC NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );`);

    // 6. payments table
    pool.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
        amount NUMERIC NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        paid_at TIMESTAMP DEFAULT NOW()
      );`);

    console.log(' Tables are created or already exist');
;


module.exports = { pool };
