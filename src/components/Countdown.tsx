'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Countdown() {
  const targetDate = new Date('2026-03-02T13:00:00+07:00').getTime();

  const [timeLeft, setTimeLeft] = useState({  hours: 0, minutes: 0, seconds: 0 });
  const [isStarted, setIsStarted] = useState(false);
  const [isNear, setIsNear] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsStarted(true);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      if (difference <= 600000 && difference > 0) {
        setIsNear(true);
      } else {
        setIsNear(false);
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isNear && cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.02,
        boxShadow: "0 0 30px rgba(236,72,153,0.4)",
        border: "1px solid rgba(236,72,153,0.5)",
        yoyo: true,
        repeat: -1,
        duration: 1,
        ease: "sine.inOut"
      });
    } else if (cardRef.current) {
      gsap.killTweensOf(cardRef.current);
      gsap.to(cardRef.current, {
        scale: 1,
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.1)",
        border: "1px solid var(--card-border)",
        duration: 0.5
      });
    }
  }, [isNear]);

  const pad = (num: number) => num.toString().padStart(2, '0');

  return (
    <section id="countdown" className="py-24 relative overflow-hidden flex justify-center items-center">
      <div className="container mx-auto px-4 z-10 flex flex-col items-center">
        
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            Pemilihan Dimulai Pada
          </h2>
          <p className="text-primary font-semibold text-lg md:text-xl tracking-wide uppercase">
            2 Maret 2026 &bull; 13:00 WIB
          </p>
        </div>

        <div 
          ref={cardRef}
          className="glass-panel rounded-3xl p-8 sm:p-12 w-full max-w-3xl flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>

          {isStarted ? (
            <div className="py-8 text-center animate-pulse">
              <h3 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Proses Pemilihan Telah Dimulai
              </h3>
              <p className="mt-4 text-foreground/60 font-medium text-lg">
                Gulir ke bawah untuk memutar spin wheel.
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-4 sm:gap-8 mt-2 justify-center w-full">
              <div className="flex flex-col items-center">
                <div className="relative group w-20 h-24 sm:w-32 sm:h-36 bg-foreground/5 dark:bg-background/50 border border-foreground/10 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden">
                   <span className="text-5xl sm:text-7xl font-mono font-bold text-foreground drop-shadow-sm tabular-nums tracking-tighter shadow-black">
                     {pad(timeLeft.hours)}
                   </span>
                </div>
                <span className="mt-4 text-sm font-semibold tracking-widest text-foreground/50 uppercase">Hours</span>
              </div>

              <span className="text-4xl sm:text-6xl font-black text-foreground/30 -mt-8">:</span>

              <div className="flex flex-col items-center">
                <div className="relative group w-20 h-24 sm:w-32 sm:h-36 bg-foreground/5 dark:bg-background/50 border border-foreground/10 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden">
                   <span className="text-5xl sm:text-7xl font-mono font-bold text-foreground drop-shadow-sm tabular-nums tracking-tighter">
                     {pad(timeLeft.minutes)}
                   </span>
                </div>
                <span className="mt-4 text-sm font-semibold tracking-widest text-foreground/50 uppercase">Minutes</span>
              </div>

              <span className="text-4xl sm:text-6xl font-black text-foreground/30 -mt-8">:</span>

              <div className="flex flex-col items-center">
                <div className="relative group w-20 h-24 sm:w-32 sm:h-36 bg-foreground/5 dark:bg-background/50 border border-foreground/10 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden">
                   <span className="text-5xl sm:text-7xl font-mono font-bold text-primary drop-shadow-sm tabular-nums tracking-tighter">
                     {pad(timeLeft.seconds)}
                   </span>
                </div>
                <span className="mt-4 text-sm font-semibold tracking-widest text-foreground/50 uppercase">Seconds</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
