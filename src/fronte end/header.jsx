import {Search, MapPin, User, Home, Clock3, Film, Percent, Briefcase, Globe, LogOut, ChevronDown} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
  
  export default function Header() {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();
  
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    }, []);
  
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setDropdownOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    const handleLogout = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      window.location.href = '/'; 
    };
  
    return (
      <header className="bg-white shadow-md p-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <article className="flex flex-col md:flex-row items-center gap-6">
            <section className="text-2xl font-bold text-red-600 flex items-center gap-2">
              🎬 BMS
            </section>
  
            <nav className="flex flex-wrap gap-4 text-sm md:text-base text-gray-700 font-medium">
              <p className="flex items-center gap-1 cursor-pointer hover:text-red-500">
                <Home className="w-4 h-4" /> Home
              </p>
              <p className="flex items-center gap-1 cursor-pointer hover:text-red-500">
                <Clock3 className="w-4 h-4" /> Showtimings
              </p>
              <p className="flex items-center gap-1 cursor-pointer hover:text-red-500">
                <Film className="w-4 h-4" /> Cinemas
              </p>
              <p className="flex items-center gap-1 cursor-pointer hover:text-red-500">
                <Percent className="w-4 h-4" /> Offers
              </p>
              <p className="flex items-center gap-1 cursor-pointer hover:text-red-500">
                <Briefcase className="w-4 h-4" /> Investor
              </p>
              <p className="flex items-center gap-1 cursor-pointer hover:text-red-500">
                <Globe className="w-4 h-4" /> Passport
              </p>
            </nav>
          </article>
  
          <article className="flex items-center gap-4 w-full md:w-auto justify-end">
            <section className="flex items-center gap-2 border rounded-md px-3 py-1 w-full md:w-64 bg-gray-100 focus-within:ring-2 ring-red-400">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search movies, shows..."
                className="bg-transparent outline-none w-full text-sm"
              />
            </section>
  
            <section className="flex items-center gap-1 text-gray-700 cursor-pointer hover:text-red-500 border-2 p-2 rounded-2xl">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Location</span>
            </section>
  
            {!user ? (
              <a href="/login" className="flex items-center gap-1 text-gray-700 cursor-pointer hover:text-red-500 border-2 p-2 rounded-2xl">
                <User className="w-4 h-4" />
                <span className="text-sm">Login</span>
              </a>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 text-gray-700 hover:text-red-500 border-2 p-2 rounded-2xl"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.email?.split('@')[0]}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
  
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2 w-48 z-50 border">
                    <p className="text-sm text-gray-600 px-2 py-1 truncate">{user.email}</p>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 text-red-600 hover:bg-red-50 text-sm px-2 py-1 mt-1 rounded"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </article>
        </div>
      </header>
    );
  }
  