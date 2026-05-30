import { useMemo, useState } from "react";

export const useProductFilters = (products) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. CATEGORY FILTER
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      // 2. PRICE FILTER
      const priceMatch = product.price <= maxPrice;

      // 3. SEARCH FILTER
      const searchMatch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return categoryMatch && priceMatch && searchMatch;
    });
  }, [products, selectedCategories, maxPrice, searchQuery]);

  return {
    selectedCategories,
    setSelectedCategories,
    maxPrice,
    setMaxPrice,
    searchQuery,
    setSearchQuery,
    filteredProducts,
  };
};
