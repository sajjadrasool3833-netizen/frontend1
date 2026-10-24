import React from 'react';
import { Link } from 'react-router-dom'; // Button par link lagane ke liye
import { ArrowRight, Truck, Star } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-subtitle">✦ SERVING TOBA TEK SINGH SINCE 2018</p>
        <h1 className="hero-title">
          Undergarments. <br />
          <span className="highlight">Peshawari Chappals.</span> <br />
          Delivered Fast.
        </h1>
        <p className="hero-desc">
          Toba Tek Singh's trusted online store for premium undergarments, handmade Peshawari chappals (Kheri & Kaptaan), footwear, and fabrics. Order from your phone — cash on delivery — same-day delivery in Toba Tek Singh city.
        </p>
        <div className="hero-buttons">
          {/* Buttons ko Link banaya taake click par page change ho */}
          <Link to="/collection" className="btn-primary" style={{ textDecoration: 'none' }}>
            Shop Now <ArrowRight size={18} />
          </Link>
          <Link to="/collection" className="btn-secondary" style={{ textDecoration: 'none' }}>
            Browse by Category
          </Link>
        </div>
        <div className="hero-badges">
          <span><Truck size={18} /> Same-Day Delivery in Toba Tek Singh</span>
          <span><Star size={18} color="#f05a28" fill="#f05a28" /> 4.8 · 6,000+ Orders</span>
        </div>
      </div>
      <div className="hero-image">
        {/* Online Image URL yahan laga diya hai */}
        <img 
          src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop" 
          alt="Peshawari Chappal" 
        />
      </div>
    </section>
  );
};

export default HeroSection;