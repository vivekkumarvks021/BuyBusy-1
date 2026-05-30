// React hooks
import { useEffect, useState } from "react";

// React Toastify for notifications
import { toast } from "react-toastify";

// React Router hook
import { useNavigate } from "react-router-dom";

// Auth context hook
import { useAuth } from "../../context/AuthContext";

// Cart services
import {
  getCartItems,
  updateCartItemQuantity,
} from "../../services/cartService";

// Order service
import { placeOrder } from "../../services/orderService";

// CSS Module
import styles from "./Cart.module.css";

// Loader component
import Loader from "../../components/Loader/Loader";

function Cart() {
  // Get logged-in user data
  const { user } = useAuth();

  // Navigation hook
  const navigate = useNavigate();

  // State to store cart items
  const [cartItems, setCartItems] = useState([]);

  // State for cart loading
  const [loading, setLoading] = useState(true);

  // State for order placement loading
  const [orderLoading, setOrderLoading] = useState(false);

  // Fetch cart items when component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Get cart items using user ID
        const items = await getCartItems(user.uid);

        // Store items in state
        setCartItems(items);
      } catch (error) {
        // Log error if API call fails
        console.log(error);
      } finally {
        // Stop loader after fetching data
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Handle product quantity update
  const handleQuantity = async (productId, newQuantity) => {
    try {
      // Update quantity in database
      await updateCartItemQuantity(user.uid, productId, newQuantity);

      // Update quantity in local state
      setCartItems((prevItems) =>
        prevItems
          .map((item) => {
            // Update matching product quantity
            if (item.id === productId) {
              return {
                ...item,
                quantity: newQuantity,
              };
            }

            return item;
          })

          // Remove product if quantity becomes 0
          .filter((item) => item.quantity > 0),
      );
    } catch (error) {
      // Log error if update fails
      console.log(error);
    }
  };

  // Handle order placement
  const handlePlaceOrder = async () => {
    try {
      // Start loading state
      setOrderLoading(true);

      // Place order
      await placeOrder(user.uid, cartItems, totalPrice);

      // Clear cart after successful order
      setCartItems([]);

      // Show success message
      toast.success("Order placed successfully");

      // Redirect to orders page
      navigate("/orders");
    } catch (error) {
      // Show error message
      toast.error(error.message);
    } finally {
      // Stop loading state
      setOrderLoading(false);
    }
  };

  // Calculate total cart price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Show loader while cart data is loading
  if (loading) {
    return <Loader />;
  }

  // Show message if cart is empty
  if (cartItems.length === 0) {
    return <h1 className={styles.empty}>Your cart is empty</h1>;
  }

  return (
    <div className={styles.container}>
      {/* Cart Items Section */}
      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.card}>
            {/* Product Image */}
            <img src={item.image} alt={item.title} className={styles.image} />

            <div className={styles.content}>
              {/* Product Title */}
              <h2>{item.title}</h2>

              {/* Product Price */}
              <p>₹ {item.price}</p>

              {/* Quantity Controls */}
              <div className={styles.quantity}>
                {/* Decrease Quantity Button */}
                <button
                  className={styles.quantityButton}
                  onClick={() => handleQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>

                {/* Current Quantity */}
                <span className={styles.quantityValue}>{item.quantity}</span>

                {/* Increase Quantity Button */}
                <button
                  className={styles.quantityButton}
                  onClick={() => handleQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary Section */}
      <div className={styles.summary}>
        <h2>Cart Summary</h2>

        {/* Total Price */}
        <h3>Total: ₹ {totalPrice}</h3>

        {/* Place Order Button */}
        <button onClick={handlePlaceOrder} disabled={orderLoading}>
          {orderLoading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}

export default Cart;
