// React hooks
import { useEffect, useState } from "react";

// Auth context hook
import { useAuth } from "../../context/AuthContext";

// Order service
import { getOrders } from "../../services/orderService";

// CSS Module
import styles from "./Orders.module.css";

// Loader component
import Loader from "../../components/Loader/Loader";

function Orders() {
  // Get logged-in user data
  const { user } = useAuth();

  // State to store user orders
  const [orders, setOrders] = useState([]);

  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Fetch orders when component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Get orders using user ID
        const data = await getOrders(user.uid);

        // Store fetched orders in state
        setOrders(data);
      } catch (error) {
        // Log error if request fails
        console.log(error);
      } finally {
        // Stop loader after API call completes
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Show loader while fetching orders
  if (loading) {
    return <Loader />;
  }

  // Show message if no orders exist
  if (orders.length === 0) {
    return <h1 className={styles.empty}>No orders found</h1>;
  }

  return (
    <div className={styles.container}>
      {/* Page Heading */}
      <h1>Your Orders</h1>

      <div className={styles.orders}>
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            {/* Order Header */}
            <div className={styles.orderHeader}>
              {/* Total Order Price */}
              <h2>Total: ₹{order.totalPrice}</h2>

              {/* Order Date & Time */}
              <p>{order.createdAt?.toDate().toLocaleString()}</p>
            </div>

            {/* Ordered Items */}
            <div className={styles.items}>
              {order.items.map((item) => (
                <div key={item.productId} className={styles.item}>
                  {/* Product Image */}
                  <img src={item.image} alt={item.title} />

                  <div>
                    {/* Product Title */}
                    <h3>{item.title}</h3>

                    {/* Product Price */}
                    <p>₹{item.price}</p>

                    {/* Product Quantity */}
                    <p>
                      Qty:
                      {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
