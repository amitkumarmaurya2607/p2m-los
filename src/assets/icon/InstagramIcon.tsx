

import React from 'react'

function InstagramIcon({
    color = "#000",
    size = 28,
}: {
    color?: string;
    size?: number;
}) {
  return (
   <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.832 2.33398H8.16536C4.9437 2.33398 2.33203 4.94566 2.33203 8.16732V19.834C2.33203 23.0556 4.9437 25.6673 8.16536 25.6673H19.832C23.0537 25.6673 25.6654 23.0556 25.6654 19.834V8.16732C25.6654 4.94566 23.0537 2.33398 19.832 2.33398Z" stroke={color} strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.6657 13.2654C18.8097 14.2363 18.6438 15.2279 18.1917 16.0992C17.7396 16.9705 17.0243 17.677 16.1476 18.1183C15.2708 18.5596 14.2772 18.7132 13.3081 18.5573C12.339 18.4013 11.4437 17.9438 10.7497 17.2497C10.0556 16.5556 9.59803 15.6604 9.44209 14.6913C9.28614 13.7222 9.43975 12.7286 9.88105 11.8518C10.3224 10.975 11.0289 10.2597 11.9002 9.80763C12.7714 9.35555 13.7631 9.1897 14.734 9.33369C15.7244 9.48055 16.6413 9.94206 17.3493 10.65C18.0573 11.358 18.5188 12.2749 18.6657 13.2654Z" stroke={color} strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M20.418 7.58398H20.4296" stroke={color} strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

  )
}

export default InstagramIcon