import React, { useState, useMemo } from 'react';
import { ShoppingBag, Star, Zap, Shield, Truck, Search, Heart, Trash2, Plus, Minus } from 'lucide-react';
import './App.css';

const PRODUCTS = [
  { id: 1, name: "Pro Sound M1", price: 349, cat: "Audio", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600", rating: 4.9 },
  { id: 2, name: "Nova Smartwatch", price: 199, cat: "Wearables", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600", rating: 4.8 },
  { id: 3, name: "Echo Speaker", price: 89, cat: "Home", img: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=600", rating: 4.5 },
  { id: 4, name: "Vanguard Pack", price: 125, cat: "Lifestyle", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600", rating: 4.7 },
  { id: 5, name: "Zen Lens Pro", price: 540, cat: "Photography", img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600", rating: 5.0 },
  { id: 6, name: "Apex Gaming Mouse", price: 75, cat: "Gaming", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600", rating: 4.6 },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("All");

  const filteredProducts = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const addToCart = (p) => setCart([...cart, p]);
  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index));

  return (
    <div className="shop-wrapper">
      {/* --- PREMIUM NAVBAR --- */}
      <nav className="glass-nav">
        <div className="nav-content">
          <div className="logo-group">
            <div className="logo-icon"><Zap fill="currentColor" /></div>
            <span className="logo-text">VELOCITY</span>
          </div>
          
          <div className="nav-search">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search premium gear..." />
          </div>

          <div className="nav-actions">
            <div className="cart-trigger">
              <ShoppingBag size={24} />
              {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
              <div className="cart-dropdown">
                <h4>Your Cart ({cart.length})</h4>
                {cart.map((item, i) => (
                  <div key={i} className="cart-item">
                    <span>{item.name}</span>
                    <b>${item.price}</b>
                    <Trash2 size={14} onClick={() => removeFromCart(i)} className="delete-btn" />
                  </div>
                ))}
                <div className="cart-footer">
                  <span>Total: ${cartTotal}</span>
                  <button className="checkout-btn">Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-info">
          <span className="badge">New Season 2026</span>
          <h1>Future of <br /><span className="text-gradient">Digital Shopping.</span></h1>
          <p>Experience the next generation of e-commerce with our ultra-fast delivery and premium curated collections.</p>
          <div className="hero-buttons">
            <button className="btn-primary">Explore Now</button>
            <button className="btn-secondary">Watch Video</button>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="main-container">
        <div className="filter-bar">
          {["All", "Audio", "Wearables", "Photography", "Gaming"].map(cat => (
            <button 
              key={cat} 
              className={filter === cat ? "active" : ""} 
              onClick={() => setFilter(cat)}
            >{cat}</button>
          ))}
        </div>

        <section className="product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="img-container">
                <img src={product.img} alt={product.name} />
                <button className="wishlist-btn"><Heart size={18} /></button>
                <div className="rating-tag"><Star size={12} fill="gold" /> {product.rating}</div>
              </div>
              <div className="product-info">
                <span className="p-category">{product.cat}</span>
                <h3>{product.name}</h3>
                <div className="p-footer">
                  <span className="p-price">${product.price}</span>
                  <button className="add-btn" onClick={() => addToCart(product)}>
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* --- FEATURES --- */}
        <section className="features-grid">
          <div className="f-item"><Truck /> <h4>Free Shipping</h4><p>On orders over $150</p></div>
          <div className="f-item"><Shield /> <h4>Secure Pay</h4><p>100% encryption</p></div>
          <div className="f-item"><Zap /> <h4>Fast Support</h4><p>24/7 Assistance</p></div>
        </section>
      </main>
    </div>
  );
}