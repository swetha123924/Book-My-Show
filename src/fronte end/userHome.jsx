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
<<<<<<< HEAD
    fetch('http://localhost:5000/api/movies')
=======
    fetch('http://localhost:3000/api/movies')
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMovies(data);
<<<<<<< HEAD
          console.log('Movies fetched successfully:', data);
          
=======
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
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

<<<<<<< HEAD
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className="h-52 bg-gray-100 shadow-2xl rounded-2xl">
                  {movie.poster_url ? (
                    <img src={movie.poster_url} alt={movie.title} className="w-full h-full object-cover rounded-2xl p-2" />
=======
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className="h-56 bg-gray-200">
                  {movie.poster_url ? (
                    <img src={movie.poster_url} alt={movie.title} className="w-full h-full object-contain p-2" />
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
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
<<<<<<< HEAD
                  <p className="text-gray-500 text-sm mt-2 flex-1">
                    <span className="font-medium">Duration: </span>
                    {movie.duration || 'N/A'} mins
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    <span className="font-medium">Language: </span>
                    {movie.language || 'N/A'}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    <span className="font-medium">Rating: </span>
                    {movie.rating ? `${movie.rating}/10` : 'N/A'}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    <span className="font-medium">Genre: </span>
                    {movie.genre || 'N/A'}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    <span className="font-medium ">Description: </span>
                    <span className='line-clamp-1'>{movie.description || 'No description available.'}</span>
                  </p>

                  <button onClick={() => navigate(`/movies/${movie.id}`)} className="mt-auto bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition self-start">
                    Book Ticket
=======
                  <button onClick={() => navigate(`/movies/${movie.id}`)} className="mt-auto bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition self-start">
                    View Details
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
