import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import './Footer.css';

const Footer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Set the visibility state to true after the component mounts to trigger the fade-in effect
    setVisible(true);
  }, []);

  return (
    <div className={`footer ${visible ? 'footer-visible' : ''}`} id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Ze-Spice Logo" />
          <p>At Ze-Spice, we are dedicated to serving you fresh, flavorful meals made with love and the finest ingredients. Enjoy a delightful dining experience, whether at home or on the go.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@ze-spice.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © Ze-spice.com - All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
