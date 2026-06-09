"use client";

import { useEffect, useState } from "react";

type TimerProps = {
    setTimeover: (value: boolean) => void;
    duration?: number; // seconds
};

const Timer = ({ setTimeover, duration = 300 }: TimerProps) => {
    const [seconds, setSeconds] = useState<number>(duration);

    useEffect(() => {
        setTimeover(false);
        setSeconds(duration);
    }, [duration, setTimeover]);

    useEffect(() => {
        if (seconds <= 0) {
            setTimeover(true);
            return;
        }

        const intervalId = window.setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => window.clearInterval(intervalId);
    }, [seconds, setTimeover]);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
        <div
            className="
        absolute bottom-[9px] left-1/2
        -translate-x-1/2 text-[13px]
      "
        >
            <div className="text-center font-medium text-red-500">
                {`${minutes.toString().padStart(2, "0")}:${remainingSeconds
                    .toString()
                    .padStart(2, "0")}`}
            </div>
        </div>
    );
};

export default Timer;