import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import styles from "./Navbar.module.css";
import { getCartItems } from "../../services/cartService";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const fetchCartItems = async () => {
    const items = await getCartItems(user.uid);
    setCartItems(items);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logout Successful");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        E-Commerce
      </Link>

      <div className={styles.links}>
        <Link to="/">Home</Link>

        {!user ? (
          <>
            <Link to="/login">Login</Link>

            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/cart">Cart({cartItems?.length})</Link>

            <Link to="/orders">Orders</Link>

            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
