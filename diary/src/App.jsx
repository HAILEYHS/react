import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home.jsx";
import Write from "./pages/Write.jsx";
import Diary from "./pages/Diary.jsx";
import Edite from "./pages/Edit.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/edite" element={<Edite />} />

      </Routes>
    </div>
  );
}

export default App;
