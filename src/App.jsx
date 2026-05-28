import { useAuth } from "./context/AuthContext";

function App() {
  const { user, loading } = useAuth();

  console.log(user);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>E-Commerce App</h1>

      {user ? <p>{user.email}</p> : <p>No User</p>}
    </div>
  );
}

export default App;
