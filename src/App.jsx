import { useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import ProductSection from "./components/ProductSection/ProductSection";
import CartSidebar from "./components/CartSidebar/CartSidebar";
import DeliveryAgent from "./components/DeliveryAgent/DeliveryAgent";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import products from "./data";
import "./App.css";

function AppContent() {
  // ===== State (using reusable localStorage hook) =====
  const [cartItems, setCartItems] = useLocalStorage("raghu-hub-cart", []);
  const [wishlist, setWishlist] = useLocalStorage("raghu-hub-wishlist", []);
  const [darkMode, setDarkMode] = useLocalStorage("raghu-hub-theme", false);
  const [isCartOpen, setIsCartOpen] = useLocalStorage("raghu-hub-cart-open", false);

  // Apply dark mode class to body
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // ===== Cart Handlers =====
  function addToCart(product) {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  function removeFromCart(productId) {
    const existingItem = cartItems.find((item) => item.id === productId);
    if (!existingItem) return;
    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== productId));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  }

  // ===== Wishlist Handler =====
  function toggleWishlist(productID) {
    if (wishlist.includes(productID)) {
      setWishlist(wishlist.filter((id) => id !== productID));
    } else {
      setWishlist([...wishlist, productID]);
    }
  }

  // ===== Computed Values =====
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
      />

      {/* Navigation */}
      <Navbar
        wishlistCount={wishlist.length}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onCartOpen={() => setIsCartOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Product Section */}
      <ProductSection
        products={products}
        cartItems={cartItems}
        cartCount={cartCount}
        cartTotal={cartTotal}
        wishlist={wishlist}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        onToggleWishlist={toggleWishlist}
        onCartOpen={() => setIsCartOpen(true)}
      />

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;