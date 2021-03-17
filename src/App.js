import "./App.css";
import { usePost } from "./hooks/usePost";

function App() {
  usePost();

  return <div className="App" />;
}

export default App;
