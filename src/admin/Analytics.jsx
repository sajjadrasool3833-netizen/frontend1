import React from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, ShoppingBag, 
  Users, Eye, ArrowUpRight, MoreHorizontal, Globe, Smartphone
} from 'lucide-react';

const Analytics = () => {
  return (
    <div className="admin-content">
      
      {/* Header */}
      <div className="header-row">
        <div>
          <h1>Analytics & Reports</h1>
          <p>Deep dive into your store's performance, traffic, and sales.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select className="btn-primary" style={{ background: 'white', color: '#0f172a', border: '1px solid #e2e8f0', padding: '10px 15px' }}>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
          <button className="btn-primary">Export Data</button>
        </div>
      </div>

      {/* 4 TOP METRICS */}
      <div className="stats-row">
        <div className="stat-box">
          <div className="stat-icon icon-blue"><DollarSign size={24} /></div>
          <div className="stat-data">
            <span>Total Revenue</span>
            <h3>Rs 2,450,000</h3>
            <p className="text-green"><TrendingUp size={14}/> +15.3%</p>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon icon-green"><ShoppingBag size={24} /></div>
          <div className="stat-data">
            <span>Total Sales</span>
            <h3>12,450</h3>
            <p className="text-green"><TrendingUp size={14}/> +8.1%</p>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon icon-orange"><Users size={24} /></div>
          <div className="stat-data">
            <span>Visitors</span>
            <h3>45,200</h3>
            <p className="text-green"><TrendingUp size={14}/> +22.4%</p>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon icon-purple"><Eye size={24} /></div>
          <div className="stat-data">
            <span>Conversion Rate</span>
            <h3>3.8%</h3>
            <p style={{color: '#ef4444', fontSize:'12px', fontWeight:'600'}}><TrendingDown size={14}/> -0.5%</p>
          </div>
        </div>
      </div>

      {/* MAIN CHART ROW */}
      <div className="dashboard-grid-advanced" style={{ gridTemplateColumns: '2fr 1fr', marginBottom: '24px' }}>
        
        {/* Revenue Chart */}
        <div className="box-card">
          <div className="box-header">
            <div>
              <h2>Revenue vs Orders</h2>
              <p style={{ fontSize: '13px', color: '#64748b' }}>Monthly performance overview</p>
            </div>
            <div style={{ display: 'flex', gap: '15px', fontSize: '13px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '10px', height: '10px', background: '#f05a28', borderRadius: '50%' }}></span> Revenue</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '10px', height: '10px', background: '#3b82f6', borderRadius: '50%' }}></span> Orders</span>
            </div>
          </div>
          <div className="bar-chart" style={{ height: '280px', marginTop: '20px', gap: '20px' }}>
            {[30, 50, 40, 80, 70, 100].map((h, i) => (
              <div className="bar-col" key={i} style={{ width: '15%' }}>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '100%', width: '100%', justifyContent: 'center' }}>
                  <div className="bar-fill" style={{ height: `${h}%`, width: '40%' }}>
                    <span className="bar-tooltip">Rs {(h * 1500).toLocaleString()}</span>
                  </div>
                  <div className="bar-fill" style={{ height: `${h * 0.8}%`, width: '40%', background: '#3b82f6' }}>
                    <span className="bar-tooltip">{h * 10} orders</span>
                  </div>
                </div>
                <span>{['Jan','Feb','Mar','Apr','May','Jun'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources (Donut Chart Style List) */}
        <div className="box-card">
          <div className="box-header">
            <h2>Traffic Sources</h2>
          </div>
          <div className="payment-list" style={{ marginTop: '20px' }}>
            <div className="payment-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Globe size={16} color="#f05a28"/> Direct Search</div>
              <span style={{ fontWeight: '700' }}>45%</span>
            </div>
            <div className="payment-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Smartphone size={16} color="#3b82f6"/> Social Media</div>
              <span style={{ fontWeight: '700' }}>30%</span>
            </div>
            <div className="payment-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={16} color="#10b981"/> Referrals</div>
              <span style={{ fontWeight: '700' }}>15%</span>
            </div>
            <div className="payment-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Eye size={16} color="#8b5cf6"/> Other</div>
              <span style={{ fontWeight: '700' }}>10%</span>
            </div>
          </div>
          <div style={{ marginTop: '25px', background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '5px' }}>Top Performing Channel</p>
            <h4 style={{ color: '#0f172a', fontSize: '15px' }}>Direct Search (+12.5%)</h4>
          </div>
        </div>
      </div>

      {/* BOTTOM TABLES ROW */}
      <div className="dashboard-grid-advanced" style={{ gridTemplateColumns: '1fr 1fr' }}>
        
        {/* Top Products */}
        <div className="box-card">
          <div className="box-header">
            <h2>Top Selling Products</h2>
            <ArrowUpRight size={18} color="#64748b" />
          </div>
          <table>
            <thead><tr><th>Product Name</th><th>Sales</th><th>Revenue</th></tr></thead>
            <tbody>
              <tr><td>Premium Peshawari Chappal</td><td>1,245</td><td>Rs 560,000</td></tr>
              <tr><td>Cotton Vest (Pack of 3)</td><td>980</td><td>Rs 294,000</td></tr>
              <tr><td>Brown Leather Shoes</td><td>750</td><td>Rs 375,000</td></tr>
              <tr><td>Handmade Kaptaan Chappal</td><td>620</td><td>Rs 434,000</td></tr>
            </tbody>
          </table>
        </div>

        {/* Recent Transactions */}
        <div className="box-card">
          <div className="box-header">
            <h2>Top Locations (Cities)</h2>
            <MoreHorizontal size={18} color="#64748b" />
          </div>
          <table>
            <thead><tr><th>City</th><th>Orders</th><th>Revenue</th></tr></thead>
            <tbody>
              <tr><td>Toba Tek Singh</td><td>5,420</td><td>Rs 1,200,000</td></tr>
              <tr><td>Gojra</td><td>2,100</td><td>Rs 450,000</td></tr>
              <tr><td>Kamalia</td><td>1,850</td><td>Rs 380,000</td></tr>
              <tr><td>Faisalabad</td><td>980</td><td>Rs 210,000</td></tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
export default Analytics;