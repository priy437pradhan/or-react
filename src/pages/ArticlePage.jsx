import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { Clock, Calendar, Share2, Bookmark } from 'lucide-react';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch main article
        const articleResponse = await fetch(
          `${BASE_URL}/everything?qInTitle=${encodeURIComponent(id)}&apiKey=${API_KEY}`
        );
        const articleData = await articleResponse.json();

        if (articleData.articles && articleData.articles.length > 0) {
          const mainArticle = articleData.articles[0];
          setArticle({
            ...mainArticle,
            readTime: Math.ceil(mainArticle.content?.split(' ').length / 200) || 5
          });

          // Fetch related articles
          const relatedResponse = await fetch(
            `${BASE_URL}/everything?q=${encodeURIComponent(mainArticle.title.split(' ').slice(0, 3).join(' '))}&pageSize=4&apiKey=${API_KEY}`
          );
          const relatedData = await relatedResponse.json();
          setRelatedArticles(relatedData.articles);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-600">Article not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 py-8">
        {/* Main Article Content */}
        <article className="rounded-lg p-6">
          {/* Article Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            
            <div className="flex items-center space-x-6 text-gray-600 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} min read</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-y border-gray-200">
              <div className="flex items-center space-x-4">
                <img
                  src={article.urlToImage || '/api/placeholder/40/40'}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{article.author || 'Anonymous'}</p>
                  <p className="text-sm text-gray-500">{article.source.name}</p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Bookmark className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={article.urlToImage || '/api/placeholder/800/400'}
              alt={article.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Article Content */}
          <div className="prose max-w-none">
            <p className="text-xl text-gray-700 mb-6">{article.description}</p>
            <div className="text-gray-700 leading-relaxed space-y-4">
              {article.content}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default ArticlePage;
