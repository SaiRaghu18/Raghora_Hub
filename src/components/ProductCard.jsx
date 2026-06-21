import "./ProductCard.css";

export default function ProductCard({
  id,
  image,
  name,
  price,
  originalPrice,
  discount,
  rating,
  isBestSeller,
  isWishlisted,
  cartQuantity,
  onAddToCart,
  onRemoveFromCart,
  onToggleWishlist
}) {
  return (
    <div className="product-card">
      {/* Discount Badge*/}
      {discount && <span className="discount-badge">{discount}</span>}
      <button
        className={`wishlisted ${isWishlisted?"active":""}`}
        onClick={onToggleWishlist}
        aria-label="Toggle Wishlist"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? "red" : "none"} stroke={isWishlisted ? "red" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.2s ease' }}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
      {/*Product Image*/}
      <div className="image-container">
        <img src={image} alt={name} className="product-image" />
      </div>

      {/*Content*/}
      <div className="card-content">
        <h3 className="product-name">{name}</h3>

        {/*Rating*/}
        <div className="rating">
          <span className="stars">
            {"⭐".repeat(Math.floor(rating))}
            {"☆".repeat(5 - Math.floor(rating))}</span>
          <span className="rating-value">{rating}</span>
          {isBestSeller && <span className="bestseller-tag">Best Seller</span>}
        </div>

        {/*Price*/}
        <div className="price-row">
          <span className="price">💲{price}</span>
          {originalPrice && (
            <span className="original-price">💲{originalPrice}</span>
          )}
        </div>

        {/*Cart Buttons*/}
        {cartQuantity > 0 ? (
          <div className="cart-controls">
            <button className="cart-ctrl-btn minus" onClick={onRemoveFromCart}>−</button>
            <span className="cart-qty">{cartQuantity}</span>
            <button className="cart-ctrl-btn plus" onClick={onAddToCart}>+</button>
          </div>
        ) : (
          <button className="add-btn" onClick={onAddToCart}>Add to Cart</button>
        )}
      </div>
    </div>
  );
}
