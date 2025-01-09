import { useNavigate } from 'react-router-dom';
import { Bookmark, Share2, ArrowRight, Play } from 'lucide-react';

const NewsCard = ({ item }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/article/${encodeURIComponent(item.title)}`);
  };

  return (
    <div
      className={`or-pp-card rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-6 ${item.type === 'featured' ? 'bg-gray-50' : 'bg-white'}`}
      onClick={handleCardClick}
    >
      {item.type === 'video' ? (
        <div className="relative h-48">
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <Play className="w-12 h-12 text-white" />
          </div>
        </div>
      ) : item.imageUrl && (
        <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
      )}

      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="text-sm text-gray-500">{item.date}</span>
            {item.readTime && (
              <span className="text-sm text-gray-500 ml-3">{item.readTime} min read</span>
            )}
          </div>
          <div className="flex gap-2">
            <button className="or-pp-btn-icon p-1 hover:bg-gray-100 rounded-full">
              <Bookmark className="w-5 h-5 text-gray-600" />
            </button>
            <button className="or-pp-btn-icon p-1 hover:bg-gray-100 rounded-full">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{item.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>

        <button className="or-pp-read-more flex items-center text-blue-600 hover:text-blue-700">
          Read More <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
