import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./pages/Home.jsx";
import Write from "./pages/Write.jsx";
import Diary from "./pages/Diary.jsx";
import Edit from "./pages/Edit.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/write"}>New write</Link>
        <Link to={"/diary"}>Diary</Link>
        <Link to={"/edit"}>Edit</Link>
      </div>
    </div>
  );
}

export default App;
