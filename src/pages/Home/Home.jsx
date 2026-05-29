import { useEffect, useState } from "react";

import { getProducts } from "../../services/productService";

import ProductCard from "../../components/ProductCard/ProductCard";

import styles from "./Home.module.css";

function Home() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

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

  return (
    <div className={styles.container}>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
