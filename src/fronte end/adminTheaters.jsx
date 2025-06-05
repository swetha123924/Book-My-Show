// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function AdminTheaters() {
//   const [form, setForm] = useState({ name: '', location: '', seats: '' });
//   const [showPopup, setShowPopup] = useState(false);
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) return alert('Please log in first');

//     try {
//       const res = await fetch('http://localhost:3000/api/theaters', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//         body: JSON.stringify(form)
//       });
//       const data = await res.json();
//       if (res.ok) {
//         alert("Theater registered successfully");
//         setShowPopup(true);
//         navigate('/home', { state: { theaterName: form.name } });
//       } else {
//         console.error("Register failed:", data.message);
//       }
//     } catch (err) {
//       console.error("Error registering theater:", err);
//     }
//   };

//   return (
//     <div className="p-8 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Register Theater</h1>
//       <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} className="space-y-4">
//         <input type="text" placeholder="Theater Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full p-2 border rounded" />
//         <input type="text" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full p-2 border rounded" />
//         <input type="number" placeholder="Seats" value={form.seats} onChange={(e) => setForm({ ...form, seats: e.target.value })} className="w-full p-2 border rounded" />
//         <input type="text" placeholder="Movie Name" value={form.movie_name} onChange={(e) => setForm({ ...form, movie_name: e.target.value })} className="w-full p-2 border rounded" />
//         <input type="datetime-local" placeholder="Show Time" value={form.show_time} onChange={(e) => setForm({ ...form, show_time: e.target.value })} className="w-full p-2 border rounded" />
//         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Register Theater</button>
//       </form>


//       {showPopup && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-8 rounded-md shadow-lg text-center">
//             <h2 className="text-lg font-semibold mb-2">Theater Registered!</h2>
//             <p className="mb-4">Your theater has been successfully registered.</p>
//             <button onClick={() => setShowPopup(false)} className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminTheaters;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminTheaters() {
  const [form, setForm] = useState({ name: '', location: '', seats: '', movie_name: '', show_time: '' });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please log in first');

    try {
      const res = await fetch('http://localhost:3000/api/theaters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        alert("Theater registered successfully");
        setShowPopup(true);
        navigate('/home', { state: { theaterName: form.name } });
      } else {
        console.error("Register failed:", data.message);
      }
    } catch (err) {
      console.error("Error registering theater:", err);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register Theater</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} className="space-y-4">
        <input type="text" placeholder="Theater Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full p-2 border rounded" />
        <input type="number" placeholder="Seats" value={form.seats} onChange={(e) => setForm({ ...form, seats: e.target.value })} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Movie Name" value={form.movie_name} onChange={(e) => setForm({ ...form, movie_name: e.target.value })} className="w-full p-2 border rounded" />
        <input type="datetime-local" placeholder="Show Time" value={form.show_time} onChange={(e) => setForm({ ...form, show_time: e.target.value })} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Register Theater</button>
      </form>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-2">Theater Registered!</h2>
            <p className="mb-4">Your theater has been successfully registered.</p>
            <button onClick={() => setShowPopup(false)} className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTheaters;
