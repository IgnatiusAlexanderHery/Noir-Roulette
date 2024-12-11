import React, { useState } from 'react';
import Login from '../Login';
import Home from '../Home';

function GamePages() {
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
}

export default GamePages;
