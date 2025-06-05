import { useEffect, useState } from 'react';
import AdminHome from './AdminHome';
import UserHome from './userHome';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  if (!user) return <UserHome />;
  return user.role === 'admin' ? <AdminHome /> : <UserHome />;
}
