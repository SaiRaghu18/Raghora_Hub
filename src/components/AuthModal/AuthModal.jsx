import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./AuthModal.css";

export default function AuthModal({ isOpen, onClose }) {
  const { signIn } = useAuth();
  const [activeTab, setActiveTab] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (activeTab === "signup" && password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    setIsSubmitting(true);

    // Simulate a brief loading state for realism
    setTimeout(() => {
      signIn(name.trim(), email.trim());
      setIsSubmitting(false);
      resetForm();
      onClose();
    }, 600);
  }

  function resetForm() {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
    setActiveTab("signin");
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="auth-backdrop" onClick={handleClose} />
      <div className="auth-modal">
        {/* Close button */}
        <button className="auth-close-btn" onClick={handleClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Logo */}
        <div className="auth-logo">
          <img
            src="https://media.licdn.com/dms/image/v2/D5622AQE9X1lu0_9B4w/feedshare-shrink_800/feedshare-shrink_800/0/1704915116971?e=2147483647&v=beta&t=nQI7h4Erq3nZlqn7X8lqLCBKaP2_mjFWnw0HIORf9YU"
            alt="Raghora Hub"
            className="auth-logo-img"
          />
          <span className="auth-logo-text">Raghora Hub</span>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === "signin" ? "active" : ""}`}
            onClick={() => { setActiveTab("signin"); setError(""); }}
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => { setActiveTab("signup"); setError(""); }}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="auth-name">Full Name</label>
            <div className="auth-input-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                id="auth-name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="auth-email">Email Address</label>
            <div className="auth-input-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                id="auth-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          {activeTab === "signup" && (
            <div className="auth-field">
              <label htmlFor="auth-password">Password</label>
              <div className="auth-input-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="auth-password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </div>
          )}

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className={`auth-submit-btn ${isSubmitting ? "loading" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="auth-spinner" />
            ) : activeTab === "signin" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="auth-footer-text">
          {activeTab === "signin"
            ? "New to Raghora Hub? "
            : "Already have an account? "}
          <button
            className="auth-switch-btn"
            onClick={() => {
              setActiveTab(activeTab === "signin" ? "signup" : "signin");
              setError("");
            }}
          >
            {activeTab === "signin" ? "Create an account" : "Sign In"}
          </button>
        </p>
      </div>
    </>
  );
}
