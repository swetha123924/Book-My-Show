import { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';

export default function AdminHome() {
  const [movies, setMovies] = useState([]);
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
    seats: ''
  });

  const [showTheaterModal, setShowTheaterModal] = useState(false);
  const [theaterData, setTheaterData] = useState({
    name: '',
    location: '',
    seats: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchAdminMovies = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/admin/movies', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error('Error fetching admin movies:', err);
      }
    };

    fetchAdminMovies();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTheaterSubmit = async (e) => {
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
      const response = await fetch("http://localhost:3000/api/theaters", {
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

      setShowTheaterModal(false);
      setTheaterData({ name: '', location: '', seats: '' });
    } catch (err) {
      console.error("Error:", err.message);
      alert("Failed to save theater");
    }
  };

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
      seats: ''
    });
    setShowModal(true);
  };

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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">Now Showing (Your Movies)</h1>
          <div className="flex gap-4">
            <button onClick={openAddModal} className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition">
              + Add Movie
            </button>
            <button onClick={() => setShowTheaterModal(true)} className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg transition">
              + Theater Details
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col">
              <div className="h-56 bg-gray-200">
                {movie.poster_url ? (
                  <img src={movie.poster_url} alt={movie.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800">{movie.title}</h2>
                <p className="text-sm text-gray-500 mt-2">Release: {movie.release_date || 'TBA'}</p>
                <div className="mt-auto pt-4 flex gap-2">
                  <button className="w-1/2 bg-blue-600 text-white py-2 rounded-lg">Edit</button>
                  <button className="w-1/2 bg-red-600 text-white py-2 rounded-lg">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />

      {/* Movie Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              {modalType === 'add' ? 'Add Movie' : 'Edit Movie'}
            </h2>
            <form onSubmit={handleModalSubmit} className="space-y-6">
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Title" required />
              <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Description" required />
              <input type="url" name="poster_url" value={formData.poster_url} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Poster URL" />
              <input type="date" name="release_date" value={formData.release_date} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
              <input type="datetime-local" name="show_time" value={formData.show_time} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
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
          </div>
        </div>
      )}

      {/* Theater Modal */}
      {showTheaterModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Add Theater</h2>
            <form onSubmit={handleTheaterSubmit} className="space-y-6">
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
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
