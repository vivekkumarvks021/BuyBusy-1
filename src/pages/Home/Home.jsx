import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import ProductCard from "../../components/ProductCard/ProductCard";
import Filters from "../../components/Filters/Filters";
import styles from "./Home.module.css";
import { useProductFilters } from "../../hooks/useProductFilter";

function Home() {
  const [products, setProducts] = useState([]);
  // const [selectedCategories, setSelectedCategories] = useState([]);
  // const [maxPrice, setMaxPrice] = useState(100000);
  const [loading, setLoading] = useState(true);
  const {
    selectedCategories,
    setSelectedCategories,
    maxPrice,
    setMaxPrice,
    searchQuery,
    setSearchQuery,
    filteredProducts,
  } = useProductFilters(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  // const filteredProducts = products.filter((product) => {
  //   const categoryMatch =
  //     selectedCategories.length === 0 ||
  //     selectedCategories.includes(product.category);

  //   const priceMatch = product.price <= maxPrice;

  //   return categoryMatch && priceMatch;
  // });

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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
