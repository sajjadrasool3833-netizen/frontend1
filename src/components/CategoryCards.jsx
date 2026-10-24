import React from 'react';
import { Shirt, Footprints, Grid } from 'lucide-react';
import './CategoryCards.css';

const CategoryCards = () => {
  const categories = [
    { title: "Undergarments", desc: "Vests, briefs, boxers, camisoles", icon: <Shirt /> },
    { title: "Peshawari Chappals", desc: "Handmade leather, Kaptaan, Kheri style", icon: <Footprints /> },
    { title: "Footwear", desc: "Shoes, sandals, khussa, joggers", icon: <Footprints /> },
    { title: "Fabrics & Suits", desc: "Unstitched, lawn, cotton, khaddar", icon: <Grid /> },
  ];

  return (
    <section className="categories-section">
      <div className="section-header">
        <p className="section-subtitle">✦ SHOP BY CATEGORY</p>
        <h2 className="section-title">What are you looking for today?</h2>
      </div>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <div className="category-card" key={index}>
            <div className="cat-icon">{cat.icon}</div>
            <h3>{cat.title}</h3>
            <p>{cat.desc}</p>
            <a href="#" className="browse-link">Browse →</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCards;