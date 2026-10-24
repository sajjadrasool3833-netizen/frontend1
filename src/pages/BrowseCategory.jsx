import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './BrowseCategory.css';

const BrowseCategory = () => {
  const categories = [
    {
      title: "Undergarments",
      desc: "Vests, briefs, boxers, camisoles",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop",
      link: "/collection?category=Undergarments"
    },
    {
      title: "Peshawari Chappals",
      desc: "Handmade leather, Kaptaan, Kheri style",
      image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=600&auto=format&fit=crop",
      link: "/collection?category=Peshawari Chappals"
    },
    {
      title: "Footwear",
      desc: "Shoes, sandals, khussa, joggers",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
      link: "/collection?category=Footwear"
    },
    {
      title: "Fabrics & Suits",
      desc: "Unstitched, lawn, cotton, khaddar",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop",
      link: "/collection?category=Fabrics & Suits"
    }
  ];

  return (
    <div className="browse-page">
      <div className="browse-header">
        <p className="sub-heading">✦ EXPLORE OUR RANGE</p>
        <h1>Browse Categories</h1>
        <p className="desc">Find exactly what you're looking for by exploring our curated categories.</p>
      </div>

      <div className="browse-grid">
        {categories.map((cat, index) => (
          <Link to={cat.link} key={index} className="browse-card">
            <div className="browse-image">
              <img src={cat.image} alt={cat.title} />
            </div>
            <div className="browse-content">
              <h2>{cat.title}</h2>
              <p>{cat.desc}</p>
              <span className="browse-arrow">Explore <ArrowRight size={16} /></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrowseCategory;