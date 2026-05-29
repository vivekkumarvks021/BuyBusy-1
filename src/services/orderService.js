import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

import { clearCart } from "./cartService";

export const placeOrder = async (userId, cartItems, totalPrice) => {
  const ordersRef = collection(db, "orders", userId, "items");

  await addDoc(ordersRef, {
    items: cartItems,

    totalPrice,

    createdAt: serverTimestamp(),
  });

  await clearCart(userId);
};
