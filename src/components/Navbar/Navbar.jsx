import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import AuthModal from "../AuthModal/AuthModal";
import "./Navbar.css";

export default function Navbar({
  wishlistCount,
  cartCount,
  cartTotal,
  onCartOpen,
  darkMode,
  onToggleDarkMode,
}) {
  const { user, isLoggedIn, signOut } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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

  function handleSignInClick() {
    setIsProfileOpen(false);
    setIsAuthModalOpen(true);
  }

  function handleSignOutClick() {
    setIsProfileOpen(false);
    signOut();
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo */}
          <a href="/" className="logo">
            <img
              src="https://media.licdn.com/dms/image/v2/D5622AQE9X1lu0_9B4w/feedshare-shrink_800/feedshare-shrink_800/0/1704915116971?e=2147483647&v=beta&t=nQI7h4Erq3nZlqn7X8lqLCBKaP2_mjFWnw0HIORf9YU"
              alt="Raghora Hub"
              className="logo-img"
            />
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
                <svg width="22" height="22" viewBox="0 0 24 24" fill={wishlistCount > 0 ? "red" : "none"} stroke={wishlistCount > 0 ? "red" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.2s ease' }}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
              </div>
              <span className="nav-action-label">Wishlist</span>
            </div>

            {/* Mycart */}
            <div
              className="nav-action-item nav-cart"
              onClick={onCartOpen}
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
                  {isLoggedIn ? (
                    <div className="nav-user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                </div>
                <span className="nav-action-label">
                  {isLoggedIn ? `Hello, ${user.name.split(" ")[0]}` : "Profile"}
                </span>
                <svg className={`chevron-icon ${isProfileOpen ? 'open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px', transition: 'transform 0.2s ease' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {isProfileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-header">
                    <span className="profile-welcome">
                      {isLoggedIn ? `Welcome, ${user.name}!` : "Welcome to Raghora Hub"}
                    </span>
                    {isLoggedIn && (
                      <span className="profile-email">{user.email}</span>
                    )}
                  </div>
                  <ul className="profile-menu-list">
                    {!isLoggedIn ? (
                      <li>
                        <button className="profile-menu-btn signin-btn" onClick={handleSignInClick}>
                          <span className="menu-icon">🔑</span> Sign In
                        </button>
                      </li>
                    ) : (
                      <li>
                        <button className="profile-menu-btn" onClick={() => setIsProfileOpen(false)}>
                          <span className="menu-icon">👤</span> My Account
                        </button>
                      </li>
                    )}
                    <li>
                      <button className="profile-menu-btn" onClick={() => setIsProfileOpen(false)}>
                        <span className="menu-icon">📦</span> Orders
                      </button>
                    </li>
                    <li>
                      <button className="profile-menu-btn" onClick={() => setIsProfileOpen(false)}>
                        <span className="menu-icon">🏷️</span> Offers & Deals
                      </button>
                    </li>
                    <li>
                      <button className="profile-menu-btn" onClick={() => setIsProfileOpen(false)}>
                        <span className="menu-icon">🔔</span> Notifications
                      </button>
                    </li>
                    <li>
                      <button className="profile-menu-btn" onClick={() => setIsProfileOpen(false)}>
                        <span className="menu-icon">❓</span> Help
                      </button>
                    </li>
                    <li>
                      <button className="profile-menu-btn" onClick={() => setIsProfileOpen(false)}>
                        <span className="menu-icon">📞</span> Contact Us
                      </button>
                    </li>
                    <li>
                      <button className="profile-menu-btn" onClick={() => setIsProfileOpen(false)}>
                        <span className="menu-icon">⚙️</span> Settings
                      </button>
                    </li>
                    {isLoggedIn && (
                      <>
                        <li className="menu-divider"></li>
                        <li>
                          <button className="profile-menu-btn exit-option" onClick={handleSignOutClick}>
                            <span className="menu-icon">🚪</span> Sign Out
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle darkMode={darkMode} onToggle={onToggleDarkMode} />
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
