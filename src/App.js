import "./App.css";
import { usePost } from "./hooks/usePost";
import { usePosts } from "./hooks/usePosts";

function App() {
  usePost();
  usePosts();

  return <div className="App" />;
}

export default App;
