import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      email: formData.get('email'),
      password: formData.get('password'),
      ...(isLogin ? {} : { username: formData.get('username'), role: formData.get('role') })
    };

<<<<<<< HEAD
    const res = await fetch(`http://localhost:5000/api/auth/${isLogin ? 'login' : 'register'}`, {
=======
    const res = await fetch(`http://localhost:3000/api/auth/${isLogin ? 'login' : 'register'}`, {
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
<<<<<<< HEAD
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
=======
>>>>>>> 4e769bbc529eccfbc9dbacb8a6ff1d75bf1d48cc
    if (!res.ok) return alert(data.message);

    if (isLogin) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      navigate('/home');
    } else {
      alert("Registration successful! Please login.");
      setIsLogin(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && <input name="username" type="text" required placeholder="Username" className="w-full p-2 border rounded" />}
          {!isLogin && <select name="role" className="w-full p-2 border rounded" value={role} onChange={(e) => setRole(e.target.value)}><option value="user">User</option><option value="admin">Admin</option></select>}
          <input name="email" type="email" required placeholder="Email" className="w-full p-2 border rounded" />
          <input name="password" type="password" required placeholder="Password" className="w-full p-2 border rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <p className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={toggleForm} className="text-blue-600 hover:underline font-medium">
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
