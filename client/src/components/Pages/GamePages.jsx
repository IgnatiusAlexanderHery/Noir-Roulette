import React, { useState } from 'react';
import Login from '../Login';
import Home from '../Home';

function GamePages() {
    const [user, setUser] = useState(null);

    return user ? (
        <Home username={user.username} room ={user.room} />
    ) : (
        <Login
            onSubmit={(userData) => {
                setUser(userData);
            }}
        />
    );
}

export default GamePages;
