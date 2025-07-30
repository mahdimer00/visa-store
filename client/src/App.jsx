// Imports
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Track from './pages/Track';
import AwaitingRepair from './pages/AwaitingRepair';
import Login from './pages/Login';

// Component
function App() {
  // State Management
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  // Authentication Logic
  const handleLogin = (username, password) => {
    if (username === 'root' && password === '68094782@') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  // Render
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col font-sans antialiased">
        {/* Navbar */}
        <Navbar isAdmin={isAdmin} onLogout={handleLogout} />
        
        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8 md:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/admin"
              element={isAdmin ? <Admin /> : <Navigate to="/login" />}
            />
            <Route
              path="/track"
              element={isAdmin ? <Track isAdmin={isAdmin} /> : <Navigate to="/login" />}
            />
            <Route
              path="/awaiting-repair"
              element={isAdmin ? <AwaitingRepair /> : <Navigate to="/login" />}
            />
            <Route path="/public-track" element={<Track isAdmin={isAdmin} />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

// Export
export default App;