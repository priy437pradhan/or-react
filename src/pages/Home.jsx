import { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import Header from '../components/Header';
import {AuthModal} from '../components/AuthModal'; 

// Static news data
const STATIC_NEWS = {
  featured: [
    {
      type: 'video',
      title: 'SpaceX Successfully Launches New Satellite Constellation',
      description: 'In a groundbreaking mission, SpaceX has successfully deployed a new constellation of satellites designed to provide global internet coverage.',
      imageUrl: '/api/placeholder/800/450',
      date: '2025-01-09',
      readTime: 5
    },
    {
      type: 'standard',
      title: 'Breakthrough in Quantum Computing Announced',
      description: 'Scientists have achieved a major milestone in quantum computing, demonstrating sustained quantum coherence for over an hour.',
      imageUrl: '/api/placeholder/800/450',
      date: '2025-01-09',
      readTime: 4
    },
    {
      type: 'standard',
      title: 'New AI Model Shows Promise in Medical Diagnosis',
      description: 'A revolutionary AI system has demonstrated unprecedented accuracy in early disease detection across multiple medical conditions.',
      imageUrl: '/api/placeholder/800/450',
      date: '2025-01-08',
      readTime: 6
    }
  ],
  quick: [
    {
      title: 'Twitter Introduces New Privacy Features',
      date: '2025-01-09'
    },
    {
      title: 'Apple Announces Revolutionary AR Glasses',
      date: '2025-01-09'
    },
    {
      title: '5G Network Coverage Reaches Global Milestone',
      date: '2025-01-08'
    },
    {
      title: 'Electric Vehicle Sales Surpass Traditional Cars',
      date: '2025-01-08'
    },
    {
      title: 'New Renewable Energy Storage Solution Unveiled',
      date: '2025-01-07'
    }
  ],
  trending: [
    {
      title: 'Artificial Intelligence Revolutionizes Healthcare',
      description: 'New AI systems are transforming how doctors diagnose and treat patients.',
      imageUrl: '/api/placeholder/400/400',
      date: '2025-01-09',
      readTime: 3
    },
    {
      title: 'Worlds First Quantum Network Goes Live',
      description: 'Scientists successfully establish the first quantum internet connection.',
      imageUrl: '/api/placeholder/400/400',
      date: '2025-01-09',
      readTime: 4
    },
    {
      title: 'Revolutionary Battery Technology Announced',
      description: 'New battery design promises 10x capacity and faster charging.',
      imageUrl: '/api/placeholder/400/400',
      date: '2025-01-08',
      readTime: 3
    }
  ]
};

const Home = () => {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [quickNews, setQuickNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate API loading delay
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFeaturedNews(STATIC_NEWS.featured);
      setQuickNews(STATIC_NEWS.quick);
      setTrendingNews(STATIC_NEWS.trending);
      setLoading(false);
    };

    loadData();
  }, []);

  // Check for existing authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };
    
    checkAuth();
  }, []);

  const handleAuthRequired = () => {
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    localStorage.setItem('authToken', 'dummy-token');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 py-8">
      <Header />
      <div className="relative flex flex-wrap gap-6">
        {/* Left Column - Quick Updates */}
        <div className="w-full lg:w-1/5">
          <div className="sticky top-20 space-y-1">
            <h2 className="font-semibold text-lg mb-4">Quick Updates</h2>
            {quickNews.map((item, index) => (
              <NewsCard 
                key={index} 
                item={item} 
                variant="minimal"
                isAuthenticated={isAuthenticated}
                onAuthRequired={handleAuthRequired}
              />
            ))}
          </div>
        </div>

        {/* Middle Column - Featured Stories */}
        <div className="w-full lg:w-1/2">
          <h2 className="font-semibold text-lg mb-4">Featured Stories</h2>
          {featuredNews.map((item, index) => (
            <NewsCard 
              key={index} 
              item={item} 
              variant="feature"
              isAuthenticated={isAuthenticated}
              onAuthRequired={handleAuthRequired}
            />
          ))}
        </div>

        {/* Right Column - Trending */}
        <div className="w-full lg:w-1/4">
          <div className="sticky top-20">
            <h2 className="font-semibold text-lg mb-4">Trending Now</h2>
            <div className="space-y-2">
              {trendingNews.map((item, index) => (
                <NewsCard 
                  key={index} 
                  item={item} 
                  variant="compact"
                  isAuthenticated={isAuthenticated}
                  onAuthRequired={handleAuthRequired}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticated={handleAuthSuccess}
      />
    </div>
  );
};

export default Home;