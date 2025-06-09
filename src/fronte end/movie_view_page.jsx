
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { useParams } from "react-router-dom";

export default function DetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch movie');
        return res.json();
      })
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('GET /api/movies/:id error:', err);
        setError('Movie not found.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Check if movie object is available before trying to access its properties
  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 p-8 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            {movie.poster_url ? (
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>
          <div className="md:w-1/2 flex flex-col">
            <h1 className="text-4xl font-bold text-gray-800">{movie.title}</h1>
            <p className="mt-2 text-gray-600">{movie.description || 'No description available.'}</p>
            <p className="mt-4 text-gray-500">
              <span className="font-medium">Duration:</span>{' '}
              {movie.duration ? `${movie.duration} mins` : 'N/A'}
            </p>
            <p className="mt-2 text-gray-500">
              <span className="font-medium">Rating:</span>{' '}
              {movie.rating ? `${movie.rating} / 10` : 'N/A'}
            </p>
            <p className="mt-2 text-gray-500">
              <span className="font-medium">Genre:</span>{' '}
              {movie.genre}
            </p>
            <p className="mt-2 text-gray-500">
              <span className="font-medium">Language:</span>{' '}
              {movie.language || 'N/A'}
            </p>
            <p className="mt-2 text-gray-500">
              <span className="font-medium">Trailer</span>{' '}
              {movie.trailer_url ? (
                <a
                  href={movie.trailer_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:underline"
                >
                  Watch Trailer
                </a>
              ) : (
                'Not available'
              )}
            </p>
            <p className="mt-2 text-gray-500">
              <span className="font-medium">Release Date:</span>{' '}
              {movie.release_date || 'TBA'}
            </p>
            <button
              onClick={() => navigate(`/booking/${movie.id}`)}
              className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition mt-6"
            >
              Book Tickets
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
