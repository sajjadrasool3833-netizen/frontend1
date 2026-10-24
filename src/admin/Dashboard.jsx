import React, { useState, useEffect } from 'react';
import { 
  Package, ShoppingBag, Users, DollarSign, ArrowUpRight, 
  TrendingUp, Box, CreditCard, BarChart2, UserCheck, 
  MoreHorizontal, Star, Clock, CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import './Admin.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 5, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, ordRes] = await Promise.all([
          API.get('/products'),
          API.get('/orders') 
        ]);
        
        const orders = ordRes.data || [];
        const totalRev = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);

        setStats({ 
          products: prodRes.data.length, 
          orders: orders.length, 
          users: 12, // Sample Data
          revenue: totalRev 
        });
        setRecentOrders(orders.slice(0, 4));
      } catch (error) { console.log("Data fetch error"); }
    };
    fetchData();
  }, []);

  return (
    <div className="admin-content">
      
      {/* Page Header */}
      <div className="header-row">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Welcome back, {user?.name}. Here's what's happening with your store today.</p>
        </div>
        <button className="btn-primary">Download Report</button>
      </div>

      {/* 4 STATS CARDS */}
      <div className="stats-row">
        <div className="stat-box">
          <div className="stat-icon icon-orange"><DollarSign size={24} /></div>
          <div className="stat-data">
            <span>Total Revenue</span>
            <h3>Rs {stats.revenue.toLocaleString()}</h3>
            <p className="text-green"><TrendingUp size={14}/> +15.3% this month</p>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon icon-blue"><ShoppingBag size={24} /></div>
          <div className="stat-data">
            <span>Total Orders</span>
            <h3>{stats.orders}</h3>
            <p className="text-green"><TrendingUp size={14}/> +8.1% this month</p>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon icon-green"><Users size={24} /></div>
          <div className="stat-data">
            <span>Total Customers</span>
            <h3>{stats.users}</h3>
            <p className="text-green"><TrendingUp size={14}/> +2 new today</p>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon icon-purple"><Package size={24} /></div>
          <div className="stat-data">
            <span>Total Products</span>
            <h3>{stats.products}</h3>
            <p className="text-gray">In Stock Available</p>
          </div>
        </div>
      </div>

      {/* MAIN WORKSPACE GRID */}
      <div className="dashboard-grid-advanced">
        
        {/* LEFT COLUMN (Chart + Orders) */}
        <div className="left-column">
          <div className="box-card chart-card">
            <div className="box-header">
              <h2>Sales Analytics</h2>
              <select><option>This Week</option><option>This Month</option></select>
            </div>
            <div className="bar-chart">
              {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
                <div className="bar-col" key={i}>
                  <div className="bar-fill" style={{ height: `${height}%` }}>
                    <span className="bar-tooltip">Rs {(height * 150).toLocaleString()}</span>
                  </div>
                  <span>{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="box-card table-card">
            <div className="box-header">
              <h2>Recent Orders</h2>
              <Link to="/admin/orders" className="view-all">View All <ArrowUpRight size={16}/></Link>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr><th>Order ID</th><th>Customer</th><th>Status</th><th>Amount</th></tr>
                </thead>
                <tbody>
                  {recentOrders.map(o => (
                    <tr key={o._id}>
                      <td><strong>#{o.orderId}</strong></td>
                      <td>{o.customerName}</td>
                      <td><span className={`badge ${o.orderStatus.toLowerCase()}`}>{o.orderStatus}</span></td>
                      <td><strong>Rs {o.totalAmount}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Payments, Quick Links, Top Products) */}
        <div className="right-column">
          
          <div className="box-card">
            <div className="box-header">
              <h2>Payment Methods</h2>
              <CreditCard size={20} color="#64748b" />
            </div>
            <div className="payment-list">
              <div className="payment-item">
                <span>Cash on Delivery (COD)</span>
                <span className="badge delivered">Active</span>
              </div>
              <div className="payment-item">
                <span>Bank Transfer</span>
                <span className="badge delivered">Active</span>
              </div>
            </div>
          </div>

          {/* NEW: Top Selling Products */}
          <div className="box-card">
            <div className="box-header">
              <h2>Top Selling Products</h2>
              <Star size={20} color="#64748b" />
            </div>
            <div className="payment-list">
              <div className="payment-item">
                <span>Premium Peshawari Chappal</span>
                <span style={{fontWeight:'700'}}>450 sold</span>
              </div>
              <div className="payment-item">
                <span>Brown Leather Shoes</span>
                <span style={{fontWeight:'700'}}>320 sold</span>
              </div>
              <div className="payment-item">
                <span>Cotton Vests (Pack)</span>
                <span style={{fontWeight:'700'}}>280 sold</span>
              </div>
            </div>
          </div>

          <div className="box-card">
            <div className="box-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="quick-links">
              <Link to="/admin/packing" className="quick-link-btn"><Box size={18}/> Packaging Queue</Link>
              <Link to="/admin/users" className="quick-link-btn"><UserCheck size={18}/> Edit Users</Link>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM ROW: Recent Activity (Full Width) */}
      <div className="box-card" style={{ marginTop: '24px' }}>
        <div className="box-header">
          <h2>Live Store Activity</h2>
          <MoreHorizontal size={20} color="#64748b" />
        </div>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon bg-green"><CheckCircle size={16} color="white" /></div>
            <div className="activity-text">
              <p><strong>New Order Placed</strong> by Ahmed Khan (Rs 4,500)</p>
              <span><Clock size={12} /> 2 minutes ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon bg-blue"><UserCheck size={16} color="white" /></div>
            <div className="activity-text">
              <p><strong>New Customer Registered</strong> - Sana Rehman</p>
              <span><Clock size={12} /> 45 minutes ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon bg-orange"><Package size={16} color="white" /></div>
            <div className="activity-text">
              <p><strong>Product Stock Updated</strong> - Cotton Vest (20 units added)</p>
              <span><Clock size={12} /> 1 hour ago</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;