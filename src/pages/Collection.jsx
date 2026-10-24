import React, { useState } from 'react';
import { Search, LayoutGrid, List, Heart, Filter } from 'lucide-react';
import { useCart } from '../context/CartContext'; // <-- Cart Hook Import kiya
import './Collection.css';

const Collection = () => {
  const { addToCart } = useCart(); // <-- Hook initialize kiya

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Asli products (Maine inme '_id' add kar diya hai taake cart pehchan sake)
  const allProducts = [
    {
      _id: '1', // Zaroori hai
      name: "Premium Brown Peshawari Chappal",
      category: "Peshawari Chappals",
      price: 4500,
      image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=400",
      images: ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=400"], // Cart ke liye
      rating: 4,
      inStock: true,
      isSale: false
    },
    {
      _id: '2',
      name: "gf",
      category: "Footwear",
      price: 500,
      oldPrice: 600,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400",
      images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400"],
      rating: 3,
      inStock: true,
      isSale: true
    },
    {
      _id: '3',
      name: "Cotton Vest",
      category: "Undergarments",
      price: 300,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400",
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400"],
      rating: 5,
      inStock: true,
      isSale: false
    }
  ];

  // Default Filters
  const defaultFilters = {
    category: 'All Categories',
    rating: 'Any Rating',
    sortBy: 'Newest',
    minPrice: '',
    maxPrice: '',
    inStock: false,
    onSale: false
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);

  // Handle Input Change
  const handleFilterChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFilters({ ...filters, [e.target.name]: value });
  };

  // Apply Filters
  const handleApplyFilters = () => {
    setAppliedFilters(filters); 
    setShowAdvanced(false); 
  };

  // Clear All Filters
  const handleClearAll = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setSearchQuery('');
  };

  // Filter Logic (Products filter karna)
  const filteredProducts = allProducts.filter(product => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (appliedFilters.category !== 'All Categories' && product.category !== appliedFilters.category) {
      return false;
    }
    if (appliedFilters.minPrice && product.price < Number(appliedFilters.minPrice)) {
      return false;
    }
    if (appliedFilters.maxPrice && product.price > Number(appliedFilters.maxPrice)) {
      return false;
    }
    if (appliedFilters.inStock && !product.inStock) {
      return false;
    }
    if (appliedFilters.onSale && !product.isSale) {
      return false;
    }
    if (appliedFilters.rating !== 'Any Rating' && product.rating < Number(appliedFilters.rating)) {
      return false;
    }
    return true;
  });

  return (
    <div className="collection-page">
      {/* Header */}
      <div className="collection-header">
        <p className="sub-heading">Collection</p>
        <h1>All Products</h1>
        <p className="desc">{filteredProducts.length} products found</p>
      </div>

      {/* Search Bar */}
      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <Search size={20} color="#888" />
          <input 
            type="text" 
            placeholder="Search products by name, brand, keyword..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="btn-search">Search</button>
        <button 
          className={`btn-advanced ${showAdvanced ? 'active' : ''}`}
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <Filter size={18} /> Advanced
        </button>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvanced && (
        <div className="advanced-filters-panel">
          <div className="filter-row">
            {/* ... (Filter code waisa hi rahega) ... */}
            <div className="filter-group">
              <label>CATEGORY</label>
              <select name="category" value={filters.category} onChange={handleFilterChange}>
                <option value="All Categories">All Categories</option>
                <option value="Undergarments">Undergarments</option>
                <option value="Peshawari Chappals">Peshawari Chappals</option>
                <option value="Footwear">Footwear</option>
              </select>
            </div>

            <div className="filter-group">
              <label>MINIMUM RATING</label>
              <select name="rating" value={filters.rating} onChange={handleFilterChange}>
                <option value="Any Rating">Any Rating</option>
                <option value="4">4★ & above</option>
                <option value="3">3★ & above</option>
              </select>
            </div>

            <div className="filter-group">
              <label>SORT BY</label>
              <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
                <option value="Newest">Newest</option>
                <option value="PriceLow">Price: Low to High</option>
                <option value="PriceHigh">Price: High to Low</option>
              </select>
            </div>

            <div className="filter-group">
              <label>PRICE RANGE</label>
              <div className="price-inputs">
                <input type="number" placeholder="Min" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} />
                <span>—</span>
                <input type="number" placeholder="Max" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} />
              </div>
            </div>

            <div className="filter-group toggles-group">
              <label>AVAILABILITY</label>
              <div className="toggle-row">
                <span>IN STOCK ONLY</span>
                <label className="switch">
                  <input type="checkbox" name="inStock" checked={filters.inStock} onChange={handleFilterChange} />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="toggle-row">
                <span>ON SALE</span>
                <label className="switch">
                  <input type="checkbox" name="onSale" checked={filters.onSale} onChange={handleFilterChange} />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="filter-actions">
            <button className="btn-clear" onClick={handleClearAll}>Clear All</button>
            <button className="btn-apply" onClick={handleApplyFilters}>Apply Filters</button>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="collection-toolbar">
        <p>Showing {filteredProducts.length} of {allProducts.length}</p>
        <div className="view-toggles">
          <button className="view-btn active"><LayoutGrid size={18} /></button>
          <button className="view-btn"><List size={18} /></button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#888' }}>No products found matching your filters.</p>
        ) : (
          filteredProducts.map((product) => (
            <div className="collection-card" key={product._id}>
              <div className="card-image">
                {product.isSale && <span className="sale-badge">SALE</span>}
                <img src={product.image} alt={product.name} />
                <button className="wishlist-btn"><Heart size={18} /></button>
                
                {/* Yahan onClick add kiya hai */}
                <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
              <div className="card-info">
                <p className="category">{product.category}</p>
                <h3 className="product-name">{product.name}</h3>
                <div className="rating">
                  {'★'.repeat(5).split('').map((s, i) => <span key={i} style={{color: i < product.rating ? '#f05a28' : '#ddd'}}>{s}</span>)}
                  <span style={{color: '#888', fontSize: '12px', marginLeft: '5px'}}>({product.rating})</span>
                </div>
                <div className="price-row">
                  <span className="price">Rs {product.price}</span>
                  {product.oldPrice && <span className="old-price">Rs {product.oldPrice}</span>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Collection;