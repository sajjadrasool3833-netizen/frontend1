import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Truck, ShieldCheck } from "lucide-react";
import './Checkout.css';

const Checkout = () => {
  const { cartItems, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ customerName: '', phone: '', shippingAddress: '' });
  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        items: cartItems.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount
      };

      const { data } = await API.post('/orders', orderData);
      alert(`Order Placed Successfully! Your Order ID is: ${data.orderId}`);
      setIsCartOpen(false); // Cart band kar dein
      navigate('/track-order'); // Order track page par bhej dein
    } catch (error) {
      alert('Error placing order. Please try again.');
    }
    setLoading(false);
  };

  // Agar cart khali hai to checkout page par kuch nahi dikhega
  if (cartItems.length === 0) {
    return (
      <div className="empty-checkout">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/collection')}>Go to Collection</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your order details below</p>
      </div>

      <div className="checkout-grid">
        {/* LEFT SIDE - FORM */}
        <div className="checkout-form-section">
          <h2>Shipping Details</h2>
          <form onSubmit={handlePlaceOrder} className="checkout-form">
            
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="e.g. Ahmed Khan" 
                required 
                onChange={(e) => setFormData({...formData, customerName: e.target.value})} 
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="text" 
                placeholder="e.g. 0300 1234567" 
                required 
                onChange={(e) => setFormData({...formData, phone: e.target.value})} 
              />
            </div>

            <div className="form-group">
              <label>Complete Shipping Address</label>
              <textarea 
                placeholder="House no, Street, Area, City" 
                required 
                onChange={(e) => setFormData({...formData, shippingAddress: e.target.value})} 
              ></textarea>
            </div>

            <div className="payment-method">
              <h3>Payment Method</h3>
              <div className="cod-box">
                <input type="radio" checked readOnly />
                <div>
                  <strong>Cash on Delivery (COD)</strong>
                  <p>Pay when you receive your order.</p>
                </div>
              </div>
            </div>

            <button type="submit" className="place-order-btn" disabled={loading}>
              {loading ? 'Placing Order...' : `Place Order (Rs ${totalAmount})`}
            </button>
            
            <div className="trust-badges">
              <span><Truck size={16} /> Fast Delivery</span>
              <span><ShieldCheck size={16} /> Secure Order</span>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="order-summary-section">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cartItems.map((item) => (
              <div className="summary-item" key={item._id}>
                <img src={item.images?.[0]} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
                <span className="item-price">Rs {item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>Rs {totalAmount}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="total-row grand-total">
              <span>Total</span>
              <span>Rs {totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;