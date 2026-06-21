import "./CartSidebar.css";

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  cartTotal,
  onAddToCart,
  onRemoveFromCart,
}) {
  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`sidebar-backdrop ${isOpen ? "visible" : ""}`}
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <aside className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="sidebar-header">
          <h3 className="sidebar-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Your Cart
          </h3>
          <button className="sidebar-close" onClick={onClose} aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="sidebar-items">
          {cartItems.length === 0 ? (
            <div className="sidebar-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <p>Your cart is empty</p>
              <span>Add some products to get started!</span>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="sidebar-item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="sidebar-item-img"
                />
                <div className="sidebar-item-info">
                  <p className="sidebar-item-name">{item.name}</p>
                  <p className="sidebar-item-price">₹{item.price.toLocaleString()}</p>
                  <div className="sidebar-item-controls">
                    <button
                      className="sidebar-qty-btn"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      −
                    </button>
                    <span className="sidebar-qty">{item.quantity}</span>
                    <button
                      className="sidebar-qty-btn"
                      onClick={() => onAddToCart(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="sidebar-item-subtotal">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer with total */}
        {cartItems.length > 0 && (
          <div className="sidebar-footer">
            <div className="sidebar-total">
              <span>Total</span>
              <span className="sidebar-total-amount">₹{cartTotal.toLocaleString()}</span>
            </div>
            <button className="sidebar-checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </aside>
    </>
  );
}
