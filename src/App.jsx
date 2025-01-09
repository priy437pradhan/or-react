import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import { AuthProvider } from './context/AuthContext';
import './styles/App.css';

const AppContent = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
