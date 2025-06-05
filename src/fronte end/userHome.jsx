import { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';

export default function UserHome() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/movies')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMovies(data);
        } else {
          console.error('Expected an array but got:', data);
          setError('Failed to load movies: Invalid data format.');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies: Server error.');
        setLoading(false);
      });
  }, []);


  return (
    <div className="flex flex-col  bg-gray-50">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">Now Showing</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className="h-56 bg-gray-200">
                  {movie.poster_url ? (
                    <img src={movie.poster_url} alt={movie.title} className="w-full h-full object-contain p-2" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-2xl font-semibold text-gray-800 truncate">{movie.title}</h2>
                  <p className=" text-gray-500 text-sm">
                    <span className="font-medium">Release: </span>
                    {movie.release_date || 'TBA'}
                  </p>
                  <button onClick={() => navigate(`/movies/${movie.id}`)} className="mt-auto bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition self-start">
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center text-gray-500">No movies available</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
