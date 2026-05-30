// CSS Module
import styles from "./ProductCard.module.css";

function ProductCard({ product, onAddToCart, onIncrease, onDecrease }) {
  return (
    <div className={styles.card}>
      {/* Product Image */}
      <img src={product.image} alt={product.title} className={styles.image} />

      {/* Product Title */}
      <h3 className={styles.title}>{product.title}</h3>

      {/* Product Price */}
      <p className={styles.price}>₹ {product.price}</p>

      {/* Show Add To Cart button if product is not in cart */}
      {!product.inCart ? (
        <button className={styles.addBtn} onClick={onAddToCart}>
          Add To Cart
        </button>
      ) : (
        // Show quantity controls if product is already in cart
        <div className={styles.quantityContainer}>
          {/* Decrease Quantity Button */}
          <button className={styles.quantityBtn} onClick={onDecrease}>
            -
          </button>

          {/* Product Quantity */}
          <span className={styles.quantity}>{product.quantity}</span>

          {/* Increase Quantity Button */}
          <button className={styles.quantityBtn} onClick={onIncrease}>
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
