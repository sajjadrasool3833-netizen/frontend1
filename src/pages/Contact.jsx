import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <p style={{ color: '#f05a28', fontWeight: '600' }}>Get in Touch</p>
        <h1 style={{ fontSize: '48px', fontWeight: '800' }}>We'd love to <span style={{ color: '#f05a28', fontStyle: 'italic' }}>hear from you.</span></h1>
        <p style={{ color: '#666', maxWidth: '600px', margin: '15px auto' }}>Questions about an order, sizing, or a custom request? Send us a message or reach out directly — we're a small team and we answer every message personally.</p>
      </div>

      <div style={{ display: 'flex', gap: '30px' }}>
        {/* Left Info */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', gap: '15px', border: '1px solid #eee', padding: '20px', borderRadius: '12px' }}>
            <Mail color="#f05a28" />
            <div><h4 style={{ fontSize: '12px', color: '#888', letterSpacing: '1px' }}>EMAIL</h4><p style={{ fontWeight: '600' }}>hello@ttscollection.com</p><span style={{ fontSize: '12px', color: '#888' }}>We reply within 24 hours</span></div>
          </div>
          <div style={{ display: 'flex', gap: '15px', border: '1px solid #eee', padding: '20px', borderRadius: '12px' }}>
            <Phone color="#f05a28" />
            <div><h4 style={{ fontSize: '12px', color: '#888', letterSpacing: '1px' }}>PHONE</h4><p style={{ fontWeight: '600' }}>+1 (234) 567-890</p><span style={{ fontSize: '12px', color: '#888' }}>Mon–Fri, 9am–6pm EST</span></div>
          </div>
          <div style={{ display: 'flex', gap: '15px', border: '1px solid #eee', padding: '20px', borderRadius: '12px' }}>
            <MapPin color="#f05a28" />
            <div><h4 style={{ fontSize: '12px', color: '#888', letterSpacing: '1px' }}>STUDIO</h4><p style={{ fontWeight: '600' }}>123 Fashion Ave</p><span style={{ fontSize: '12px', color: '#888' }}>Visits by appointment</span></div>
          </div>
          <button style={{ background: '#25D366', color: 'white', padding: '15px', border: 'none', borderRadius: '10px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px' }}><MessageCircle size={18}/> Chat on WhatsApp</button>
        </div>

        {/* Right Form */}
        <div style={{ flex: 1.5, border: '1px solid #eee', padding: '30px', borderRadius: '15px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '5px' }}>Send us a message</h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '25px' }}>Fill in the form below and we'll respond as soon as we can.</p>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', gap: '15px' }}>
              <input type="text" placeholder="Jane Doe" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
              <input type="email" placeholder="you@example.com" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
            </div>
            <input type="text" placeholder="How can we help?" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
            <textarea placeholder="Tell us a bit more about your question..." style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', height: '100px', resize: 'none' }}></textarea>
            <button type="submit" style={{ background: '#f05a28', color: 'white', padding: '15px', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '16px' }}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;