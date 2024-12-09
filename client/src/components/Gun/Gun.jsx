import React, { useImperativeHandle, forwardRef, useState } from "react";
import "./Gun.css";
import GunSprite from "../../assets/GunSprite.png";

const Gun = forwardRef((props, ref) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const playAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  useImperativeHandle(ref, () => ({
    playAnimation,
  }));

  const frameWidth = 32;
  const frameHeight = 32;
  const scaleFactor = 6;
  const containerWidth = frameWidth * scaleFactor;
  const containerHeight = frameHeight * scaleFactor;
  const spriteWidth = frameWidth * 11 * scaleFactor;

  return (
    <div
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        transform: `rotate(${props.rotation}deg)`,
      }}
      className="relative mx-auto my-16 overflow-hidden"
    >
      <img
        className={`max-w-none absolute pixelart ${
          isAnimating ? "animate-move-spritesheet" : ""
        }`}
        src={GunSprite}
        alt="Gun Sprite"
        style={{
          width: `${spriteWidth}px`,
          height: `${containerHeight}px`,
        }}
      />
    </div>
  );
});

export default Gun;
