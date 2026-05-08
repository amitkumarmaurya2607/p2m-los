

import React from 'react'

function InnkedIcon({
    color = "#000",
    size = 28,
}: {
    color?: string;
    size?: number;
}) {
  return (
   <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.668 9.33398C20.5245 9.33398 22.305 10.0715 23.6177 11.3842C24.9305 12.697 25.668 14.4775 25.668 16.334V24.5007H21.0013V16.334C21.0013 15.7151 20.7555 15.1217 20.3179 14.6841C19.8803 14.2465 19.2868 14.0007 18.668 14.0007C18.0491 14.0007 17.4556 14.2465 17.0181 14.6841C16.5805 15.1217 16.3346 15.7151 16.3346 16.334V24.5007H11.668V16.334C11.668 14.4775 12.4055 12.697 13.7182 11.3842C15.031 10.0715 16.8115 9.33398 18.668 9.33398Z" stroke={color} strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.9987 10.5H2.33203V24.5H6.9987V10.5Z" stroke={color} strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4.66536 7.00065C5.95403 7.00065 6.9987 5.95598 6.9987 4.66732C6.9987 3.37865 5.95403 2.33398 4.66536 2.33398C3.3767 2.33398 2.33203 3.37865 2.33203 4.66732C2.33203 5.95598 3.3767 7.00065 4.66536 7.00065Z" stroke={color} strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

  )
}

export default InnkedIcon