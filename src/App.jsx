import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Chatbot from './components/Chatbot';
import AdminDashboard from './pages/AdminDashboard'; // ✅ New import

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <Router>
      <div className="App">
        {/* Only render Navbar if not on admin dashboard */}
        {window.location.pathname !== '/admin/dashboard' && (
          <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
        )}
        
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Services />
                <Testimonials />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login setCurrentPage={setCurrentPage} />
                <Footer />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Signup setCurrentPage={setCurrentPage} />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Profile setCurrentPage={setCurrentPage} />
                <Footer />
              </>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <>
                <AdminDashboard />
              </>
            }
          />
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
