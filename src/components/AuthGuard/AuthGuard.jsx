import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import Loader from "../Loader/Loader";

function AuthGuard({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default AuthGuard;
