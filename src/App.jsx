import './App.css'
import Login from './fronte end/login'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './fronte end/home'
import DetailsPage from './fronte end/movie_view_page'
import BookingPage from './fronte end/bookingPage'
import AdminTheaters from './fronte end/adminTheaters'
function App() {
  return(
      <Router>
        <Routes>
          <Route path="/" element={< Login />} />
          <Route path="/home" element={< Home />} />
          <Route path="/movies/:id" element={<DetailsPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/admin/theaters" element={<AdminTheaters />} />
          
        </Routes>
      </Router>
  )


}

export default App
