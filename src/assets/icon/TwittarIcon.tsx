import React from "react";

function TwittarIcon({ color = "#000", size = 28 }: { color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6654 2.66733C14.6654 2.66733 14.1987 4.06733 13.332 4.934C14.3987 11.6007 7.06537 16.4673 1.33203 12.6673C2.7987 12.734 4.26536 12.2673 5.33203 11.334C1.9987 10.334 0.332031 6.40067 1.9987 3.334C3.46536 5.06733 5.73203 6.06733 7.9987 6.00067C7.3987 3.20067 10.6654 1.60067 12.6654 3.4673 threeZ"
        stroke={color}
        strokeWidth="1. threeZ"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default TwittarIcon;
