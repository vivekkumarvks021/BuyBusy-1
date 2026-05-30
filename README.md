# 🛒 E-Commerce Website

A modern and responsive E-Commerce web application built using React.js, Firebase, and CSS Modules.

---

# 🚀 Features

## 🔐 Authentication

- User Signup
- User Login
- Protected Routes
- AuthGuard functionality
- Firebase Authentication

---

## 🏠 Home Page

- Product listing
- Dynamic product cards
- Search products
- Filter by category
- Filter by price
- Multiple category selection using checkboxes

---

## 🛒 Cart Functionality

- Add to cart
- Increase quantity
- Decrease quantity
- Cart quantity sync on Home Page
- Dynamic cart count in Navbar

---

## 📦 Orders Page

- Place order functionality
- Orders history page

---

## ⚡ Optimizations

- Custom Hooks
- Reusable Components
- CSS Modules
- Clean folder structure
- Memoized cart count using `useMemo`

---

# 🧑‍💻 Tech Stack

## Frontend

- React.js
- React Router DOM
- CSS Modules

## Backend / Database

- Firebase Authentication
- Firebase Firestore

## Utilities

- React Spinners

---

# 📁 Folder Structure

```bash
src
│
├── components
│   ├── Navbar
│   ├── ProductCard
│   ├── Filters
│   └── Loader
│
├── pages
│   ├── Home
│   ├── Cart
│   ├── Login
│   ├── Signup
│   └── Orders
│
├── hooks
│   ├── useProducts
│   ├── useCart
│   └── useProductFilters
│
├── services
│   ├── authService
│   ├── cartService
│   ├── orderService
│   └── productService
│
├── context
│   └── AuthContext
│
├── routes
│   └── AppRoutes
│
└── firebase
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <your-repo-url>
```

---

## Navigate to Project

```bash
cd ecommerce-website
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

---

# 🔥 Firebase Setup

1. Create Firebase Project
2. Enable Authentication
3. Enable Firestore Database
4. Add Firebase Config in:

```bash
src/firebase/firebaseConfig.js
```

Example:

```js
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

---

# 👨‍💻 Author

Vivek Kumar

Senior Frontend Developer
