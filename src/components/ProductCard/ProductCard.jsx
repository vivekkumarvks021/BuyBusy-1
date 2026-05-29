import styles from "./ProductCard.module.css";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { addToCart } from "../../services/cartService";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      await addToCart(user.uid, product);

      toast.success("Product added to cart");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />

      <div className={styles.content}>
        <h3>{product.title}</h3>

        <p className={styles.price}>₹ {product.price}</p>

        <button onClick={handleAddToCart}>Add To Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
