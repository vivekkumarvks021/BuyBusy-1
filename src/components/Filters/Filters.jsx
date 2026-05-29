import styles from "./Filters.module.css";

function Filters({
  categories,
  selectedCategories,
  setSelectedCategories,
  maxPrice,
  setMaxPrice,
}) {
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      }

      return [...prev, category];
    });
  };

  return (
    <div className={styles.filters}>
      <h2 className={styles.heading}>Filters</h2>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Category</h3>

        <div className={styles.categories}>
          {categories.map((category) => (
            <label key={category} className={styles.categoryItem}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />

              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Price</h3>

        <p className={styles.priceValue}>Up to ₹{maxPrice}</p>

        <input
          type="range"
          min="0"
          max="100000"
          value={maxPrice}
          className={styles.rangeInput}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export default Filters;
