import { Routes, Route } from "react-router-dom";

import './App.css';
import Home from "./pages/home/home";
import Navbar from "./components/navbar/navbar";
import MovieDetail from "./pages/movieDetail/movieDetail";

function App() {
  return (
    <Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<MovieDetail />} />
      </Routes>
    </Navbar>
  );
}

export default App;
