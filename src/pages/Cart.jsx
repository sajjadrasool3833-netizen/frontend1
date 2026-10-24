import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowLeft, Plus, Minus, Truck, ShoppingBag } from 'lucide-react';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const navigate = useNavigate();

  // Total Price Calculate karein
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingThreshold = 5000;
  const freeShippingLeft = shippingThreshold - subtotal;
  const shippingFee = freeShippingLeft > 0 ? 200 : 0;
  const finalTotal = subtotal + shippingFee;

  const increaseQuantity = (item) => {
    addToCart(item); 
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      removeFromCart(item._id);
      addToCart({ ...item, quantity: item.quantity - 1 }); 
    } else {
      removeFromCart(item._id); 
    }
  };

  // Agar Cart Khali Hai
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-page">
        <ShoppingBag size={60} color="#f05a28" />
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/collection" className="btn-primary" style={{ textDecoration: 'none' }}>Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* Header */}
      <div className="cart-header-section">
        <div>
          <p className="sub-heading">Your Selection</p>
          <h1>Shopping Cart</h1>
          <p className="item-count">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>
        <Link to="/collection" className="continue-shopping">
          <ArrowLeft size={16} /> Continue Shopping
        </Link>
      </div>

      {/* Free Shipping Bar */}
      <div className="free-shipping-bar">
        <Truck size={20} />
        {freeShippingLeft > 0 ? (
          <span>Add <strong>Rs {freeShippingLeft}</strong> more for free shipping</span>
        ) : (
          <span style={{ color: '#16a34a' }}>You have unlocked Free Shipping! 🎉</span>
        )}
      </div>

      <div className="cart-grid">
        {/* Left Side: Cart Items */}
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div className="cart-item-card" key={item._id}>
              <img src={item.images?.[0] || 'https://via.placeholder.com/100'} alt={item.name} />
              
              <div className="item-details">
                <h3>{item.name}</h3>
                <div className="quantity-control">
                  <button onClick={() => decreaseQuantity(item)}><Minus size={14} /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item)}><Plus size={14} /></button>
                </div>
              </div>

              <div className="item-price-section">
                <span className="item-price">Rs {(item.price * item.quantity).toLocaleString()}</span>
                <button className="delete-btn" onClick={() => removeFromCart(item._id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <button className="clear-cart-btn" onClick={() => cartItems.forEach(item => removeFromCart(item._id))}>
            <Trash2 size={16} /> Clear Cart
          </button>
        </div>

        {/* Right Side: Order Summary */}
        <div className="order-summary-section">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
            <span>Rs {subtotal.toLocaleString()}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping (est.)</span>
            <span>{shippingFee === 0 ? 'Free' : `Rs ${shippingFee}`}</span>
          </div>
          
          <div className="summary-row">
            <span>Estimated Tax (8%)</span>
            <span>Rs 0</span>
          </div>

          <div className="summary-row total-row">
            <span>Total</span>
            <span>Rs {finalTotal.toLocaleString()}</span>
          </div>

          <button 
            className="place-order-btn" 
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;