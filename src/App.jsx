import ProductCard from "./components/ProductCard";
import CartSidebar from "./components/CartSidebar";
import products from "./data";
import "./App.css";
import { useState, useEffect } from "react";
import DeliveryAgent from "./components/DeliveryAgent";


function App() {

  // state
  // Cart array of  products cart
  const [cartItems, setCartItems] = useState([]);
  // wishlist  array of product ids that wishlisted
  const [wishlist, setWishlist] = useState([]);
  // Cart sidebar open/close
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Profile dropdown open/close
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // Dark mode toggle
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("raghu-hub-theme");
    return saved === "dark";
  });

  // Apply dark mode class to body
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("raghu-hub-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Close profile dropdown on clicking outside
  useEffect(() => {
    function handleOutsideClick(event) {
      if (!event.target.closest(".nav-profile-container")) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);


  function addToCart(product) {
    // cart item is exist or not 
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      // Array of objects
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
      );
    }
    else {
      // product not there
      setCartItems([...cartItems, { ...product, quantity: 1 }]);

    }
  }

  function removeFromCart(productId) {
    const existingItem = cartItems.find(item => item.id === productId);
    if (!existingItem) return;
    if (existingItem.quantity === 1) {
      // remove entirely
      setCartItems(cartItems.filter(item => item.id !== productId));
    } else {
      // decrease quantity
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    }
  }


  // calaculate total number of card items 
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // calcualate total price
  const cartTotal = cartItems.reduce((total, item) => total + (item.price) * (item.quantity), 0);

  // wishlist function

  function toggleWishlist(productID) {
    if (wishlist.includes(productID)) {
      // Already existing remove it
      setWishlist(wishlist.filter(id => id !== productID));
    }
    else {
      // not in the wishlist just add it
      setWishlist([...wishlist, productID]);
    }
  }

  const filteredProducts = products;

  return (

    <div className={`app ${darkMode ? "dark-mode" : ""}`}>

      {/* Delivery Agent — plays once on page load */}
      <DeliveryAgent />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        cartTotal={cartTotal}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
      />      {/* Navigation — Simplified Professional Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo */}
          <a href="/" className="logo">
            <img src="https://media.licdn.com/dms/image/v2/D5622AQE9X1lu0_9B4w/feedshare-shrink_800/feedshare-shrink_800/0/1704915116971?e=2147483647&v=beta&t=nQI7h4Erq3nZlqn7X8lqLCBKaP2_mjFWnw0HIORf9YU" alt="Not Found" className="logo-img" />
            <div className="logo-text">
              <span className="logo-name">Raghora Hub</span>
              <span className="logo-tagline">Shop Smarter</span>
            </div>
          </a>

          {/* Action Items */}
          <div className="nav-actions">
            {/* Wishlist */}
            <div className="nav-action-item" title="Wishlist">
              <div className="nav-action-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill={wishlist.length > 0 ? "red" : "none"} stroke={wishlist.length > 0 ? "red" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.2s ease' }}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {wishlist.length > 0 && <span className="action-badge">{wishlist.length}</span>}
              </div>
              <span className="nav-action-label">Wishlist</span>
            </div>

            {/* Mycart */}
            <div
              className="nav-action-item nav-cart"
              onClick={() => setIsCartOpen(true)}
              title={`Cart Total: ₹${cartTotal.toLocaleString()}`}
            >
              <div className="nav-action-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {cartCount > 0 && <span className="action-badge cart-badge">{cartCount}</span>}
              </div>
              <span className="nav-action-label">Mycart</span>
            </div>

            {/* Profile Option */}
            <div className="nav-profile-container">
              <button 
                className="nav-action-item nav-profile-toggle" 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-haspopup="true"
                aria-expanded={isProfileOpen}
              >
                <div className="nav-action-icon-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="nav-action-label">Profile</span>
                <svg className={`chevron-icon ${isProfileOpen ? 'open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px', transition: 'transform 0.2s ease' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {isProfileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-header">
                    <span className="profile-welcome">Welcome to Raghora Hub</span>
                  </div>
                  <ul className="profile-menu-list">
                    <li>
                      <button className="profile-menu-btn" onClick={() => { setIsProfileOpen(false); alert("Sign In clicked"); }}>
                        <span className="menu-icon">🔑</span> Sign In
                      </button>
                    </li>
                    <li>
                      <button className="profile-menu-btn" onClick={() => { setIsProfileOpen(false); alert("Orders clicked"); }}>
                        <span className="menu-icon">📦</span> Orders
                      </button>
                    </li>
                    <li>
                      <button className="profile-menu-btn" onClick={() => { setIsProfileOpen(false); alert("Offers & Deals clicked"); }}>
                        <span className="menu-icon">🏷️</span> Offers & Deals
                      </button>
                    </li>
                    <li>
                      <button className="profile-menu-btn" onClick={() => { setIsProfileOpen(false); alert("Notifications clicked"); }}>
                        <span className="menu-icon">🔔</span> Notifications
                      </button>
                    </li>
                    <li>
                      <button className="profile-menu-btn" onClick={() => { setIsProfileOpen(false); alert("Help clicked"); }}>
                        <span className="menu-icon">❓</span> Help
                      </button>
                    </li>
                    <li>
                      <button className="profile-menu-btn" onClick={() => { setIsProfileOpen(false); alert("Contact Us clicked"); }}>
                        <span className="menu-icon">📞</span> Contact Us
                      </button>
                    </li>
                    <li>
                      <button className="profile-menu-btn" onClick={() => { setIsProfileOpen(false); alert("Settings clicked"); }}>
                        <span className="menu-icon">⚙️</span> Settings
                      </button>
                    </li>
                    <li className="menu-divider"></li>
                    <li>
                      <button className="profile-menu-btn exit-option" onClick={() => { setIsProfileOpen(false); alert("Sign Out clicked"); }}>
                        <span className="menu-icon">🚪</span> Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Theme Toggle (Darkmode/Lightmode) */}
            <button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={darkMode ? "Light Mode" : "Dark Mode"}
            >
              <div className={`theme-toggle-track ${darkMode ? "dark" : ""}`}>
                <div className="theme-toggle-thumb">
                  {darkMode ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <path d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Zm11.394-5.834a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59Zm-1.06 13.668a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18Zm-7.834-6.566a.75.75 0 0 0 0 1.5H6.75a.75.75 0 0 0 0-1.5H4.166Zm13.084 0a.75.75 0 0 0 0 1.5H21a.75.75 0 0 0 0-1.5h-2.25ZM5.106 5.106a.75.75 0 0 0-1.06 1.06l1.59 1.591a.75.75 0 1 0 1.061-1.06L5.106 5.106Zm1.59 13.668a.75.75 0 0 0-1.06-1.06l-1.59 1.59a.75.75 0 1 0 1.06 1.061l1.59-1.59Z" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/*Hero Section*/}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">New Arrivals 2026</p>
          <h1 className="hero-title">
            Discover the Future of Technology — Shop Smarter, Live Better...
          </h1>
          <p className="hero-description">
            Discover the best tech products at unbeatable prices—all in one place.
            From powerful gaming gear to everyday office essentials,
            we bring you a curated collection of high-quality keyboards, mice, and
            accessories designed for performance, comfort, and style..
          </p>
          <br />
          <h2>Upgrade your workspace. Level up your gaming. Shop smarter today</h2>
          <div className="hero-cta">
            <button className="btn-primary">Explore Product</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">50k+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat">
            <span className="stat-number">200k+</span>
            <span className="stat-label">Premium Products</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Customer Support</span>
          </div>
        </div>
      </section>

      {/*Product Section*/}
      <section className="products-section" id="products">
        <div className="section-header">
          <h2 className="section-title">Best Sellers</h2>
          <p className="section-subtitle">
            Our most popular products loved by customers
          </p>
        </div>

        {/* Cart Summary Box */}
        {cartCount > 0 && (
          <div className="cart-summary-box" onClick={() => setIsCartOpen(true)} style={{ cursor: "pointer" }}>
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "4px" }}>
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <strong>{cartCount}</strong> item{cartCount > 1 ? "s" : ""} in cart
            </span>
            <span className="cart-summary-divider">|</span>
            <span>Total: <strong>₹{cartTotal.toLocaleString()}</strong></span>
            <span className="cart-summary-divider">|</span>
            <span style={{ fontSize: "0.85rem" }}>Click to view →</span>
          </div>
        )}

        {/* Product Count */}
        <p className="product-count">
          Showing all {filteredProducts.length} products
        </p>

        <div className="product-grid">
          {filteredProducts.map((data) => (
            <ProductCard
              key={data.id}
              id={data.id}
              image={data.image}
              name={data.name}
              price={data.price}
              originalPrice={data.originalPrice}
              discount={data.discount}
              rating={data.rating}
              isBestSeller={data.isBestSeller}
              isWishlisted={wishlist.includes(data.id)}
              cartQuantity={cartItems.find(item => item.id === data.id)?.quantity || 0}
              onAddToCart={() => addToCart(data)}
              onRemoveFromCart={() => removeFromCart(data.id)}
              onToggleWishlist={() => toggleWishlist(data.id)}
            />
          ))}
        </div>
      </section>

      {/*Footer*/}
      <footer className="footer">
        <p>&copy; 2026 TechStore. All rights reserved.</p>
      </footer>
    </div>
  );
}



export default App