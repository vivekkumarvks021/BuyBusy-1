// React Router hooks and components
import { Link, useNavigate } from "react-router-dom";

// React Toastify for notifications
import { toast } from "react-toastify";

// Authentication service
import { logout } from "../../services/authService";

// Auth context hook
import { useAuth } from "../../context/AuthContext";

// CSS Module
import styles from "./Navbar.module.css";

// React hooks
import { useEffect, useState } from "react";

// Cart service and hooks
import { getCartItems } from "../../services/cartService";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";

function Navbar() {
  // Navigation hook
  const navigate = useNavigate();

  // Get logged-in user data
  const { user } = useAuth();

  // Handle user logout
  const handleLogout = async () => {
    try {
      // Logout user from authentication service
      await logout();

      // Show success message
      toast.success("Logout Successful");

      // Redirect user to home page
      navigate("/");
    } catch (error) {
      // Show error message if logout fails
      toast.error(error.message);
    }
  };

  return (
    <nav className={styles.navbar}>
      {/* Website Logo */}
      <Link to="/" className={styles.logo}>
        E-Commerce
      </Link>

      {/* Navigation Links */}
      <div className={styles.links}>
        {/* Home Link */}
        <Link to="/">Home</Link>

        {/* Show Login & Signup if user is not logged in */}
        {!user ? (
          <>
            <Link to="/login">Login</Link>

            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            {/* Show Cart, Orders & Logout if user is logged in */}
            <Link to="/cart">Cart</Link>

            <Link to="/orders">Orders</Link>

            {/* Logout Button */}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
