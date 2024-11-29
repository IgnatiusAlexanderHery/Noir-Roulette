import { useState } from 'react';

export function Login({ onSubmit }) {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');

    return (
        <>
            <h1>Welcome</h1>
            <p>What should people call you?</p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit({ username, room }); // Kirim username dan ID ke parent
                }}
            >
                <input
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    value={room}
                    placeholder="Room Number"
                    onChange={(e) => setRoom(e.target.value)}
                />
                <input type="submit" value="Join Game" />
            </form>
        </>
    );
}
