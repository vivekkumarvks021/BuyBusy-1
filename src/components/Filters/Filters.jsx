// CSS Module
import styles from "./Filters.module.css";

function Filters({
  categories,
  selectedCategories,
  setSelectedCategories,
  maxPrice,
  setMaxPrice,
}) {
  // Handle category checkbox selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      // Remove category if already selected
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      }

      // Add category if not selected
      return [...prev, category];
    });
  };

  return (
    <div className={styles.filters}>
      {/* Filters Heading */}
      <h2 className={styles.heading}>Filters</h2>

      {/* Category Filter Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Category</h3>

        <div className={styles.categories}>
          {categories.map((category) => (
            <label key={category} className={styles.categoryItem}>
              {/* Category Checkbox */}
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />

              {/* Category Name */}
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Price</h3>

        {/* Display selected max price */}
        <p className={styles.priceValue}>Up to ₹{maxPrice}</p>

        {/* Price Range Slider */}
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
