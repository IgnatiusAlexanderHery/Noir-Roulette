import React from "react"
import { LivesImg, NoLivesImg } from "./Image"

export const PlayerBox = ({ player, username, currentTurnPlayer, handleShoot }) => {
    return(
        <div className="flex flex-col items-center justify-between w-full max-w-[120px] sm:max-w-[150px] md:max-w-[200px] p-4 bg-white border border-black rounded-md shadow-md">
      <img
        src="https://via.placeholder.com/100x100.png?text=Player"
        alt="Player Avatar"
        className="hidden sm:flex w-20 h-20 object-cover rounded-full bg-gray-200"
      />
      <p className="text-center mt-2 text-sm md:text-md">
        {player.username} - Lives:{" "}
        <span className="flex justify-center items-center gap-1 flex-wrap">
          {Array.from({ length: 3 }).map((_, index) =>
            index < player.lives ? (
              <LivesImg key={index} />
            ) : (
              <NoLivesImg key={index} />
            )
          )}
        </span>
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
    )
}