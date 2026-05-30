import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import ProductCard from "../../components/ProductCard/ProductCard";
import Filters from "../../components/Filters/Filters";
import styles from "./Home.module.css";
import { useProductFilters } from "../../hooks/useProductFilter";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../hooks/useCart";
import Loader from "../../components/Loader/Loader";

function Home() {
  const {
    products,
    loading,
    addProductToCartState,
    updateProductQuantityState,
  } = useProducts();

  const { handleAddToCart, handleQuantity } = useCart({
    addProductToCartState,
    updateProductQuantityState,
  });

  const {
    selectedCategories,
    setSelectedCategories,
    maxPrice,
    setMaxPrice,
    searchQuery,
    setSearchQuery,
    filteredProducts,
  } = useProductFilters(products);

  if (loading) {
    return <Loader />;
  }

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div className={styles.container}>
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
        <Filters
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
              onIncrease={() =>
                handleQuantity(product.id, "increase", product.quantity)
              }
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
