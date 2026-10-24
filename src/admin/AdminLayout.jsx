import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut, 
  Bell, Search, BarChart2, CreditCard, Box, UserCheck, DollarSign, CalendarCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Admin.css';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-layout">
      
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <h2>TTS <span>Admin Panel</span></h2>
        </div>
        
        <nav className="sidebar-menu">
          <Link to="/admin" className={`menu-link ${location.pathname === '/admin' ? 'active' : ''}`}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/admin/products" className={`menu-link ${location.pathname === '/admin/products' ? 'active' : ''}`}>
            <Package size={20} /> Product Management
          </Link>
          <Link to="/admin/orders" className={`menu-link ${location.pathname === '/admin/orders' ? 'active' : ''}`}>
            <ShoppingBag size={20} /> Order Management
          </Link>
          <Link to="/admin/packing" className={`menu-link ${location.pathname === '/admin/packing' ? 'active' : ''}`}>
            <Box size={20} /> Packaging
          </Link>
          <Link to="/admin/analytics" className={`menu-link ${location.pathname === '/admin/analytics' ? 'active' : ''}`}>
            <BarChart2 size={20} /> Analytics
          </Link>
          <Link to="/admin/payments" className={`menu-link ${location.pathname === '/admin/payments' ? 'active' : ''}`}>
            <CreditCard size={20} /> Payment Methods
          </Link>
          <Link to="/admin/users" className={`menu-link ${location.pathname === '/admin/users' ? 'active' : ''}`}>
            <UserCheck size={20} /> User Editor
          </Link>
          <Link to="/admin/salary" className={`menu-link ${location.pathname === '/admin/salary' ? 'active' : ''}`}>
            <DollarSign size={20} /> Salary Manager
          </Link>
          <Link to="/admin/attendance" className={`menu-link ${location.pathname === '/admin/attendance' ? 'active' : ''}`}>
            <CalendarCheck size={20} /> Attendance
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        
        {/* TOPBAR */}
        <header className="admin-topbar">
          <div className="search-wrapper">
            <Search size={18} color="#64748b" />
            <input type="text" placeholder="Search..." />
          </div>
          <div className="topbar-right">
            <button className="icon-btn"><Bell size={20} /></button>
            <div className="profile-box">
              <div className="profile-img">{user?.name?.charAt(0).toUpperCase()}</div>
              <div className="profile-text">
                <span>{user?.name}</span>
                <small>Administrator</small>
              </div>
            </div>
          </div>
        </header>

        {/* Yahan pages load honge */}
        <Outlet /> 
        
      </main>
    </div>
  );
};

export default AdminLayout;