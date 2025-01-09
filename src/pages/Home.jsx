import { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import Header from '../components/Header';
import {AuthModal} from '../components/AuthModal'; 

const Home = () => {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [quickNews, setQuickNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const API_KEY = '058dfeda8d7841a79a7efa0429c1518a';
  const BASE_URL = 'https://newsapi.org/v2';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const featuredResponse = await fetch(
          `${BASE_URL}/top-headlines?country=us&pageSize=10&apiKey=${API_KEY}`
        );
        const featuredData = await featuredResponse.json();
        
        const quickResponse = await fetch(
          `${BASE_URL}/everything?q=technology&pageSize=8&sortBy=publishedAt&apiKey=${API_KEY}`
          
        );
        const quickData = await quickResponse.json();
        
        const trendingResponse = await fetch(
          `${BASE_URL}/top-headlines?country=us&category=technology&pageSize=10&apiKey=${API_KEY}`
        );
        const trendingData = await trendingResponse.json();

        setFeaturedNews(featuredData.articles.map((article, index) => ({
          type: index === 0 ? 'video' : 'standard',
          title: article.title,
          description: article.description,
          imageUrl: article.urlToImage || '/api/placeholder/800/450',
          date: new Date(article.publishedAt).toLocaleDateString(),
          readTime: Math.ceil(article.description?.split(' ').length / 200) || 5
        })));

        setQuickNews(quickData.articles.map(article => ({
          title: article.title,
          date: new Date(article.publishedAt).toLocaleDateString()
        })));

        setTrendingNews(trendingData.articles.map(article => ({
          title: article.title,
          description: article.description,
          imageUrl: article.urlToImage || '/api/placeholder/400/400',
          date: new Date(article.publishedAt).toLocaleDateString(),
          readTime: Math.ceil(article.description?.split(' ').length / 200) || 3
        })));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Check for existing authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      // Check localStorage or your auth service
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
    // Store auth token or user data
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
        <div className="w-full lg:w-1/2 ">
        <h2 className="font-semibold text-lg mb-4">Trending Now</h2>
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