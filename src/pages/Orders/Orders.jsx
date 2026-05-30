import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import { getOrders } from "../../services/orderService";

import styles from "./Orders.module.css";
import Loader from "../../components/Loader/Loader";

function Orders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders(user.uid);

        setOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (orders.length === 0) {
    return <h1 className={styles.empty}>No orders found</h1>;
  }

  return (
    <div className={styles.container}>
      <h1>Your Orders</h1>

      <div className={styles.orders}>
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <h2>Total: ₹{order.totalPrice}</h2>

              <p>{order.createdAt?.toDate().toLocaleString()}</p>
            </div>

            <div className={styles.items}>
              {order.items.map((item) => (
                <div key={item.productId} className={styles.item}>
                  <img src={item.image} alt={item.title} />

                  <div>
                    <h3>{item.title}</h3>

                    <p>₹{item.price}</p>

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
