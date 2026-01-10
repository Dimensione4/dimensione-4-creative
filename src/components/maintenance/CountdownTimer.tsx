import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return null;
  }

  const timeBlocks = [
    { value: timeLeft.days, label: "giorni" },
    { value: timeLeft.hours, label: "ore" },
    { value: timeLeft.minutes, label: "min" },
    { value: timeLeft.seconds, label: "sec" },
  ];

  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-3 md:gap-4 ${className}`}>
      {timeBlocks.map((block, index) => (
        <div key={block.label} className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center rounded-lg sm:rounded-xl bg-surface/80 border border-border backdrop-blur-sm">
              <span className="font-display text-lg sm:text-2xl md:text-3xl font-bold text-foreground">
                {String(block.value).padStart(2, "0")}
              </span>
            </div>
            <span className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
              {block.label}
            </span>
          </div>
          {index < timeBlocks.length - 1 && (
            <span className="text-lg sm:text-2xl md:text-3xl font-bold text-primary mb-4 sm:mb-6">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
