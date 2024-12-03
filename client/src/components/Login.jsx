import { useState } from 'react';

export function Login({ onSubmit }) {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className='bg-slate-400 flex flex-col items-center justify-center h-screen '>
            <h1>Welcome</h1>
            <p>What should people call you?</p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit({ username, room }); // Kirim username dan ID ke parent
                }}
            >
                <input
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    type="text"
                    value={room}
                    placeholder="Room Number"
                    onChange={(e) => setRoom(e.target.value)}
                />
                <button 
                    className="rounded-md w-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="submit">
                    Join Game
                </button>
            </form>
        </div>
    );
}
