// src/components/NewsHeader.jsx
import { useState, useEffect } from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, setShowAuthModal } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHeaderClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault(); 
      setShowAuthModal(true);
    }
  };

  return (
    <header 
      className="font-sans mt-16"
      onClick={!isAuthenticated ? handleHeaderClick : undefined}
    >
      <div className={`fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-300 ease-in-out
        ${isScrolled ? 'shadow-lg' : 'shadow-none'}`}>
        
        {/* Decorative top border lines */}
        <div className="h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></div>
        <div className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mt-0.5"></div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-300">
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex flex-col">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
                 OR-SITE
                </div>
                <div className="text-xs text-gray-500 italic">Explore • Create • Inspire</div>
              </div>
            </div>

            {/* Center Section - Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {['Home', 'Lifestyle', 'Travel', 'Tech', 'Food'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors duration-300 group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              <button className="relative group">
                <Search className="h-5 w-5 text-gray-500 group-hover:text-purple-600 transform group-hover:scale-110 transition-all duration-300" />
              </button>
              <button className="relative group">
                <Bell className="h-5 w-5 text-gray-500 group-hover:text-purple-600 transform group-hover:scale-110 transition-all duration-300" />
                {isAuthenticated && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-pink-500 rounded-full"></span>
                )}
              </button>
              <button className="relative group">
                <User className="h-5 w-5 text-gray-500 group-hover:text-purple-600 transform group-hover:scale-110 transition-all duration-300" />
              </button>
              {/* <button 
                className="hidden lg:block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Write a Post
              </button> */}
            </div>
          </div>
        </div>

        {/* Bottom border line */}
        <div className="h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></div>
      </div>
    </header>
  );
};

export default Header;