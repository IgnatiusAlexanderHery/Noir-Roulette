import React from "react";
import "./Gun.css"; // Import the CSS for custom animations
import GunSprite from "../../assets/GunSprite.png";

const Gun = () => {
  // Ukuran setiap frame
  const frameWidth = 32; // Lebar frame asli (px)
  const frameHeight = 32; // Tinggi frame asli (px)
  const scaleFactor = 6; // Faktor pembesaran untuk pixel art
  const containerWidth = frameWidth * scaleFactor; // Lebar container
  const containerHeight = frameHeight * scaleFactor; // Tinggi container
  const spriteWidth = frameWidth * 11 * scaleFactor; // Total lebar sprite sheet (11 frame)

  return (
    <div
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
      }}
      className="relative mx-auto my-16 overflow-hidden border border-red-600 bg-red-500"
    >
      <img
        className="max-w-none absolute pixelart animate-move-spritesheet"
        src={GunSprite}
        alt="Gun Sprite"
        style={{
          width: `${spriteWidth}px`, // Total lebar sprite sheet
          height: `${containerHeight}px`, // Tinggi sprite
        }}
      />
    </div>
  );
};

export default Gun;
