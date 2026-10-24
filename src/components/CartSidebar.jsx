import React from 'react';
import { useCart } from '../context/CartContext';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
  const { cartItems, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isCartOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, width: '400px', height: '100vh', background: 'white', boxShadow: '-5px 0 15px rgba(0,0,0,0.1)', zIndex: 1000, padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
        <h2>Your Cart</h2>
        <X onClick={() => setIsCartOpen(false)} style={{ cursor: 'pointer' }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', marginTop: '20px' }}>
        {cartItems.length === 0 ? <p>Your cart is empty.</p> : cartItems.map(item => (
          <div key={item._id} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <img src={item.images[0]} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
            <div>
              <h4 style={{ fontSize: '14px' }}>{item.name}</h4>
              <p style={{ fontSize: '12px', color: '#666' }}>Qty: {item.quantity} x Rs {item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <h3>Total: Rs {total}</h3>
        <button onClick={() => navigate('/checkout')} style={{ width: '100%', background: '#f05a28', color: 'white', padding: '15px', border: 'none', borderRadius: '8px', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer' }}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;