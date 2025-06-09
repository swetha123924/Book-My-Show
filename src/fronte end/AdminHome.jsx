import { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';
<<<<<<< HEAD
import { Navigate, useNavigate } from 'react-router-dom';

export default function AdminHome() {
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
=======
import { useNavigate } from 'react-router-dom';

export default function AdminHome() {
  const [movies, setMovies] = useState([]);
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    poster_url: '',
    release_date: '',
    show_time: '',
    price: '',
<<<<<<< HEAD
    seats: '',
    duration: '',
    genre: '',
    language: '',
    rating: '',
    trailer_url: '',
    theater_name: ''

  });
  const navigate = useNavigate();
=======
    seats: ''
  });

>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
  const [showTheaterModal, setShowTheaterModal] = useState(false);
  const [theaterData, setTheaterData] = useState({
    name: '',
    location: '',
    seats: ''
  });

<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchAdminMovies = async () => {
      try {
<<<<<<< HEAD
        const res = await fetch('http://localhost:5000/api/admin/movies', {
=======
        const res = await fetch('http://localhost:3000/api/admin/movies', {
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
<<<<<<< HEAD

=======
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error('Error fetching admin movies:', err);
      }
    };

<<<<<<< HEAD
    const fetchTheaters = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/theaters', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        setTheaters(data);
        localStorage.setItem('theaters', JSON.stringify(data));
      } catch (err) {
        console.error('Error fetching theaters:', err);
      }
    };

    fetchAdminMovies();
    fetchTheaters();
  }, []);



  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTheaterSubmit = async (e) => {
=======
    fetchAdminMovies();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTheaterSubmit = async (e) => {
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
    e.preventDefault();
    const { name, location, seats } = theaterData;

    if (!name || !location || !seats) {
      alert("All fields are required");
      return;
    }

    const payload = {
      name: name.trim(),
      location: location.trim(),
      seats: parseInt(seats, 10)
    };

    try {
      const token = localStorage.getItem("token");
<<<<<<< HEAD
      const response = await fetch("http://localhost:5000/api/theaters", {
=======
      const response = await fetch("http://localhost:3000/api/theaters", {
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("Server error:", err);
        throw new Error("Failed to save theater");
      }

      const savedTheater = await response.json();
      console.log("Saved theater:", savedTheater);

<<<<<<< HEAD
      const updatedTheaters = [...theaters, savedTheater];
      setTheaters(updatedTheaters);
      localStorage.setItem('theaters', JSON.stringify(updatedTheaters));

=======
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
      setShowTheaterModal(false);
      setTheaterData({ name: '', location: '', seats: '' });
    } catch (err) {
      console.error("Error:", err.message);
      alert("Failed to save theater");
    }
  };

<<<<<<< HEAD

=======
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
  const openAddModal = () => {
    setModalType('add');
    setFormData({
      id: null,
      title: '',
      description: '',
      poster_url: '',
      release_date: '',
      show_time: '',
      price: '',
<<<<<<< HEAD
      seats: '',
      duration: '',
      genre: '',
      rating: '',
      language: '',
      trailer_url: '',
      theater_name: ''

=======
      seats: ''
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
    });
    setShowModal(true);
  };

<<<<<<< HEAD
  const handleEditMovie = (movie) => {
    setModalType('edit');
    setFormData({
      id: movie.id,
      title: movie.title,
      description: movie.description,
      poster_url: movie.poster_url,
      release_date: movie.release_date,
      show_time: movie.show_time,
      price: movie.price,
      seats: movie.seats,
      duration: movie.duration,
      genre: movie.genre,
      rating: movie.rating,
      language: movie.language,
      trailer_url: movie.trailer_url,
      theater_name: movie.theater_name

    });
    setShowModal(true);
  };

  const handleDeleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/admin/movies/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Failed to delete movie');

      setMovies(prev => prev.filter(movie => movie.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete movie.");
    }
  };const handleModalSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  console.log("Form Data:", formData);

  const payload = {
    title: formData.title,
    description: formData.description,
    poster_url: formData.poster_url,
    release_date: formData.release_date,
    show_time: formData.show_time,
    price: parseInt(formData.price, 10),
    seats: parseInt(formData.seats, 10),
    duration: formData.duration,
    genre: formData.genre,
    rating: formData.rating,
    language: formData.language,
    trailer_url: formData.trailer_url,
    theater_name: formData.theater_name
  };

  console.log("Payload for movie submission:", payload);

  try {
    const url = modalType === 'edit'
      ? `http://localhost:5000/api/admin/movies/${formData.id}`
      : 'http://localhost:5000/api/admin/movies';

    const method = modalType === 'edit' ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });


    const result = await res.json();
   if (modalType === 'edit') {
  setMovies(prev => prev.map(movie => movie.id === result.id ? result : movie));
} else {
  setMovies(prev => [result, ...prev]);
}
setShowModal(false); // good enough to reflect changes

  } catch (err) {
    console.error('Error:', err);
    alert(`Failed to ${modalType === 'edit' ? 'update' : 'save'} movie.`);
  }
};



=======
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const { title, description, poster_url, release_date, show_time, price, seats } = formData;

    if (!title || !description || !show_time || !price || !seats) {
      alert("All movie fields are required");
      return;
    }

    const payload = {
      title,
      description,
      poster_url,
      release_date,
      show_time,
      price: parseInt(price, 10),
      seats: parseInt(seats, 10)
    };

    try {
      const token = localStorage.getItem("token");
      const res = await fetch('http://localhost:3000/api/admin/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save movie');

      const movie = await res.json();
      setMovies(prev => [movie, ...prev]);
      setShowModal(false);
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to save movie.');
    }
  };

