const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoute.cjs');
const movieRoutes = require('./routes/movieRoutes.cjs');
const theaterRoutes = require('./routes/theaterRoutes.cjs'); // ✅ Corrected
const bookingRoutes = require('./routes/bookingRoutes.cjs');
const adminMoviesRouter = require('./routes/AdminRoutes.cjs');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/theaters', theaterRoutes); 
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin/movies', adminMoviesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
