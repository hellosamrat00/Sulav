import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({ setCurrentPage }) {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phone: '',
    role: '',
    address: '123 Main St, City',
    memberSince: 'January 2023',
    profilePic: '/profile-default.jpg'
  });
  const [appointments, setAppointments] = useState([
    { id: 1, service: 'Hair Cut', stylist: 'Michael B.', date: '2025-05-01', time: '10:00 AM', status: 'Upcoming' },
    { id: 2, service: 'Beard Trim', stylist: 'David R.', date: '2025-04-15', time: '2:30 PM', status: 'Completed' },
    { id: 3, service: 'Hair Styling', stylist: 'Sarah L.', date: '2025-03-22', time: '11:15 AM', status: 'Completed' }
  ]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('Profile.js: Checking login status');
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Profile.js: No token found, redirecting to /login');
      setCurrentPage('login');
      navigate('/login');
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user')) || {};
      console.log('Profile.js: User data:', user);
      setProfile((prev) => ({
        ...prev,
        username: user.username || 'Guest',
        email: user.email || 'guest@example.com',
        phone: user.phone || '+1 234 567 8901',
        role: user.role || 'user'
      }));
      setFormData({
        username: user.username || 'Guest',
        email: user.email || 'guest@example.com',
        phone: user.phone || '+1 234 567 8901'
      });
    } catch (err) {
      console.error('Profile.js: Error parsing user data:', err);
      setError('Failed to load profile data');
    }
  }, [navigate, setCurrentPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      username: formData.username,
      email: formData.email,
      phone: formData.phone
    }));
    const user = JSON.parse(localStorage.getItem('user')) || {};
    localStorage.setItem('user', JSON.stringify({
      ...user,
      username: formData.username,
      email: formData.email,
      phone: formData.phone
    }));
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  if (error) {
    return (
      <section id="profile">
        <div className="title-text">
          <p>ERROR</p>
          <h1>Profile Error</h1>
        </div>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section id="profile">
      <div className="title-text">
        <p>PROFILE</p>
        <h1>Your Account</h1>
      </div>
      
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-image">
            <img src={profile.profilePic} alt="Profile" />
          </div>
          <h2>{profile.username}</h2>
          <p className="member-since">Member since: {profile.memberSince}</p>
          <div className="profile-menu">
            <ul>
              <li className="active">Profile Information</li>
              <li>My Appointments</li>
              <li>Favorite Services</li>
              <li>Payment Methods</li>
              <li>Settings</li>
            </ul>
          </div>
        </div>
        
        <div className="profile-content">
          {!editMode ? (
            <div className="profile-info">
              <h3>Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <strong>Username:</strong>
                  <p>{profile.username}</p>
                </div>
                <div className="info-item">
                  <strong>Email:</strong>
                  <p>{profile.email}</p>
                </div>
                <div className="info-item">
                  <strong>Phone:</strong>
                  <p>{profile.phone}</p>
                </div>
                <div className="info-item">
                  <strong>Address:</strong>
                  <p>{profile.address}</p>
                </div>
              </div>
              <button className="edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
              
              <div className="appointments-section">
                <h3>Recent Appointments</h3>
                <div className="appointments-list">
                  {appointments.map(appointment => (
                    <div className="appointment-item" key={appointment.id}>
                      <div className="appointment-header">
                        <h4>{appointment.service}</h4>
                        <span className={`status ${appointment.status.toLowerCase()}`}>{appointment.status}</span>
                      </div>
                      <div className="appointment-details">
                        <p><i className="fa fa-user"></i> {appointment.stylist}</p>
                        <p><i className="fa fa-calendar"></i> {appointment.date}</p>
                        <p><i className="fa fa-clock-o"></i> {appointment.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="book-btn">Book New Appointment</button>
              </div>
            </div>
          ) : (
            <div className="edit-profile">
              <h3>Edit Profile</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
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
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-buttons">
                  <button type="submit" className="save-btn">Save Changes</button>
                  <button type="button" className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;