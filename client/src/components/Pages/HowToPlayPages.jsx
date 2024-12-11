import React from 'react';
import { Link } from 'react-router'; 

const HowToPlayPage = () => {
  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white h-screen w-screen">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">← Back to Home</Link>
      <h1 className="text-3xl font-bold mb-4">How to Play</h1>

      <p className="mb-2">
        Noir Roulette is a thrilling game for 2-4 players. Each player takes turns,
        choosing to shoot themselves or another player.
      </p>

      <h2 className="text-2xl font-bold mb-2">Gameplay:</h2>
      <ol className="list-decimal list-inside mb-4">
        <li>
          <b>Your Turn:</b> When it's your turn, you have two choices:
          <ul className="list-disc list-inside ml-4">
            <li>
              <b>Shoot Yourself:</b>  If you draw a blank, you must choose again.
              If you draw a live bullet, you lose a life, and the turn passes to the next player.
            </li>
            <li>
              <b>Shoot Another Player:</b> If you draw a blank, nothing happens,
              and the turn passes to the next player. If you draw a live bullet,
              the targeted player loses a life, and the turn passes to the next player.
            </li>
          </ul>
        </li>
        <li>
          <b>Empty Chamber:</b> When the bullet chamber is empty, it reloads automatically.
        </li>
      </ol>

      <h2 className="text-2xl font-bold mb-2">Objective:</h2>
      <p className="mb-4">Be the last player standing!</p>
    </div>
  );
};

export default HowToPlayPage;
