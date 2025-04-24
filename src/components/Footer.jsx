import React from 'react';

function Footer() {
  return (
    <section id="footer">
      <img src="images/footer-img.png" alt="" className="footer-img" />
      <div className="title-text">
        <p>CONTACT</p>
        <h1>Visit Shop Today</h1>
      </div>
      <div className="footer-row">
        <div className="footer-left">
          <h1>Opening Hours</h1>
          <p><i className="fa fa-clock-o"></i>Monday to Friday - 9am To 9pm</p>
          <p><i className="fa fa-clock-o"></i>Saturday and Sunday - 8am To 11pm</p>
        </div>
        <div className="footer-right">
          <h1>Get In Touch</h1>
          <p>#30 abc Colony, xyz City IN<i className="fa fa-map-marker"></i></p>
          <p>example@website.com<i className="fa fa-paper-plane"></i></p>
          <p>+92 857 8654 458<i className="fa fa-phone"></i></p>
        </div>
      </div>
      <div className="social-links">
        <i className="fa fa-facebook"></i>
        <i className="fa fa-instagram"></i>
        <i className="fa fa-twitter"></i>
        <i className="fa fa-youtube-play"></i>
        <p>Copyright Sulav Subedi</p>
      </div>
    </section>
  );
}

export default Footer;
