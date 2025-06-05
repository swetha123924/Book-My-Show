import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';

export default function BookingPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:3000/api/movies/${id}`).then(res => res.json()),
      fetch(`http://localhost:3000/api/theaters?movie_id=${id}`).then(res => res.json()),
    ])
    .then(([movieData, theaterData]) => {
        console.log("Theater data:", theaterData);
        setMovie(movieData);
        setTheaters(Array.isArray(theaterData) ? theaterData : []);  
        setLoading(false);
      })
      
      .catch(err => {
        console.error('Booking Page error:', err);
        setError('Failed to load booking info.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-500 text-lg">Loading booking details...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-red-500 text-lg">{error || 'Booking details not found.'}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{movie.title}</h1>
        <p className="text-gray-500 mb-6">
          Available at the following theaters:
        </p>

        <div className="space-y-6">
          {theaters.map((theater) => (
            <div key={theater.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-700">
                {theater.name}
              </h2>
              <p className="text-sm text-gray-500 mb-2">{theater.location}</p>
              <div className="flex flex-wrap gap-3 mt-2">
                {theater.showtimes.map((time, i) => (
                  <button key={i} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition">
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
