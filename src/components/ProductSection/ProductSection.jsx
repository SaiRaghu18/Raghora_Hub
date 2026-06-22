import ProductCard from "../ProductCard/ProductCard";
import "./ProductSection.css";

export default function ProductSection({
  products,
  cartItems,
  cartCount,
  cartTotal,
  wishlist,
  onAddToCart,
  onRemoveFromCart,
  onToggleWishlist,
  onCartOpen,
}) {
  return (
    <section className="products-section" id="products">
      <div className="section-header">
        <h2 className="section-title">Best Sellers</h2>
        <p className="section-subtitle">
          Our most popular products loved by customers
        </p>
      </div>

      {/* Cart Summary Box */}
      {cartCount > 0 && (
        <div className="cart-summary-box" onClick={onCartOpen} style={{ cursor: "pointer" }}>
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
        Showing all {products.length} products
      </p>

      <div className="product-grid">
        {products.map((data) => (
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
            onAddToCart={() => onAddToCart(data)}
            onRemoveFromCart={() => onRemoveFromCart(data.id)}
            onToggleWishlist={() => onToggleWishlist(data.id)}
          />
        ))}
      </div>
    </section>
  );
}
