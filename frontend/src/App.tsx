import { Routes, Route } from "react-router-dom";
import ThoughtList from "./pages/ThoughtList";
import ThoughtWrite from "./pages/ThoughtWrite";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ThoughtList />} />
      <Route path="/write" element={<ThoughtWrite />} />
    </Routes>
  );
}

export default App;
