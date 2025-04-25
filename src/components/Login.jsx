import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Hardcoded admin credentials
  const adminEmail = 'admin@gmail.com';
  const adminPassword = 'admin123';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hardcode admin login check
    if (formData.email === adminEmail && formData.password === adminPassword) {
      navigate('/admin/dashboard');
    } else {
      try {
        const response = await fetch('http://localhost:8000/api/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
    
        if (response.ok) {
          localStorage.setItem('token', data.access);
          localStorage.setItem('user', JSON.stringify(data.user));
          alert('Login successful!');
    
          // Check role and navigate accordingly
          if (data.user.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            setCurrentPage('home');
            navigate('/');
          }
        } else {
          setError(data.error || 'Login failed');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <section id="login">
      <div className="title-text">
        <p>LOGIN</p>
        <h1>Welcome Back</h1>
      </div>
      <div className="form-container">
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="submit-btn">Login</button>
          </div>
          <div className="form-footer">
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            <p><a href="#forgot-password">Forgot Password?</a></p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
