import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
  getCartItems,
  updateCartItemQuantity,
} from "../../services/cartService";

import { placeOrder } from "../../services/orderService";

import styles from "./Cart.module.css";
import Loader from "../../components/Loader/Loader";

function Cart() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems(user.uid);

        setCartItems(items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantity = async (productId, newQuantity) => {
    try {
      await updateCartItemQuantity(user.uid, productId, newQuantity);

      setCartItems((prevItems) =>
        prevItems
          .map((item) => {
            if (item.id === productId) {
              return {
                ...item,

                quantity: newQuantity,
              };
            }

            return item;
          })
          .filter((item) => item.quantity > 0),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      setOrderLoading(true);
      await placeOrder(user.uid, cartItems, totalPrice);

      setCartItems([]);

      toast.success("Order placed successfully");

      navigate("/orders");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setOrderLoading(false);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (loading) {
    return <Loader />;
  }

  if (cartItems.length === 0) {
    return <h1 className={styles.empty}>Your cart is empty</h1>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.card}>
            <img src={item.image} alt={item.title} className={styles.image} />

            <div className={styles.content}>
              <h2>{item.title}</h2>

              <p>₹ {item.price}</p>

              <div className={styles.quantity}>
                <button
                  className={styles.quantityButton}
                  onClick={() => handleQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>

                <span className={styles.quantityValue}>{item.quantity}</span>

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

      <div className={styles.summary}>
        <h2>Cart Summary</h2>

        <h3>Total: ₹ {totalPrice}</h3>

        <button onClick={handlePlaceOrder} disabled={orderLoading}>
          {orderLoading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}

export default Cart;
