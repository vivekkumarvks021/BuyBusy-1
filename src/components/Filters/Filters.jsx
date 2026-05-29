import styles from "./Filters.module.css";

function Filters({
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
}) {
  return (
    <div className={styles.filters}>
      <h2>Filters</h2>

      <div className={styles.filterGroup}>
        <label>Category</label>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="groceries">Groceries</option>
          <option value="beauty">Beauty</option>
          <option value="furniture">Furniture</option>
          <option value="fragrances">Fragrances</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Max Price: ₹{maxPrice}</label>

        <input
          type="range"
          min="0"
          max="100000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Filters;
