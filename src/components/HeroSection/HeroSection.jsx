import "./HeroSection.css";

export default function HeroSection() {
  return (
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
          <button className="btn-primary" onClick={() => {
            document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
          }}>Explore Product</button>
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
  );
}
