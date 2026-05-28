import { useAuth } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { user, loading } = useAuth();

  console.log(user);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <AppRoutes />;
}

export default App;
