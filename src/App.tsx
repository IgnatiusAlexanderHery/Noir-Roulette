import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import HowToPlay from "./pages/HowToPlay";
import Game from "./pages/Game";

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        <nav className="p-4 flex space-x-4 bg-gray-800">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-400">
            About
          </Link>
          <Link to="/how-to-play" className="hover:text-gray-400">
            How to Play
          </Link>
          <Link to="/game" className="hover:text-gray-400">
            Game
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
