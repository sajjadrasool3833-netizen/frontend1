import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from "lucide-react"; 
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa"; 
import './Footer.css';

const Footer = () => {
  return (
    <>
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-content">
          <h2>Join the TTS Family</h2>
          <p>Subscribe for exclusive drops, early access, and 15% off your first order.</p>
        </div>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="footer">
        <div className="footer-grid">
          
          {/* Column 1 */}
          <div className="footer-col brand-col">
            <h2 className="footer-logo">TTS <br/><span>COLLECTION</span></h2>
            <p>Premium clothing for the modern individual. Designed in studio, made with care.</p>
            <div className="social-icons">
              {/* Yahan Fa wale icons use kiye hain */}
              <FaInstagram size={20} />
              <FaFacebook size={20} />
              <FaTwitter size={20} />
            </div>
          </div>

          {/* Column 2 */}
          <div className="footer-col">
            <h4>SHOP</h4>
            <Link to="/collection">All Products</Link>
            <Link to="/collection">New Arrivals</Link>
            <Link to="/collection">Best Sellers</Link>
            <Link to="/collection">Sale</Link>
            <Link to="/collection">Accessories</Link>
          </div>

          {/* Column 3 */}
          <div className="footer-col">
            <h4>HELP</h4>
            <Link to="/">Shipping Info</Link>
            <Link to="/">Returns & Exchanges</Link>
            <Link to="/">Size Guide</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/track-order">Track Order</Link>
          </div>

          {/* Column 4 */}
          <div className="footer-col">
            <h4>CONTACT US</h4>
            <p><Mail size={16} /> hello@ttscollection.com</p>
            <p><Phone size={16} /> +1 (234) 567-890</p>
            <p><MapPin size={16} /> 123 Fashion Ave, New York, NY</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 TTS Collection. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;