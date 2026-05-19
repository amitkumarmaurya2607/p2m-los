import React from "react";

function FacebookIcon({ color = "#000", size = 28 }: { color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.0013 2.33398H17.5013C15.9542 2.33398 14.4705 2.94857 13.3765 4.04253C12.2826 5.13649 11.668 6.62022 11.668 8.16732V11.6673H8.16797V16.334H11.668V25.6673H16.3346V16.334H19.8346L21.0013 11.6673H16.3346V8.16732C16.3346 7.8579 16.4576 7.56115 16.6763 7.34236C16.8951 7.12357 17.1919 7.00065 17.5013 7.00065H21.0013V2.33398Z"
        stroke={color}
        strokeWidth="2.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default FacebookIcon;
