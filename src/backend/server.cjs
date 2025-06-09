const express = require('express');
const cors = require('cors');
require('dotenv').config();

<<<<<<< HEAD
const authRoutes = require('./routes/authRoute.cjs');
const movieRoutes = require('./routes/movieRoutes.cjs');
const theaterRoutes = require('./routes/theaterRoutes.cjs'); // ✅ Corrected
const bookingRoutes = require('./routes/bookingRoutes.cjs');
const adminMoviesRouter = require('./routes/AdminRoutes.cjs');


const app = express();
const PORT = process.env.PORT || 5000;
=======
const authRoutes  = require('./routes/authRoute.cjs');
const movieRoutes = require('./routes/movieRoutes.cjs');
const theaterRoutes = require('./routes/theaterRoutes.cjs');
const bookingRoutes = require('./routes/bookingRoutes.cjs');
const paymentRoutes = require('./routes/payment.cjs');
const adminMoviesRouter = require('./routes/AdminRoutes.cjs');

const app = express();
const PORT = process.env.PORT || 3000;
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
<<<<<<< HEAD
app.use('/api/theaters', theaterRoutes); 
app.use('/api/bookings', bookingRoutes);
=======
app.use('/api/theaters', theaterRoutes);
app.use('/api/bookings', bookingRoutes);
// app.use('/api/payments', paymentRoutes);
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
app.use('/api/admin/movies', adminMoviesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
