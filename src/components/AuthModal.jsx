import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';

export const AuthModal = () => {
  const { showAuthModal, setShowAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (showAuthModal && window.scrollY > 5) {
        setIsExpanded(true);
      }
    };

    if (showAuthModal) {
      window.addEventListener('scroll', handleScroll);
    } else {
      window.removeEventListener('scroll', handleScroll);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAuthModal]);

  const closeModal = () => {
    console.log('Closing modal...');
    setShowAuthModal(false);
    setIsExpanded(false);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Reset scroll position
  };

  const expandModal = () => {
    console.log('Expanding modal...');
    setIsExpanded(true);
  };

  if (!showAuthModal) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-500 ease-out ${
        showAuthModal ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`fixed bottom-0 w-full transform transition-transform duration-500 ease-in-out ${
          showAuthModal ? 'translate-y-0' : 'translate-y-full'
        } ${
          isExpanded ? 'h-full overflow-y-auto' : 'h-[20vh] overflow-hidden'
        } bg-white rounded-t-3xl`}
        style={{
          transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onClick={expandModal}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Welcome to OR</h2>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent accidental modal expansion
                closeModal();
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <p className="text-gray-600 text-center mb-6">
            Join our community to create and share amazing content
          </p>

          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === 'login'
                  ? 'border-b-2 border-purple-600 text-purple-600'
                  : 'text-gray-500'
              }`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering `onClick` for the modal
                setActiveTab('login');
              }}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === 'signup'
                  ? 'border-b-2 border-purple-600 text-purple-600'
                  : 'text-gray-500'
              }`}
              onClick={(e) => {
                e.stopPropagation(); 
                setActiveTab('signup');
              }}
            >
              Sign Up
            </button>
          </div>

          {activeTab === 'login' ? <LoginForm /> : <SignUpForm />}
        </div>
      </div>
    </div>
  );
};
