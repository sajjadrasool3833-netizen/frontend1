import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} />
        <button className="wishlist-btn"><Heart size={18} /></button>
        <button className="add-to-cart-btn"><ShoppingCart size={18} /> Add to Cart</button>
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <Star size={14} fill="#f05a28" color="#f05a28" />
          <Star size={14} fill="#f05a28" color="#f05a28" />
          <Star size={14} fill="#f05a28" color="#f05a28" />
          <Star size={14} fill="#f05a28" color="#f05a28" />
          <Star size={14} fill="#f05a28" color="#f05a28" />
          <span>(0)</span>
        </div>
        <div className="product-price">
          <span className="current-price">{product.price}</span>
          {product.oldPrice && <span className="old-price">{product.oldPrice}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;