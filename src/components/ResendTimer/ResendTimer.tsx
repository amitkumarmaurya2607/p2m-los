import React from 'react';
import { Timer } from 'lucide-react';
import { useCountdownTimer } from '@/hooks/useCountdownTimer';


interface ResendTimerProps {
  onResend: () => void;
  seconds?: number;
  icon?:boolean
  
}

const ResendTimer: React.FC<ResendTimerProps> = ({ onResend, seconds = 48,icon }) => {
  const { timeLeft, isActive, resetTimer } = useCountdownTimer(seconds);

  const handleResendClick = () => {
    resetTimer();
    onResend();
  };

  return (
    <div className="flex items-center gap-2">
      {icon && <Timer size={16} />}
      {isActive ? (
        <span>Resend in {timeLeft}s</span>
      ) : (
        <button
          onClick={handleResendClick}
          className="text-primary hover:text-primary/80 font-semibold cursor-pointer border-none bg-transparent p-0"
        >
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default ResendTimer;