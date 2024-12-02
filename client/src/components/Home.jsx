import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";

export function Home({ username, room }) {
  const WS_URL = process.env.REACT_APP_WEBSOCKET_URL || "ws://localhost:3000";
  const { sendJsonMessage, lastJsonMessage} = useWebSocket(WS_URL, {
    share: true,
    queryParams: { username, room },
    onOpen: () => console.log("WebSocket connected"),
    onClose: () => console.log("WebSocket disconnected"),
    onError: (error) => console.error("WebSocket error:", error),
  });

  const [game, setGame] = useState(null);

  useEffect(() => {
    if (lastJsonMessage) {
      if (lastJsonMessage.error) {
        alert(lastJsonMessage.error); // Tampilkan alert jika ada error
        window.location.reload(); // Reload halaman kembali ke login screen
      } else {
        setGame(lastJsonMessage.game);
      }
      console.log(lastJsonMessage);
    }
  }, [lastJsonMessage]);

  const handleShoot = (targetId) => {
    sendJsonMessage({
      action: "shoot",
      shooterId: username,
      targetId,
    });
  };
  if (!game || !game.started)
    return (
      <div className="flex h-screen items-center justify-center">
        <div>
          <div className="justify-self-center">
            <svg
              aria-hidden="true"
              className="inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
          <p>Waiting for players...</p>
        </div>
      </div>
    );

  const currentTurnPlayer = game.players[game.turnIndex];

  return (
<div className="relative h-screen bg-gray-100">
  {/* Header */}
  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center">
    <h1 className="text-xl font-bold text-red-700 md:text-2xl">Game Room: {room}</h1>
    <h2 className="mt-1 text-md md:text-lg">Turn: {currentTurnPlayer.username}</h2>
    <h3 className="text-sm text-gray-600">Ammo:</h3>
    <div className="flex gap-2 mt-2">
      {game.ammo
        .sort((a, b) => (a === "real" ? -1 : 1)) // Opsional: Sort 'real' ke depan
        .map((ammo, index) => (
          <img
            key={index}
            src={
              ammo === "real"
                ? "https://via.placeholder.com/20x20.png?text=Real" // Gambar merah
                : "https://via.placeholder.com/20x20.png?text=Fake" // Gambar abu-abu
            }
            alt={ammo}
            className="w-5 h-5"
          />
        ))}
    </div>
  </div>

  {/* Player Containers */}
  <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:grid-cols-4 absolute inset-0 p-4 items-center justify-center">
    {game.players.map((player, index) => (
      <div
        key={player.id}
        className="flex flex-col items-center justify-between w-full max-w-[120px] sm:max-w-[150px] md:max-w-[200px] p-4 bg-white border border-black rounded-md shadow-md"
      >
        <img
          src="https://via.placeholder.com/100x100.png?text=Player"
          alt="Player Avatar"
          className="w-20 h-20 object-cover rounded-full bg-gray-200"
        />
        <p className="text-center mt-2 text-sm md:text-md">
          {player.username} - Lives: {player.lives}{" "}
          {player.username === username && (
            <span className="text-red-500 font-bold">(You)</span>
          )}
        </p>
        {currentTurnPlayer.username === username && player.lives > 0 && (
          <>
            {player.id === currentTurnPlayer.id ? (
              <button
                className="px-3 py-1 mt-2 text-xs md:text-sm text-white bg-red-600 rounded hover:bg-red-700"
                onClick={() => handleShoot(player.id)}
              >
                Shoot Yourself
              </button>
            ) : (
              <button
                className="px-3 py-1 mt-2 text-xs md:text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                onClick={() => handleShoot(player.id)}
              >
                Shoot Enemy
              </button>
            )}
          </>
        )}
      </div>
    ))}
  </div>
</div>

  );
}
