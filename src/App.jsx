import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CustomCursor from './components/CustomCursor';

// User Pages
import Home from './pages/Home';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import About from './pages/About';
import TrackOrder from './pages/TrackOrder';
import FAQ from './pages/FAQ';
import SignIn from './pages/SignIn';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import BrowseCategory from './pages/BrowseCategory';

// Admin Layout & Pages
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import Products from './admin/Products';
import Orders from './admin/Orders';
import Packing from './admin/Packing';
import Analytics from './admin/Analytics';
import Payments from './admin/Payments';
import UserEditor from './admin/UserEditor';
import Salary from './admin/Salary';
import Attendance from './admin/Attendance';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const location = useLocation();

  // Theme change effect
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Check karein ke kya user admin page par hai (taake Navbar/Footer hide ho sakein)
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      <CustomCursor />

      {/* Navbar sirf tab dikhe jab Admin page NA ho */}
      {!isAdminPage && <Navbar theme={theme} toggleTheme={toggleTheme} />}
      
      <main style={{ minHeight: isAdminPage ? '100vh' : '80vh' }}>
        <Routes>
          {/* --- USER ROUTES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/browse-category" element={<BrowseCategory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />

          {/* --- ADMIN ROUTES (Nested Layout) --- */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="packing" element={<Packing />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="payments" element={<Payments />} />
            <Route path="users" element={<UserEditor />} />
            <Route path="salary" element={<Salary />} />
            <Route path="attendance" element={<Attendance />} />
          </Route>
        </Routes>
      </main>
      
      {/* Footer aur WhatsApp sirf tab dikhe jab Admin page NA ho */}
      {!isAdminPage && <Footer />}
      {!isAdminPage && <WhatsAppButton />}
    </>
  );
}

export default App;