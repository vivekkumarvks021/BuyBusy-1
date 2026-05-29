import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />

      <div className={styles.content}>
        <h3>{product.title}</h3>

        <p className={styles.price}>₹ {product.price}</p>

        <button>Add To Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
