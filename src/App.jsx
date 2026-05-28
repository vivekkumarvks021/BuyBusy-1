import { auth } from "./firebase/firebaseConfig";

function App() {
  console.log(auth);

  return <h1>Firebase Connected</h1>;
}

export default App;
