import React from 'react';
import { Star, Shield, RotateCcw, Truck } from 'lucide-react';

const About = () => {
  return (
    <div style={{ padding: '60px 50px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Our Story */}
      <div style={{ marginBottom: '80px' }}>
        <p style={{ color: 'var(--primary-orange)', fontWeight: '700', marginBottom: '10px' }}>Our Story</p>
        <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px' }}>
          Timeless design, <br/><span style={{ color: 'var(--primary-orange)', fontStyle: 'italic' }}>modern spirit.</span>
        </h1>
        <p style={{ color: 'var(--text-gray)', fontSize: '18px', maxWidth: '700px', lineHeight: '1.6' }}>
          TTS Collection was born from a simple idea: that everyday clothing should feel as good as it looks. We design considered pieces for people who care about quality, comfort, and craft — not fast trends.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', justifyContent: 'space-between', background: '#fafafa', padding: '40px', borderRadius: '15px', marginBottom: '80px', textAlign: 'center' }}>
        <div><h2 style={{ fontSize: '32px', color: 'var(--primary-orange)' }}>2018</h2><p style={{ color: 'var(--text-gray)', fontSize: '12px', fontWeight: '600' }}>FOUNDED</p></div>
        <div><h2 style={{ fontSize: '32px', color: 'var(--primary-orange)' }}>25k+</h2><p style={{ color: 'var(--text-gray)', fontSize: '12px', fontWeight: '600' }}>HAPPY CUSTOMERS</p></div>
        <div><h2 style={{ fontSize: '32px', color: 'var(--primary-orange)' }}>60+</h2><p style={{ color: 'var(--text-gray)', fontSize: '12px', fontWeight: '600' }}>COUNTRIES SHIPPED</p></div>
        <div><h2 style={{ fontSize: '32px', color: 'var(--primary-orange)' }}>4.9★</h2><p style={{ color: 'var(--text-gray)', fontSize: '12px', fontWeight: '600' }}>AVERAGE RATING</p></div>
      </div>

      {/* Four Principles */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p style={{ color: 'var(--primary-orange)', fontWeight: '700' }}>What We Stand For</p>
        <h2 style={{ fontSize: '36px', fontWeight: '800' }}>Four principles, one wardrobe.</h2>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ border: '1px solid #eee', padding: '30px', borderRadius: '15px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Crafted with Intention</h3>
          <p style={{ color: 'var(--text-gray)' }}>Every stitch, seam, and silhouette is designed with purpose — nothing is accidental.</p>
        </div>
        <div style={{ border: '1px solid #eee', padding: '30px', borderRadius: '15px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Built to Last</h3>
          <p style={{ color: 'var(--text-gray)' }}>We choose premium materials and slow-fashion practices so your pieces stay with you.</p>
        </div>
        <div style={{ border: '1px solid #eee', padding: '30px', borderRadius: '15px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Mindful & Ethical</h3>
          <p style={{ color: 'var(--text-gray)' }}>Fair labor, low-waste production, and packaging that respects the planet.</p>
        </div>
        <div style={{ border: '1px solid #eee', padding: '30px', borderRadius: '15px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Quality Over Quantity</h3>
          <p style={{ color: 'var(--text-gray)' }}>Small, focused collections. Every release is a considered edit — not a race.</p>
        </div>
      </div>
    </div>
  );
};

export default About;