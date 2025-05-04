import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Navbar({ currentPage, setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access_token'); // Updated for JWT

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Updated for JWT
    localStorage.removeItem('refresh_token'); // Updated for JWT
    localStorage.removeItem('user');
    setCurrentPage('home');
    setIsOpen(false);
    navigate('/');
    alert('Logged out successfully!');
  };

  return (
    <>
      <div id="sideNav" style={{ right: isOpen ? '0' : '-250px' }}>
        <nav>
          <ul>
            <li>
              <Link
                to="/"
                onClick={() => handleNavClick('home')}
                className={currentPage === 'home' ? 'active' : ''}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/#feature"
                onClick={() => handleNavClick('home')}
                className={currentPage === 'home' ? 'active' : ''}
              >
                FEATURES
              </Link>
            </li>
            <li>
              <Link
                to="/#service"
                onClick={() => handleNavClick('home')}
                className={currentPage === 'home' ? 'active' : ''}
              >
                SERVICES
              </Link>
            </li>
            <li>
              <Link
                to="/#testimonial"
                onClick={() => handleNavClick('home')}
                className={currentPage === 'home' ? 'active' : ''}
              >
                TESTIMONIALS
              </Link>
            </li>
            <li>
              <Link
                to="/#footer"
                onClick={() => handleNavClick('home')}
                className={currentPage === 'home' ? 'active' : ''}
              >
                MEET US
              </Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={() => handleNavClick('login')}
                    className={currentPage === 'login' ? 'active' : ''}
                  >
                    LOGIN
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/"
                  onClick={handleLogout}
                  className={currentPage === 'logout' ? 'active' : ''}
                >
                  LOGOUT
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/profile"
                onClick={() => handleNavClick('profile')}
                className={currentPage === 'profile' ? 'active' : ''}
              >
                PROFILE
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="menuBtn" onClick={toggleMenu}>
        <img
          src={isOpen ? "images/close.png" : "images/menu.png"}
          alt=""
          id="menu"
        />
      </div>
    </>
  );
}

export default Navbar;