import React, { useState, useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import Gun from "./Gun/Gun";
import { LivesBulletImg, BlankBulletImg } from "./Image";
import { PlayerBox } from "./PlayerBox";
import gunShoot from "../assets/gun-shoot.wav";
import gunShootBlank from "../assets/gun-shoot-blank.wav";
import gunReload from "../assets/gun-reload.wav";

export function Home({ username, room }) {
  const WS_URL = process.env.REACT_APP_WEBSOCKET_URL || "ws://localhost:3000";
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    queryParams: { username, room },
    onOpen: () => console.log("WebSocket connected to " + WS_URL),
    onClose: () => console.log("WebSocket disconnected"),
    onError: (error) => console.error("WebSocket error:", error),
  });

  const [game, setGame] = useState(null);
  const [rotation, setRotation] = useState(0); // State untuk rotasi senjata
  const gunRef = useRef(null); // Ref untuk mengontrol Gun

  useEffect(() => {
    if (lastJsonMessage) {
      if (lastJsonMessage.error) {
        alert(lastJsonMessage.error);
        window.location.reload();
      } else {
        setGame(lastJsonMessage.game);
        playGunSounds(lastJsonMessage);
      }
    }
  }, [lastJsonMessage]);

  const playGunSounds = (message) => {
    if (message.game.started) {
      if (message.game.lastBullet === true) {
        new Audio(gunShoot).play();
      } else if (message.game.lastBullet === false) {
        new Audio(gunShootBlank).play();
      }
      if (message.game.ammo.length === 6 && message.game.lastBullet !== null) {
        setTimeout(() => {
          new Audio(gunReload).play();
        }, 1000);
      }
    }
  };

  const handleShoot = (targetId, targetPosition) => {
    // Mainkan animasi Gun sebelum mengirimkan pesan
    if (gunRef.current) {
      gunRef.current.playAnimation();
    }

    // Hitung sudut rotasi ke target
    const gunPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const deltaX = targetPosition.x - gunPosition.x;
    const deltaY = targetPosition.y - gunPosition.y;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Konversi ke derajat
    setRotation(angle + 90);

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
              {/* SVG Paths */}
            </svg>
          </div>
          <p>Waiting for players...</p>
        </div>
      </div>
    );

  const currentTurnPlayer = game.players[game.turnIndex];

  return (
    <div className="grid bg-gray-100 grid-cols-1 md:grid-cols-3 grid-rows-3 gap-4 justify-items-center">
      {/* Header */}
      <div className="row-start-1 col-span-3 flex flex-col items-center justify-center text-center">
        <h1 className="text-lg font-bold text-red-700 sm:text-md md:text-2xl">
          Game Room: {room}
        </h1>
        <h2 className="mt-1 text-sm md:text-lg">
          Turn: {currentTurnPlayer.username}
        </h2>
        <h3 className="text-sm text-gray-600">Ammo:</h3>
        <div className="flex gap-2 mt-2">
          {game.ammo
            .sort((a, b) => (a === "real" ? -1 : 1))
            .map((ammo, index) =>
              ammo === "real" ? (
                <LivesBulletImg key={index} />
              ) : (
                <BlankBulletImg key={index} />
              )
            )}
        </div>
      </div>

      {/* Player Boxes */}
      <div className="row-start-2 col-start-1">
        {game.players[0] && (
          <PlayerBox
            player={game.players[0]}
            username={username}
            currentTurnPlayer={currentTurnPlayer}
            handleShoot={(targetId) =>
              handleShoot(targetId, { x: 100, y: 200 }) // Posisi dummy
            }
          />
        )}
      </div>
      <div className="row-start-2 col-start-3">
        {game.players[1] && (
          <PlayerBox
            player={game.players[1]}
            username={username}
            currentTurnPlayer={currentTurnPlayer}
            handleShoot={(targetId) =>
              handleShoot(targetId, { x: window.innerWidth - 100, y: 200 }) // Posisi dummy
            }
          />
        )}
      </div>
      <div className="row-start-2 col-start-2 flex items-center justify-center">
        {/* Gantikan Center dengan Gun */}
        <Gun ref={gunRef} rotation={rotation}/>
      </div>
      <div className="row-start-3 col-start-1">
        {game.players[2] && (
          <PlayerBox
            player={game.players[2]}
            username={username}
            currentTurnPlayer={currentTurnPlayer}
            handleShoot={(targetId) =>
              handleShoot(targetId, { x: 100, y: window.innerHeight - 150 }) // Posisi dummy
            }
          />
        )}
      </div>
      <div className="row-start-3 col-start-3">
        {game.players[3] && (
          <PlayerBox
            player={game.players[3]}
            username={username}
            currentTurnPlayer={currentTurnPlayer}
            handleShoot={(targetId) =>
              handleShoot(targetId, { x: window.innerWidth - 100, y: window.innerHeight - 50 }) // Posisi dummy
            }
          />
        )}
      </div>
    </div>
  );
}
