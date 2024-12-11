import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GamePages from './components/Pages/GamePages';
import { BrowserRouter as Router, Routes, Route } from "react-router";

const App = () => {
    return <Router>
        <Routes>
            <Route path="/" element={<GamePages />} />
        </Routes>
    </Router>
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
