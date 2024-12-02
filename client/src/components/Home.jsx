import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";

export function Home({ username, room }) {
  const WS_URL = process.env.REACT_APP_WEBSOCKET_URL || "ws://localhost:3000";
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL, {
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
    }
  }, [lastJsonMessage]);

  const handleShoot = (targetId) => {
    sendJsonMessage({
      action: "shoot",
      shooterId: username,
      targetId,
    });
  };

  if (!game || !game.started) return <p>Waiting for players...</p>;

  const currentTurnPlayer = game.players[game.turnIndex];

  return (
    <div className="">
      <h1 className="text-red-700">Game Room: {room}</h1>
      <h2>Turn: {currentTurnPlayer.username}</h2>
      <h3>Ammo: {game.ammo.length}</h3>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {game.players.map((player) => (
          <div key={player.id} style={{ border: "1px solid black", padding: 20 }}>
            <p>
              {player.username} - Lives: {player.lives} {player.username  === username && 
              (
                <span style={{ color: "red" }}>
                  You
                </span>
              )
              }
            </p>
            {currentTurnPlayer.username === username && player.lives > 0 && (
            <>
              {player.id === currentTurnPlayer.id ? ( // Jika pemain adalah dirinya sendiri
                <button onClick={() => handleShoot(player.id)}>
                  Shoot Yourself
                </button>
              ) : ( // Jika pemain adalah lawan
                <button onClick={() => handleShoot(player.id)}>
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
