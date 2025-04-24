// components/Banner.js
import React from 'react';

function Banner() {
  return (
    <section id="banner">
      <img src={'./images/logo.png'} alt="" className="logo" />
      <div className="banner-text">
        <h1>Sulav Hair Studio</h1>
        <p>Style Your Hair Is Style Your Life</p>
        <div className="banner-btn">
          <a href="#"><span></span>Find Out</a>
          <a href="#"><span></span>Read More</a>
        </div>
      </div>
    </section>
  );
}

export default Banner;