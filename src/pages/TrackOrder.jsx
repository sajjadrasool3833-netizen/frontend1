import React, { useState } from 'react';
import { Package, Search, Truck, CheckCircle, Clock } from 'lucide-react';
import API from '../services/api';
import './TrackOrder.css';

const TrackOrder = () => {
  const [phone, setPhone] = useState('');
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setError('');
    setOrder(null);
    setLoading(true);

    try {
      // Backend ko phone ya orderId bhejein
      const { data } = await API.post('/orders/track', { phone, orderId });
      setOrder(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Order not found. Please check your details.');
    }
    setLoading(false);
  };

  // Status ke hisaab se icon aur color
  const getStatusDisplay = (status) => {
    switch(status) {
      case 'Pending': return <Clock size={20} color="#f59e0b" />;
      case 'Dispatched': return <Truck size={20} color="#3b82f6" />;
      case 'Delivered': return <CheckCircle size={20} color="#10b981" />;
      default: return <Package size={20} />;
    }
  };

  return (
    <div className="track-page">
      <div className="track-header">
        <div className="track-badge"><Package size={16} /> ORDER TRACKING</div>
        <h1>Track Your Orders</h1>
        <p>Enter your phone number or order ID — no account needed</p>
      </div>

      <div className="track-form-card">
        <div className="form-title-row">
          <div className="search-icon-box"><Search color="#f05a28" size={24} /></div>
          <div>
            <h2>Find Your Orders</h2>
            <p>We'll show all orders linked to your details</p>
          </div>
        </div>

        <form onSubmit={handleTrack}>
          <div className="track-inputs">
            <div className="input-group">
              <label>PHONE NUMBER</label>
              <input 
                type="text" 
                placeholder="+92 300 0000000" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <span className="or-divider">OR</span>
            <div className="input-group">
              <label>ORDER ID (LAST 8 CHARS)</label>
              <input 
                type="text" 
                placeholder="ABC12345" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="track-btn" disabled={loading}>
            <Search size={18} /> {loading ? 'Searching...' : 'Track Orders'}
          </button>
        </form>

        {/* Error Message */}
        {error && <div className="track-error">{error}</div>}

        {/* Order Result */}
        {order && (
          <div className="order-result-card">
            <div className="order-result-header">
              <div>
                <h3>Order ID: {order.orderId}</h3>
                <p>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="status-badge">
                {getStatusDisplay(order.orderStatus)}
                <span>{order.orderStatus}</span>
              </div>
            </div>

            <div className="order-items-list">
              {order.items.map((item, index) => (
                <div className="order-item-row" key={index}>
                  <span>{item.quantity}x {item.name}</span>
                  <span>Rs {item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="order-total-row">
              <span>Total Amount</span>
              <span>Rs {order.totalAmount}</span>
            </div>
            
            <div className="shipping-info">
              <strong>Shipping Address:</strong> {order.shippingAddress}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;