import './App.css'
import Login from './fronte end/login'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './fronte end/home'
import DetailsPage from './fronte end/movie_view_page'
import BookingPage from './fronte end/bookingPage'
import SeatLayout from './fronte end/showtimes';
import UserHome from './fronte end/userHome'
function App() {
  return(
      <Router>
        <Routes>
          <Route path="/" element={< Login />} />
          <Route path="/home" element={< Home />} />
          <Route path="/movies/:id" element={<DetailsPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/showtimes/:id" element={<SeatLayout />} />
          <Route path="/user/home" element={<UserHome />} />
          {/* Add more routes as needed */}
          
        </Routes>
      </Router>
  )


}

export default App
