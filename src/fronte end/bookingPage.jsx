import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';

export default function BookingPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const movieRes = await fetch(`http://localhost:5000/api/movies/${id}`);
        const movieData = await movieRes.json();
        console.log('movie data:', movieData);
        setMovie(movieData);

        if (movieData.title) {
          const theaterRes = await fetch(`http://localhost:5000/api/theaters/theater?title=${encodeURIComponent(movieData.title)}`);
          const theatersData = await theaterRes.json();
          console.log('theaters data:', theatersData);
          setTheaters(theatersData);
        } else {
          setError('Movie title not found.');
        }

        setLoading(false);
      } catch (err) {
        console.error('Booking Page error:', err);
        setError('Failed to load booking info.');
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [id]);

  // Show a loading state while the data is being fetched
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1 p-6 max-w-5xl mx-auto">
          <p>Loading movie details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Show an error message if something went wrong
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1 p-6 max-w-5xl mx-auto">
          <p className="text-red-600">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 p-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
          {movie?.poster_url && (
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="w-32 h-48 object-cover rounded-xl shadow-md"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{movie?.title}</h1>
            <p className="text-gray-500 mt-2">{movie?.description || 'No description available.'}</p>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Duration:</span> {movie?.duration || 'N/A'} mins | 
              <span className="ml-2 font-medium">Language:</span> {movie?.language || 'N/A'} | 
              <span className="ml-2 font-medium">Rating:</span> {movie?.rating ? `${movie.rating}/10` : 'N/A'}
              <button onClick={() => navigate(`/showtimes/${id}`)} className="ml-4 bg-red-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-700 transition">
                Select seat
              </button>
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Available Theaters & Showtimes</h2>
        <div className="space-y-6">
          {theaters.length > 0 ? (
            theaters.map((theater) => (
              <div key={theater.id} className="bg-white rounded-xl shadow p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{theater.name}</h3>
                    <p className="text-sm text-gray-500">{theater.location}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
                    {Array.isArray(theater.showtimes) && theater.showtimes.length > 0 ? (
                      theater.showtimes.map((time, index) => (
                        <Link
                          to={`/showtimes/${theater.id}`}
                          key={index}
                          className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-full text-sm transition"
                        >
                          {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Link>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400 italic">No showtimes available</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No theaters available for this movie.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
