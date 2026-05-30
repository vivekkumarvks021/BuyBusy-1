import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import { getProducts } from "../services/productService";

import { getCartItems } from "../services/cartService";

export const useProducts = () => {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // FETCH PRODUCTS + CART
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsData, cartItems] = await Promise.all([
          getProducts(),

          user ? getCartItems(user.uid) : Promise.resolve([]),
        ]);

        // MERGE PRODUCTS + CART
        const mergedProducts = productsData.map((product) => {
          const cartItem = cartItems.find((item) => item.id === product.id);

          return {
            ...product,

            inCart: !!cartItem,

            quantity: cartItem ? cartItem.quantity : 0,
          };
        });

        setProducts(mergedProducts);
      } catch (error) {
        console.log(error);

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  // ADD PRODUCT TO CART STATE
  const addProductToCartState = (productId) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === productId) {
          return {
            ...product,

            inCart: true,

            quantity: 1,
          };
        }

        return product;
      }),
    );
  };

  // UPDATE PRODUCT QUANTITY STATE
  const updateProductQuantityState = (productId, type) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id !== productId) {
          return product;
        }

        const updatedQuantity =
          type === "increase" ? product.quantity + 1 : product.quantity - 1;

        return {
          ...product,

          quantity: updatedQuantity,

          inCart: updatedQuantity > 0,
        };
      }),
    );
  };

  return {
    products,
    loading,
    error,
    addProductToCartState,
    updateProductQuantityState,
  };
};
