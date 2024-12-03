import React from "react";
import Lives  from '../assets/Lives.png';
import BlankBullet  from '../assets/BlankBullet.png';
import LivesBullet  from '../assets/LivesBullet.png';
import NoLives  from '../assets/NoLives.png';
import Gun from "./Gun/Gun";

const pixel = 32;
const scale = 2;

export const LivesImg = () => {
    return(
        <img src={Lives} alt="Lives" width={pixel * scale} height={pixel * scale}/>
    )
}

export const BlankBulletImg = () => {
    return(
        <img src={BlankBullet} alt="BlankBullet" width={pixel * scale} height={pixel * scale} />
    )
}

export const LivesBulletImg = () => {
    return(
        <img src={LivesBullet} alt="LivesBullet" width={pixel * scale} height={pixel * scale} />
    )
}

export const NoLivesImg = () => {
    return(
        <img src={NoLives} alt="NoLives" width={pixel * scale} height={pixel * scale} />
    )
}

export const GunImg = () =>{
    return(<Gun/>)
}