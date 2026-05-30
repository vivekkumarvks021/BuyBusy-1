// React Router components
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Cart from "../pages/Cart/Cart";
import Orders from "../pages/Orders/Orders";

// Route protection components
import AuthGuard from "../components/AuthGuard/AuthGuard";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Home Page Route */}
      <Route path="/" element={<Home />} />

      {/* Login Route
          Accessible only when user is NOT authenticated */}
      <Route
        path="/login"
        element={
          <AuthGuard>
            <Login />
          </AuthGuard>
        }
      />

      {/* Signup Route
          Accessible only when user is NOT authenticated */}
      <Route
        path="/signup"
        element={
          <AuthGuard>
            <Signup />
          </AuthGuard>
        }
      />

      {/* Cart Route
          Accessible only for authenticated users */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      {/* Orders Route
          Accessible only for authenticated users */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
