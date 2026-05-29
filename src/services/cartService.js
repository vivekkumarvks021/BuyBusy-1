import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

export const addToCart = async (userId, product) => {
  const cartRef = doc(db, "cart", userId, "items", product.id);

  const cartSnapshot = await getDoc(cartRef);

  if (cartSnapshot.exists()) {
    const currentQuantity = cartSnapshot.data().quantity;

    await updateDoc(cartRef, {
      quantity: currentQuantity + 1,
    });
  } else {
    await setDoc(cartRef, {
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }
};

export const getCartItems = async (userId) => {
  const itemsRef = collection(db, "cart", userId, "items");
  const querySnapshot = await getDocs(itemsRef);
  const cartItems = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return cartItems;
};

export const updateCartItemQuantity = async (userId, productId, quantity) => {
  const cartRef = doc(db, "cart", userId, "items", productId);

  if (quantity <= 0) {
    await deleteDoc(cartRef);

    return;
  }

  await updateDoc(cartRef, {
    quantity,
  });
};

export const clearCart = async (userId) => {
  const itemsRef = collection(db, "cart", userId, "items");

  const querySnapshot = await getDocs(itemsRef);

  const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));

  await Promise.all(deletePromises);
};
