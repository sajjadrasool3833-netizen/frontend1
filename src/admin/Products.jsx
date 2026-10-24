import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Search, Filter, Package, Image as ImageIcon } from 'lucide-react';
import API from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', price: '', category: '', description: '', imageUrl: '' });

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data);
    } catch (error) { console.log(error); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const defaultImg = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600";
    try {
      const { data } = await API.post('/products', { 
        ...formData, 
        price: Number(formData.price), 
        images: [formData.imageUrl || defaultImg] 
      });
      setProducts([data, ...products]); 
      setFormData({ name: '', price: '', category: '', description: '', imageUrl: '' });
      setShowForm(false); // Form band kar dein save hone ke baad
    } catch (error) { alert('Error adding product'); }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this product?")) {
      await API.delete(`/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    }
  };

  // Search Filter
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-content">
      
      {/* Page Header */}
      <div className="header-row">
        <div>
          <h1>Product Management</h1>
          <p>Manage your store inventory, prices, and categories.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> {showForm ? 'Close Form' : 'Add New Product'}
        </button>
      </div>

      {/* Add Product Form (Toggleable) */}
      {showForm && (
        <div className="box-card" style={{ marginBottom: '24px', animation: 'slideDown 0.3s ease' }}>
          <div className="box-header"><h2>Add New Product</h2></div>
          <form onSubmit={handleAdd} className="admin-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label>Product Name</label>
              <input type="text" placeholder="e.g. Premium Peshawari Chappal" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Price (Rs)</label>
              <input type="number" placeholder="4500" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input type="text" placeholder="e.g. Footwear" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input type="text" placeholder="https://images.unsplash.com/..." value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Description</label>
              <textarea placeholder="Write product details here..." required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="btn-primary">Save Product</button>
            </div>
          </form>
        </div>
      )}

      {/* Stats Mini Row */}
      <div className="stats-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '24px' }}>
        <div className="stat-box" style={{ padding: '15px 20px' }}>
          <div className="stat-icon icon-orange" style={{ width: '40px', height: '40px' }}><Package size={20} /></div>
          <div className="stat-data">
            <span>Total Products</span>
            <h3>{products.length}</h3>
          </div>
        </div>
        <div className="stat-box" style={{ padding: '15px 20px' }}>
          <div className="stat-icon icon-green" style={{ width: '40px', height: '40px' }}><Package size={20} /></div>
          <div className="stat-data">
            <span>In Stock</span>
            <h3>{products.length}</h3>
          </div>
        </div>
        <div className="stat-box" style={{ padding: '15px 20px' }}>
          <div className="stat-icon icon-purple" style={{ width: '40px', height: '40px' }}><ImageIcon size={20} /></div>
          <div className="stat-data">
            <span>Categories</span>
            <h3>{[...new Set(products.map(p => p.category))].length}</h3>
          </div>
        </div>
      </div>

      {/* Product List Table */}
      <div className="box-card">
        
        {/* Table Header (Search & Filter) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div className="search-wrapper" style={{ width: '300px', background: '#f8fafc' }}>
            <Search size={18} color="#64748b" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} /> Filter
          </button>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Product Info</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr><td colSpan="5" style={{textAlign: 'center', padding: '30px'}}>No products found.</td></tr>
              ) : (
                filteredProducts.map(p => (
                  <tr key={p._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <img 
                          src={p.images?.[0] || 'https://via.placeholder.com/50'} 
                          alt={p.name} 
                          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', background: '#f1f5f9' }} 
                        />
                        <div>
                          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700' }}>{p.name}</h4>
                          <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>ID: {p._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge pending" style={{ background: '#f1f5f9', color: '#334155' }}>{p.category}</span></td>
                    <td><strong>Rs {p.price.toLocaleString()}</strong></td>
                    <td><span className="badge delivered">In Stock</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="btn-edit" style={{ background: '#f1f5f9', color: '#3b82f6' }}><Edit size={16}/></button>
                        <button className="btn-delete" style={{ background: '#fee2e2', color: '#ef4444' }} onClick={() => handleDelete(p._id)}><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Products;