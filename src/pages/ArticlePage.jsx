import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { Clock, Calendar, Share2, Bookmark } from 'lucide-react';

// Static article data
const STATIC_ARTICLES = {
  'breakthrough-quantum-computing': {
    title: 'Breakthrough in Quantum Computing Announced',
    publishedAt: '2025-01-09T10:30:00Z',
    readTime: 8,
    author: 'Dr. Sarah Chen',
    source: {
      name: 'Tech Insights Daily'
    },
    urlToImage: '/api/placeholder/800/400',
    description: 'Scientists have achieved a major milestone in quantum computing, demonstrating sustained quantum coherence for over an hour.',
    content: `In a groundbreaking development that promises to revolutionize the field of quantum computing, researchers at the Quantum Research Institute have achieved unprecedented success in maintaining quantum coherence for extended periods. This breakthrough could pave the way for practical quantum computers that can solve complex problems far beyond the capabilities of classical computers.

    The team, led by Dr. Sarah Chen, used a novel approach involving superconducting circuits and innovative error correction techniques. "What makes this achievement particularly exciting is that we've managed to maintain quantum coherence for over an hour, which is orders of magnitude longer than previous attempts," explains Dr. Chen.

    The implications of this breakthrough are far-reaching, potentially impacting fields from cryptography to drug discovery. The ability to maintain quantum states for longer periods could accelerate the development of practical quantum computers, bringing us closer to solving complex problems in climate modeling, financial analysis, and artificial intelligence.

    Industry experts are already calling this development a "quantum leap" forward. Major tech companies have expressed interest in incorporating these findings into their quantum computing research programs. The team's findings have been published in the prestigious journal "Quantum Science Today" and are currently undergoing peer review.

    The research was funded by a combination of government grants and private sector investments, highlighting the growing interest in quantum computing technology. The team is now working on scaling up their system and exploring potential commercial applications.`,
  },
  'ai-medical-breakthrough': {
    title: 'New AI Model Shows Promise in Medical Diagnosis',
    publishedAt: '2025-01-08T14:15:00Z',
    readTime: 6,
    author: 'Michael Rodriguez',
    source: {
      name: 'Health & Technology Review'
    },
    urlToImage: '/api/placeholder/800/400',
    description: 'A revolutionary AI system has demonstrated unprecedented accuracy in early disease detection across multiple medical conditions.',
    content: `Artificial Intelligence continues to transform healthcare with a new breakthrough in medical diagnosis. A team of researchers has developed an AI system that can detect early signs of multiple diseases with remarkable accuracy, potentially revolutionizing preventive healthcare.

    The AI system, developed through a collaboration between medical researchers and computer scientists, has shown particular promise in detecting early signs of cardiovascular disease, certain types of cancer, and neurological conditions. Early trials indicate an accuracy rate exceeding 95% in preliminary screenings.

    "What sets this system apart is its ability to analyze multiple data points simultaneously, including imaging results, patient history, and real-time health metrics," explains lead researcher Dr. Jennifer Kumar. The AI can process this information much faster than traditional diagnostic methods, potentially saving crucial time in treatment decisions.

    Healthcare providers participating in the initial trials have reported significant improvements in their diagnostic workflows. The system not only helps in early detection but also assists in determining the most effective treatment paths for individual patients.

    The research team is now working on expanding the system's capabilities and preparing for larger-scale clinical trials. They anticipate that this technology could be implemented in hospitals within the next two years, pending regulatory approvals.`,
  }
};

const RELATED_ARTICLES = [
  {
    title: 'IBM Unveils Next Generation Quantum Processor',
    publishedAt: '2025-01-09T08:00:00Z',
    urlToImage: '/api/placeholder/400/300',
    description: 'New quantum processor achieves record-breaking performance in stability tests.'
  },
  {
    title: 'Microsoft Announces Quantum Cloud Services',
    publishedAt: '2025-01-08T15:30:00Z',
    urlToImage: '/api/placeholder/400/300',
    description: 'Cloud-based quantum computing services now available for enterprise customers.'
  },
  {
    title: 'Quantum Cryptography Makes Major Strides',
    publishedAt: '2025-01-08T11:45:00Z',
    urlToImage: '/api/placeholder/400/300',
    description: 'New quantum encryption method promises unbreakable security for sensitive data.'
  }
];

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading delay
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setArticle(STATIC_ARTICLES[id]);
      setRelatedArticles(RELATED_ARTICLES);
      setLoading(false);
    };

    loadData();
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
                  src="/api/placeholder/40/40"
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{article.author}</p>
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
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Article Content */}
          <div className="prose max-w-none">
            <p className="text-xl text-gray-700 mb-6">{article.description}</p>
            <div className="text-gray-700 leading-relaxed space-y-4 whitespace-pre-line">
              {article.content}
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((related, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={related.urlToImage}
                  alt={related.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{related.title}</h3>
                  <p className="text-gray-600 text-sm">{related.description}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(related.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticlePage;