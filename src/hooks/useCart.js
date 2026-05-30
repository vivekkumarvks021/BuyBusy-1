import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";

import { addToCart, updateCartItemQuantity } from "../services/cartService";

export const useCart = ({
  addProductToCartState,
  updateProductQuantityState,
}) => {
  const { user } = useAuth();

  // ADD TO CART
  const handleAddToCart = async (product) => {
    try {
      await addToCart(user.uid, product);

      addProductToCartState(product.id);
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE QUANTITY
  const handleQuantity = async (productId, type, quantity) => {
    try {
      const updatedQuantity = type === "increase" ? quantity + 1 : quantity - 1;

      await updateCartItemQuantity(user.uid, productId, updatedQuantity);

      updateProductQuantityState(productId, type);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleAddToCart, handleQuantity };
};
