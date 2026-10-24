import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Tag, RefreshCcw, Check, X, Star, Search } from 'lucide-react';
import API from '../services/api';
import FAQSection from '../components/FAQSection'; 
import { useCart } from '../context/CartContext'; 
import './Home.css';

const Home = () => {
  const { addToCart } = useCart(); 

  const [products, setProducts] = useState([
    {
      _id: '1',
      name: "Premium Brown Peshawari Chappal with Durable Rubber Sole",
      category: "FOOT WEAR",
      price: "4,500",
      images: ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=600&auto=format&fit=crop"]
    },
    {
      _id: '2',
      name: "gf",
      category: "FOOT WEAR",
      price: "500",
      oldPrice: "600",
      images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop"],
      isSale: true
    }
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        if (data && data.length > 0) {
          const updatedProducts = data.slice(0, 4).map(product => {
            let imageUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop"; 
            
            if (product.category === 'Laptop' || product.name.toLowerCase().includes('dell') || product.name.toLowerCase().includes('macbook')) {
              imageUrl = "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop"; 
            } else if (product.category === 'Watches' || product.name.toLowerCase().includes('watch')) {
              imageUrl = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop"; 
            } else if (product.category === 'Books' || product.name.toLowerCase().includes('psychology')) {
              imageUrl = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop"; 
            } else if (product.category === 'FOOT WEAR' || product.name.toLowerCase().includes('chappal')) {
              imageUrl = "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=600&auto=format&fit=crop"; 
            }

            return { ...product, images: [imageUrl] };
          });
          setProducts(updatedProducts);
        }
      } catch (error) {
        console.log("Backend se products nahi mile, sample products show ho rahe hain.");
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-left">
          <p className="hero-tag">✦ SERVING TOBA TEK SINGH SINCE 2018</p>
          <h1>Undergarments.<br/><span>Peshawari Chappals.</span><br/>Delivered Fast.</h1>
          <p className="hero-desc">Toba Tek Singh's trusted online store for premium undergarments, handmade Peshawari chappals (Kheri & Kaptaan), footwear, and fabrics. Order from your phone — cash on delivery — same-day delivery in Toba Tek Singh city.</p>
          
          <div className="hero-btns">
            <Link to="/collection" className="btn-orange">Shop Now →</Link>
            <Link to="/browse-category" className="btn-outline"><Search size={18} /> Browse by Category</Link>
          </div>

          <div className="hero-badges">
            <span><Truck size={18} /> Same-Day Delivery in Toba Tek Singh</span>
            <span><Star size={18} color="#f05a28" fill="#f05a28" /> 4.8 · 6,000+ Orders</span>
          </div>
        </div>
        <div className="hero-right">
          <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop" alt="Shoe" />
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="stats-bar">
        <div className="stat-item"><h3>8K+</h3><p>ITEMS IN STOCK</p></div>
        <div className="stat-item"><h3>6K+</h3><p>ORDERS DELIVERED</p></div>
        <div className="stat-item"><h3>4.8★</h3><p>CUSTOMER RATING</p></div>
        <div className="stat-item"><h3>7-Day</h3><p>EASY EXCHANGE</p></div>
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section className="category-section">
        <p className="sub-heading">✦ SHOP BY CATEGORY</p>
        <h2>What are you looking for today?</h2>
        <p className="desc">From everyday essentials to traditional footwear — everything verified for quality, delivered to your door.</p>
        
        <div className="category-grid">
          <div className="category-card">
            <div className="cat-icon">👕</div>
            <h3>Undergarments</h3>
            <p>Vests, briefs, boxers, camisoles</p>
            {/* Yahan link change kiya gaya hai */}
            <Link to="/browse-category" className="browse-link">Browse →</Link>
          </div>
          <div className="category-card">
            <div className="cat-icon">👞</div>
            <h3>Peshawari Chappals</h3>
            <p>Handmade leather, Kaptaan, Kheri style</p>
            {/* Yahan link change kiya gaya hai */}
            <Link to="/browse-category" className="browse-link">Browse →</Link>
          </div>
          <div className="category-card">
            <div className="cat-icon">👟</div>
            <h3>Footwear</h3>
            <p>Shoes, sandals, khussa, joggers</p>
            {/* Yahan link change kiya gaya hai */}
            <Link to="/browse-category" className="browse-link">Browse →</Link>
          </div>
          <div className="category-card">
            <div className="cat-icon">🧵</div>
            <h3>Fabrics & Suits</h3>
            <p>Unstitched, lawn, cotton, khaddar</p>
            {/* Yahan link change kiya gaya hai */}
            <Link to="/browse-category" className="browse-link">Browse →</Link>
          </div>
        </div>
      </section>

      {/* 4. TOP PICKS THIS WEEK */}
      <section className="top-picks-section">
        <div className="section-header-row">
          <h2>Top Picks This Week</h2>
          <Link to="/collection" className="view-all">View all →</Link>
        </div>
        <div className="products-grid">
          {products.length === 0 ? (
            <p>No products yet. New stock arrives soon.</p>
          ) : (
            products.map((product) => (
              <div className="product-card" key={product._id}>
                <div className="card-image">
                  {product.isSale && <span className="sale-badge">SALE</span>}
                  <img src={product.images?.[0]} alt={product.name} />
                  
                  <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
                <div className="card-info">
                  <p className="category">{product.category}</p>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="price-row">
                    <span className="price">${product.price}.00</span>
                    {product.oldPrice && <span className="old-price">${product.oldPrice}.00</span>}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="why-choose-us">
        <p className="sub-heading">✦ WHY CHOOSE US</p>
        <h2>Real quality. Real fast. Real simple.</h2>
        <p className="desc">We're not a random online seller. We stock what we sell, and we stand behind every item that ships — right here in Toba Tek Singh.</p>
        
        <div className="features-grid">
          <div className="feature-card">
            <Truck className="icon" color="#f05a28" size={32} />
            <h4>Same-Day Delivery</h4>
            <p>Order before 2 PM and get it the same day in Toba Tek Singh city. Next-day in Gojra, Kamalia, and Pir Mahal.</p>
          </div>
          <div className="feature-card">
            <ShieldCheck className="icon" color="#f05a28" size={32} />
            <h4>Genuine or Refunded</h4>
            <p>Every item is quality-checked before dispatch. Fake or damaged product? Full refund, no questions asked.</p>
          </div>
          <div className="feature-card">
            <Tag className="icon" color="#f05a28" size={32} />
            <h4>Honest Pricing</h4>
            <p>Fixed online prices with no haggling. Wholesale rates available for shops and resellers across the district.</p>
          </div>
          <div className="feature-card">
            <RefreshCcw className="icon" color="#f05a28" size={32} />
            <h4>7-Day Exchange</h4>
            <p>Size doesn't fit? We'll pick it up and send the right size. No restocking fees, no arguments.</p>
          </div>
        </div>
      </section>

      {/* 6. HONEST DIFFERENCE */}
      <section className="honest-difference">
        <p className="sub-heading">✦ THE HONEST DIFFERENCE</p>
        <h2>Buying from us vs. going to the bazaar</h2>
        <p className="desc">We're not saying the local bazaar is bad. Just that we're faster, more convenient, and more accountable.</p>
        
        <div className="comparison-box">
          <div className="local-bazaar">
            <h3>THE LOCAL BAZAAR</h3>
            <p className="comp-title">What you're used to</p>
            <ul>
              <li><X size={18} color="#dc2626"/> Walk from shop to shop — maybe they have your size, maybe not</li>
              <li><X size={18} color="#dc2626"/> Negotiate price every single time</li>
              <li><X size={18} color="#dc2626"/> Fake or low-quality items sold as "original"</li>
              <li><X size={18} color="#dc2626"/> No bill, no exchange, no returns</li>
            </ul>
          </div>
          <div className="our-store">
            <h3>WITH OUR STORE</h3>
            <p className="comp-title">The modern way</p>
            <ul>
              <li><Check size={18} color="white"/> Live stock shown — order from your phone in 60 seconds</li>
              <li><Check size={18} color="white"/> Fixed online prices — no haggling, no surprises</li>
              <li><Check size={18} color="white"/> 100% quality-checked — genuine leather, soft fabrics</li>
              <li><Check size={18} color="white"/> Digital receipt + 7-day exchange + warranty</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      <section className="reviews-section">
        <p className="sub-heading">✦ CUSTOMER REVIEWS</p>
        <h2>What customers in Toba Tek Singh say</h2>
        <p className="desc">6,000+ orders delivered across Toba Tek Singh district — here's what a few customers think.</p>
        
        <div className="reviews-grid">
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p>"Ordered 3 Peshawari chappals for my brothers from Toba Tek Singh. Original leather, perfect stitching, delivered to my door in 2 days. Better than going to the bazaar."</p>
            <div className="user-info">
              <div className="avatar">AK</div>
              <div><h5>Ahmed Khan</h5><span>Toba Tek Singh</span></div>
            </div>
          </div>
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p>"We run a small garments shop in Gojra and order undergarments in bulk from here. Quality is consistent, prices are fair, and returns for size issues are painless."</p>
            <div className="user-info">
              <div className="avatar">SR</div>
              <div><h5>Sana Rehman</h5><span>Shop Owner, Gojra</span></div>
            </div>
          </div>
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p>"Bought cotton vests and boxers for my father. Soft fabric, no shrinkage after wash, and cash on delivery was smooth. Will order again."</p>
            <div className="user-info">
              <div className="avatar">MN</div>
              <div><h5>Muhammad Nawaz</h5><span>Toba Tek Singh</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <FAQSection />

      {/* 9. CTA BANNER */}
      <section className="cta-banner">
        <h2>Ready to shop <span>smart?</span></h2>
        <p>Quality undergarments, handmade Peshawari chappals (Kheri & Kaptaan), and more — delivered same-day in Toba Tek Singh. Join 6,000+ happy customers who stopped wasting time at the bazaar.</p>
        <div className="hero-btns" style={{ justifyContent: 'center' }}>
            <Link to="/collection" className="btn-orange">Shop Now →</Link>
            
            <a 
              href="https://wa.me/923001234567?text=Hi,%20I%20am%20interested%20in%20wholesale%20pricing" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-outline"
              style={{ textDecoration: 'none' }}
            >
              Become a Wholesale Buyer
            </a>
        </div>
      </section>
      
    </div>
  );
};

export default Home;