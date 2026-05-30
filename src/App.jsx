import Loader from "./components/Loader/Loader";
import Navbar from "./components/Navbar/Navbar";
import { useAuth } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
