import styles from "./ProductCard.module.css";

function ProductCard({ product, onAddToCart, onIncrease, onDecrease }) {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />

      <h3 className={styles.title}>{product.title}</h3>

      <p className={styles.price}>₹ {product.price}</p>

      {!product.inCart ? (
        <button className={styles.addBtn} onClick={onAddToCart}>
          Add To Cart
        </button>
      ) : (
        <div className={styles.quantityContainer}>
          <button className={styles.quantityBtn} onClick={onDecrease}>
            -
          </button>

          <span className={styles.quantity}>{product.quantity}</span>

          <button className={styles.quantityBtn} onClick={onIncrease}>
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
