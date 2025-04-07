import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import Features from './components/Features';
import About from './components/About';
import Dashboard from './components/Dashboard';
import KrishiMitraChatbot from './components/KrishiMitraChatbot';
import SmartFarmingAdvisory from './components/SmartFarmingAdvisory';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/smart-farming" element={<SmartFarmingAdvisory />} />
        </Routes>
        <KrishiMitraChatbot />
      </div>
    </Router>
  );
}

export default App;