>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
<<<<<<< HEAD
            <h1 className="text-4xl font-extrabold text-gray-800">
              Now Showing
            </h1>
=======
          <h1 className="text-4xl font-extrabold text-gray-800">Now Showing (Your Movies)</h1>
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
          <div className="flex gap-4">
            <button onClick={openAddModal} className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition">
              + Add Movie
            </button>
            <button onClick={() => setShowTheaterModal(true)} className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg transition">
              + Theater Details
            </button>
<<<<<<< HEAD
            <button
                onClick={() => navigate('/user/home')}
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2 rounded-lg transition"
              >
                🎬 View All Movies
            </button>

          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white rounded-xl  shadow-md flex flex-col p-3"  onClick={() => navigate(`/movies/${movie.id}`)}>
              <div className="h-60 ">
                {movie.poster_url ? (
                  <img src={movie.poster_url} alt={movie.title} className="w-full h-full object-fit rounded-2xl" />
=======
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col">
              <div className="h-56 bg-gray-200">
                {movie.poster_url ? (
                  <img src={movie.poster_url} alt={movie.title} className="w-full h-full object-cover" />
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800">{movie.title}</h2>
<<<<<<< HEAD
                <p className="text-md text-black font-bold mt-2">{movie.description || 'No description available.'}</p>
                <p className="text-sm text-gray-500 mt-2">Release: {movie.release_date || 'TBA'}</p>
                <p className="text-sm text-gray-500 mt-2">Price: ₹{movie.price || '0'}</p>
                <p className="text-sm text-gray-500 mt-2">Seats: {movie.seats || '0'}</p>
                <div className="mt-auto pt-4 flex gap-2">
                  <button className="w-1/2 bg-blue-600 text-white py-2 rounded-lg" onClick={() => handleEditMovie(movie)}>Edit</button>
                  <button className="w-1/2 bg-red-600 text-white py-2 rounded-lg" onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
=======
                <p className="text-sm text-gray-500 mt-2">Release: {movie.release_date || 'TBA'}</p>
                <div className="mt-auto pt-4 flex gap-2">
                  <button className="w-1/2 bg-blue-600 text-white py-2 rounded-lg">Edit</button>
                  <button className="w-1/2 bg-red-600 text-white py-2 rounded-lg">Delete</button>
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />

<<<<<<< HEAD
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 overflow-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              {modalType === 'add' ? '🎬 Add Movie' : '✏️ Edit Movie'}
            </h2>

=======
      {/* Movie Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              {modalType === 'add' ? 'Add Movie' : 'Edit Movie'}
            </h2>
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
            <form onSubmit={handleModalSubmit} className="space-y-6">
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Title" required />
              <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Description" required />
              <input type="url" name="poster_url" value={formData.poster_url} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Poster URL" />
              <input type="date" name="release_date" value={formData.release_date} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
              <input type="datetime-local" name="show_time" value={formData.show_time} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
<<<<<<< HEAD
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Ticket Price" required />
              <input type="number" name="seats" value={formData.seats} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Total Seats" required />
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Duration (mins)" required />
              <input type="text" name="genre" value={formData.genre} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Genre (comma separated)" required />
              <input type="text" name="language" value={formData.language} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Language" required />
              <input type="number" name="rating" value={formData.rating} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Rating (0-10)" required />
              <input type="url" name="trailer_url" value={formData.trailer_url} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Trailer URL" />
              <input type="text" name="theater_name" value={formData.theater_name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Theater Name" required />
              
              <div className="flex justify-between">
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">
                  {modalType === 'add' ? 'Add Movie' : 'Update Movie'}
                </button>
                <button onClick={() => setShowModal(false)} type="button" className="bg-gray-400 text-white px-6 py-2 rounded-lg">
                  Cancel
                </button>
              </div>
            </form>

=======
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Price" required />
              <input type="number" name="seats" value={formData.seats} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Seats Available" required />
              <div className="flex justify-between gap-4 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="w-full py-2 bg-gray-300 text-gray-700 rounded-md">
                  Cancel
                </button>
                <button type="submit" className="w-full py-2 bg-red-600 text-white rounded-md">
                  {modalType === 'add' ? 'Add' : 'Save'}
                </button>
              </div>
            </form>
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
          </div>
        </div>
      )}

<<<<<<< HEAD
=======
      {/* Theater Modal */}
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
      {showTheaterModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Add Theater</h2>
            <form onSubmit={handleTheaterSubmit} className="space-y-6">
<<<<<<< HEAD
              <input type="text" name="name" value={theaterData.name} onChange={(e) => setTheaterData({ ...theaterData, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Theater Name" required />
              <input type="text" name="location" value={theaterData.location} onChange={(e) => setTheaterData({ ...theaterData, location: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Location" required />
              <input type="number" name="seats" value={theaterData.seats} onChange={(e) => setTheaterData({ ...theaterData, seats: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Total Seats" required />

              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setShowTheaterModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Save</button>
=======
              <input type="text" name="name" placeholder="Theater Name" value={theaterData.name} onChange={(e) => setTheaterData({ ...theaterData, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
              <input type="text" name="location" placeholder="Location" value={theaterData.location} onChange={(e) => setTheaterData({ ...theaterData, location: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
              <input type="number" name="seats" placeholder="Seats" value={theaterData.seats} onChange={(e) => setTheaterData({ ...theaterData, seats: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
              <div className="flex justify-between gap-4 mt-4">
                <button type="button" onClick={() => setShowTheaterModal(false)} className="w-full py-2 bg-gray-300 text-gray-700 rounded-md">
                  Cancel
                </button>
                <button type="submit" className="w-full py-2 bg-purple-600 text-white rounded-md">
                  Submit
                </button>
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
