import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Import karein

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const navigate = useNavigate(); // <-- Hook

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((x) => x._id === product._id);
      if (exist) {
        return prev.map((x) => x._id === product._id ? { ...exist, quantity: exist.quantity + 1 } : x);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    // Sidebar ki jagah direct Cart Page par le jayein
    navigate('/cart'); 
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);