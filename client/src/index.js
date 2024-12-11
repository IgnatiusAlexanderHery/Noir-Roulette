import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GamePages from './components/Pages/GamePages';
import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePages from './components/Pages/HomePages';

const App = () => {
    return <Router>
        <Routes>
            <Route path="/" element={<HomePages />} />
            <Route path="/game" element={<GamePages />} />
        </Routes>
    </Router>
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
