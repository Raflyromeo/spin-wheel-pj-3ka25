'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Volume2, VolumeX } from 'lucide-react';

interface SpinWheelProps {
  items: string[];
  spinning: boolean;
  targetIndex: number;
  onSpinEnd?: () => void;
  title: string;
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

// Neobrutalism colors - no gradient, solid blocks
const COLORS = [
  '#1a3a8f', // navy
  '#4a90d9', // blue medium
  '#7cb9f0', // light blue
  '#0d1b3e', // dark navy
  '#2563a0', // blue
  '#5ba3e8', // sky
  '#1e4fa0', // navy bright
  '#3a7dc9', // blue mid
];

export default function SpinWheel({ 
  items, spinning, targetIndex, onSpinEnd, title, isSoundEnabled, toggleSound 
}: SpinWheelProps) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const currentRotRef = useRef(0);

  const displayItems = items.length > 0 ? items : ['Kosong'];
  const sliceDeg = 360 / displayItems.length;

  const playTick = () => {
    if (!isSoundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {}
  };

  useEffect(() => {
    if (spinning && targetIndex >= 0 && items.length > 0 && wheelRef.current) {
      const targetMid = targetIndex * sliceDeg + sliceDeg / 2;
      const baseRot = 360 - targetMid;
      const extraSpins = 360 * 6;
      const cur = currentRotRef.current;
      const targetRot = cur + extraSpins + (baseRot - (cur % 360));
      let lastPulse = cur;

      gsap.to(wheelRef.current, {
        rotation: targetRot,
        duration: 4.5,
        ease: 'power4.out',
        onUpdate() {
          const r = gsap.getProperty(wheelRef.current, 'rotation') as number;
          if (Math.abs(r - lastPulse) >= sliceDeg) {
            playTick();
            lastPulse = Math.floor(r / sliceDeg) * sliceDeg;
          }
        },
        onComplete() {
          currentRotRef.current = targetRot;
          gsap.to(wheelRef.current, {
            rotation: targetRot - 3,
            yoyo: true, repeat: 1,
            duration: 0.12,
            ease: 'power1.inOut',
            onComplete() { setTimeout(() => onSpinEnd?.(), 200); }
          });
        }
      });
    }
  }, [spinning]);

  const getConicGradient = () => {
    if (displayItems.length === 1) return COLORS[0];
    const parts = displayItems.map((_, i) => {
      const c = COLORS[i % COLORS.length];
      return `${c} ${i * sliceDeg}deg ${(i + 1) * sliceDeg}deg`;
    });
    return `conic-gradient(${parts.join(', ')})`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Title row */}
      <div className="flex items-center justify-between w-full max-w-[300px] sm:max-w-[340px]">
        <div className="bg-foreground text-background text-xs font-black px-3 py-1.5 uppercase tracking-widest">
          {title}
        </div>
        <button
          onClick={toggleSound}
          className="neo-btn w-9 h-9 flex items-center justify-center bg-card text-foreground hover:bg-primary hover:text-white transition-colors duration-100"
          title={isSoundEnabled ? 'Matikan suara' : 'Hidupkan suara'}
        >
          {isSoundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>

      {/* Wheel */}
      <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px]">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 z-20">
          <svg width="32" height="36" viewBox="0 0 24 28" fill="var(--foreground)">
            <path d="M12 28L0 0L24 0L12 28Z" />
          </svg>
        </div>

        {/* Wheel container */}
        <div className="w-full h-full rounded-full overflow-hidden wheel-container">
          <div
            ref={wheelRef}
            className="w-full h-full rounded-full"
            style={{ background: getConicGradient() }}
          >
            {/* Divider lines */}
            {displayItems.map((_, i) => (
              <div
                key={`line-${i}`}
                className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-white/20 origin-bottom"
                style={{ transform: `rotate(${i * sliceDeg}deg) translateX(-50%)` }}
              />
            ))}

            {/* Labels */}
            {displayItems.map((item, i) => {
              const angle = i * sliceDeg + sliceDeg / 2;
              return (
                <div
                  key={`label-${i}`}
                  className="absolute top-0 left-1/2 h-1/2 flex items-start justify-center pt-6 sm:pt-8 origin-bottom"
                  style={{ transform: `rotate(${angle}deg) translateX(-50%)` }}
                >
                  <span className="text-white font-black text-xs sm:text-sm [writing-mode:vertical-rl] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] leading-tight">
                    {item.length > 18 ? item.substring(0, 16) + '…' : item}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-card border-4 border-foreground z-10 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-foreground"></div>
          </div>
        </div>
      </div>

      {/* Item count badge */}
      <div className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
        {displayItems.length} item{displayItems.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
