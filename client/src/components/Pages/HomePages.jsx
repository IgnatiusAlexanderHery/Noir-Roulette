import React from 'react';
import { Link } from 'react-router';

const HomePages = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-8">Noir Roulette</h1>
            <div className="flex space-x-4">
                <Link to="/game">
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Play Game
                    </button>
                </Link>
                <Link to="/howtoplay">
                    <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        How to Play
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default HomePages;
