// React hooks
import { useEffect, useState } from "react";

// Services
import { getProducts } from "../../services/productService";

// Components
import ProductCard from "../../components/ProductCard/ProductCard";
import Filters from "../../components/Filters/Filters";
import Loader from "../../components/Loader/Loader";

// CSS Module
import styles from "./Home.module.css";

// Custom Hooks
import { useProductFilters } from "../../hooks/useProductFilter";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../hooks/useCart";

function Home() {
  // Fetch products and manage product state
  const {
    products,
    loading,
    addProductToCartState,
    updateProductQuantityState,
  } = useProducts();

  // Cart related functions
  const { handleAddToCart, handleQuantity } = useCart({
    addProductToCartState,
    updateProductQuantityState,
  });

  // Product filtering and search logic
  const {
    selectedCategories,
    setSelectedCategories,
    maxPrice,
    setMaxPrice,
    searchQuery,
    setSearchQuery,
    filteredProducts,
  } = useProductFilters(products);

  // Show loader while products are loading
  if (loading) {
    return <Loader />;
  }

  // Extract unique categories from products
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div className={styles.container}>
      {/* Search Input */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchBox}
        />
      </div>

      <div>
        {/* Filters Component */}
        <Filters
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        {/* Products Grid */}
        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              // Add product to cart
              onAddToCart={() => handleAddToCart(product)}
              // Increase product quantity
              onIncrease={() =>
                handleQuantity(product.id, "increase", product.quantity)
              }
              // Decrease product quantity
              onDecrease={() =>
                handleQuantity(product.id, "decrease", product.quantity)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
