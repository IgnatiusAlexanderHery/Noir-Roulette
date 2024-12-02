import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Home } from './components/Home';
import { Login } from './components/Login';

const App = () => {
    const [user, setUser] = useState(null); // Menyimpan user data (username dan ID)

    return user ? (
        <Home username={user.username} room ={user.room} />
    ) : (
        <Login
            onSubmit={(userData) => {
                setUser(userData); // Menerima username dan ID dari Login
            }}
        />
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
