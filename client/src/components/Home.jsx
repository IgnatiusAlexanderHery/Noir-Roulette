import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { LivesBulletImg, BlankBulletImg } from "./Image";
import { PlayerBox } from "./PlayerBox";
import gunShoot from '../assets/gun-shoot.wav';
import gunShootBlank from '../assets/gun-shoot-blank.wav';
import gunReload from '../assets/gun-reload.wav';



export function Home({ username, room }) {
  const WS_URL = process.env.REACT_APP_WEBSOCKET_URL || "ws://localhost:3000";
  const { sendJsonMessage, lastJsonMessage} = useWebSocket(WS_URL, {
    share: true,
    queryParams: { username, room },
    onOpen: () => console.log("WebSocket connected to " + WS_URL),
    onClose: () => console.log("WebSocket disconnected"),
    onError: (error) => console.error("WebSocket error:", error),
  });

  const [game, setGame] = useState(null);
  // const [bulletType, setBulletType] = useState(null);

  function playGunSounds(lastJsonMessage) {
    if (lastJsonMessage.game.started) {
      console.log(lastJsonMessage);
      if (lastJsonMessage.game.lastBullet === true) {
        console.log("live");
        new Audio(gunShoot).play();
      } else if (lastJsonMessage.game.lastBullet === false){
        console.log("blank");
        new Audio(gunShootBlank).play();
      }
      if (lastJsonMessage.game.ammo.length === 6 && lastJsonMessage.game.lastBullet !== null) {
        console.log("reload");
        setTimeout(() => {
          new Audio(gunReload).play();
        }, 1000);
      }
    }
  }

  useEffect(() => {
    if (lastJsonMessage) {
      if (lastJsonMessage.error) {
        alert(lastJsonMessage.error); // Tampilkan alert jika ada error
        window.location.reload(); // Reload halaman kembali ke login screen
      } else {
        setGame(lastJsonMessage.game);
        // setBulletType(lastJsonMessage.game.ammo[0]);
        playGunSounds(lastJsonMessage);
      }
    }
  }, [lastJsonMessage]);

  const handleShoot = (targetId) => {
    // console.log(lastJsonMessage);
    // console.log(bulletType);

    // if(lastJsonMessage.game.ammo.length <= 6){
    //   if(bulletType === 'real'){
    //     console.log("live")
    //   new Audio(gunShoot).play();
    //   }
    //   else {
    //     console.log("blank")
    //     new Audio(gunShootBlank).play();
    //   }
    // }

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
<div className="grid bg-gray-100 grid-cols-1 md:grid-cols-3 grid-rows-3 gap-4">
  {/* Header */}
  <div className="row-start-1 col-span-3 flex flex-col items-center justify-center text-center">
    <h1 className="text-lg font-bold text-red-700 sm:text-md md:text-2xl">Game Room: {room}</h1>
    <h2 className="mt-1 text-sm md:text-lg">Turn: {currentTurnPlayer.username}</h2>
    <h3 className="text-sm text-gray-600">Ammo:</h3>
    <div className="flex gap-2 mt-2">
      {game.ammo
        .sort((a, b) => (a === "real" ? -1 : 1)) // Opsional: Sort 'real' ke depan
        .map((ammo, index) => (
          ammo === "real" ? <LivesBulletImg key={index} /> : <BlankBulletImg key={index} />
        ))}
    </div>
  </div>

  {/* Player Top-Left */}
  <div className="row-start-2 col-start-1 flex flex-col items-center justify-center p-4 sm:p-2">
    {game.players[0] && (
      <PlayerBox player={game.players[0]} username={username} currentTurnPlayer={currentTurnPlayer} handleShoot={handleShoot} />
    )}
  </div>

  {/* Player Top-Right */}
  <div className="row-start-2 col-start-3 flex flex-col items-center justify-center p-4 sm:p-2">
    {game.players[1] && (
      <PlayerBox player={game.players[1]} username={username} currentTurnPlayer={currentTurnPlayer} handleShoot={handleShoot} />
    )}
  </div>

  {/* Center Image */}
  <div className="row-start-2 col-start-2 flex items-center justify-center ">
    <img
      src="https://via.placeholder.com/192x192.png?text=Center"
      alt="Center Element"
      className="w-48 h-48"
    />
  </div>

  {/* Player Bottom-Left */}
  <div className="row-start-3 col-start-1 flex flex-col items-center justify-center p-4 sm:p-2">
    {game.players[2] && (
      <PlayerBox player={game.players[2]} username={username} currentTurnPlayer={currentTurnPlayer} handleShoot={handleShoot} />
    )}
  </div>

  {/* Player Bottom-Right */}
  <div className="row-start-3 col-start-3 flex flex-col items-center justify-center p-4 sm:p-2">
    {game.players[3] && (
      <PlayerBox player={game.players[3]} username={username} currentTurnPlayer={currentTurnPlayer} handleShoot={handleShoot} />
    )}
  </div>
</div>

  );
}
