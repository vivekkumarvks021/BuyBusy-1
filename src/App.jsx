import Navbar from "./components/Navbar/Navbar";
import { useAuth } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user, loading } = useAuth();

  console.log(user);

  if (loading) {
    return <h1>Loading...</h1>;
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
