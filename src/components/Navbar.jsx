import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Sun, Moon, Phone, X, Menu } from 'lucide-react';
import { FaInstagram, FaFacebook, FaTwitter, FaTiktok } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar({ theme, toggleTheme }) { 
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  
  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile Menu State
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(searchQuery.trim() !== '') {
      navigate(`/collection?search=${searchQuery}`);
      setShowSearch(false); 
      setIsMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar">
      {/* Top Bar */}
      <div className="nav-top-bar">
        <div className="top-bar-left">
          <span className="offer-badge">OFFER</span> 
          <span className="offer-text">Free shipping on orders over $50</span>
        </div>
        <div className="top-bar-right">
          <span><Phone size={14} style={{ marginRight: '5px', verticalAlign: 'middle' }} /> +1 (234) 567-890</span>
          <div className="social-icons">
            <FaInstagram size={15} /><FaFacebook size={15} /><FaTwitter size={15} /><FaTiktok size={15} />
          </div>
        </div>
      </div>
      
      {/* Main Nav */}
      <div className="nav-main">
        <Link to="/" className="logo">
          TTS <br/><span>COLLECTION</span>
        </Link>
        
        {/* Desktop Links */}
        <ul className="nav-links">
          <li className={location.pathname === '/' ? 'active' : ''}><Link to="/">Home</Link></li>
          <li className={location.pathname === '/collection' ? 'active' : ''}><Link to="/collection">Collection</Link></li>
          <li className={location.pathname === '/track-order' ? 'active' : ''}><Link to="/track-order">Track Order</Link></li>
          <li className={location.pathname === '/about' ? 'active' : ''}><Link to="/about">About</Link></li>
          <li className={location.pathname === '/contact' ? 'active' : ''}><Link to="/contact">Contact</Link></li>
        </ul>

        <div className="nav-actions">
          <Search className="icon" onClick={() => setShowSearch(!showSearch)} />
          <div onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? <Moon className="icon" /> : <Sun className="icon" />}
          </div>
          <div className="cart-icon" onClick={() => navigate('/cart')}>
            <ShoppingBag className="icon" />
            {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
          </div>
          <Link to="/signin" className="signin-btn">SIGN IN</Link>

          {/* Mobile Menu Icon (Hamburger) */}
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
          <li><Link to="/collection" onClick={() => setIsMobileMenuOpen(false)}>Collection</Link></li>
          <li><Link to="/browse-category" onClick={() => setIsMobileMenuOpen(false)}>Categories</Link></li>
          <li><Link to="/track-order" onClick={() => setIsMobileMenuOpen(false)}>Track Order</Link></li>
          <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
          <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
          <li><Link to="/signin" className="mobile-signin" onClick={() => setIsMobileMenuOpen(false)}>SIGN IN</Link></li>
        </ul>
      </div>

      {/* Search Bar Dropdown */}
      {showSearch && (
        <div className="search-bar-dropdown">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <Search size={20} color="#888" />
            <input 
              type="text" 
              placeholder="Search for products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="button" onClick={() => setShowSearch(false)} className="close-search">
              <X size={20} color="#888" />
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}