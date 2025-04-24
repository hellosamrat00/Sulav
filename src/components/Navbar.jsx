import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div id="sideNav" style={{ right: isOpen ? '0' : '-250px' }}>
        <nav>
          <ul>
            <li><a href="#banner">HOME</a></li>
            <li><a href="#feature">FEATURES</a></li>
            <li><a href="#service">SERVICES</a></li>
            <li><a href="#testimonial">TESTIMONIALS</a></li>
            <li><a href="#footer">MEET US</a></li>
          </ul>
        </nav>
      </div>
      <div id="menuBtn" onClick={toggleMenu}>
        <img
        src={isOpen ? '/images/close.png' : '/images/menu.png'}
          alt=""
          id="menu"
        />
      </div>
    </>
  );
}

export default Navbar;
