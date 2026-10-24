import React, { useState, useEffect } from 'react';
import { Search, Eye, Filter, MoreHorizontal, ShoppingBag, Truck, CheckCircle, Clock } from 'lucide-react';
import API from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null); // Modal ke liye

  useEffect(() => {
    API.get('/orders').then(res => setOrders(res.data)).catch(err => console.log(err));
  }, []);

  // Search Filter
  const filteredOrders = orders.filter(o => 
    o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats Calculate
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const pendingOrders = orders.filter(o => o.orderStatus === 'Pending').length;
  const deliveredOrders = orders.filter(o => o.orderStatus === 'Delivered').length;

  return (
    <div className="admin-content">
      
      {/* Page Header */}
      <div className="header-row">
        <div>
          <h1>Order Management</h1>
          <p>View, track, and update the status of your customer orders.</p>
        </div>
      </div>

      {/* Mini Stats Row */}
      <div className="stats-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '24px' }}>
        <div className="stat-box" style={{ padding: '20px' }}>
          <div className="stat-icon icon-blue" style={{ width: '45px', height: '45px' }}><ShoppingBag size={20} /></div>
          <div className="stat-data">
            <span>Total Orders</span>
            <h3>{orders.length}</h3>
          </div>
        </div>
        <div className="stat-box" style={{ padding: '20px' }}>
          <div className="stat-icon icon-orange" style={{ width: '45px', height: '45px' }}><Clock size={20} /></div>
          <div className="stat-data">
            <span>Pending</span>
            <h3>{pendingOrders}</h3>
          </div>
        </div>
        <div className="stat-box" style={{ padding: '20px' }}>
          <div className="stat-icon icon-green" style={{ width: '45px', height: '45px' }}><CheckCircle size={20} /></div>
          <div className="stat-data">
            <span>Delivered</span>
            <h3>{deliveredOrders}</h3>
          </div>
        </div>
        <div className="stat-box" style={{ padding: '20px' }}>
          <div className="stat-icon icon-purple" style={{ width: '45px', height: '45px' }}><Truck size={20} /></div>
          <div className="stat-data">
            <span>Total Revenue</span>
            <h3>Rs {totalRevenue.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="box-card">
        
        {/* Table Controls (Search & Filter) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div className="search-wrapper" style={{ width: '300px', background: '#f8fafc' }}>
            <Search size={18} color="#64748b" />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} /> Filter by Date
          </button>
        </div>

        {/* Orders Table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr><td colSpan="6" style={{textAlign:'center', padding: '20px'}}>No orders found.</td></tr>
              ) : (
                filteredOrders.map(o => (
                  <tr key={o._id}>
                    <td><strong>{o.orderId}</strong></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '35px', height: '35px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#64748b' }}>
                          {o.customerName.charAt(0).toUpperCase()}
                        </div>
                        {o.customerName}
                      </div>
                    </td>
                    <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td><strong>Rs {o.totalAmount.toLocaleString()}</strong></td>
                    <td>
                      <span className={`badge ${o.orderStatus ? o.orderStatus.toLowerCase() : 'pending'}`}>
                        {o.orderStatus || 'Pending'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          className="btn-edit" 
                          style={{ background: '#f1f5f9', color: '#3b82f6' }} 
                          title="View Details"
                          onClick={() => setSelectedOrder(o)} // Modal open karega
                        >
                          <Eye size={16}/>
                        </button>
                        <button className="btn-edit" style={{ background: '#f1f5f9', color: '#64748b' }} title="Update Status">
                          <MoreHorizontal size={16}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal (Jab Eye par click ho) */}
      {selectedOrder && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="box-card" style={{ width: '500px', maxWidth: '90%' }}>
            <div className="box-header">
              <h2>Order Details: {selectedOrder.orderId}</h2>
              <button onClick={() => setSelectedOrder(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>✕</button>
            </div>
            
            <div style={{ marginBottom: '20px', fontSize: '14px' }}>
              <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
              <p><strong>Phone:</strong> {selectedOrder.phone}</p>
              <p><strong>Address:</strong> {selectedOrder.shippingAddress}</p>
            </div>

            <h3 style={{ fontSize: '16px', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>Items Ordered</h3>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {selectedOrder.items?.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span>{item.name} <strong style={{color: '#64748b'}}>x{item.quantity}</strong></span>
                  <span>Rs {item.price}</span>
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontWeight: 'bold', fontSize: '18px' }}>
              <span>Total:</span>
              <span>Rs {selectedOrder.totalAmount}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default Orders;