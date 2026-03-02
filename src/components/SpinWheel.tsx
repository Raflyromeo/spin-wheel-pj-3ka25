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

export default function SpinWheel({ 
  items, spinning, targetIndex, onSpinEnd, title, isSoundEnabled, toggleSound 
}: SpinWheelProps) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentRotRef = useRef(0);

  const colors = [
    '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', 
    '#facc15', '#10b981', '#14b8a6', '#6366f1'
  ];

  const displayItems = items.length > 0 ? items : ['Kosong'];
  const sliceDegree = 360 / displayItems.length;

  const playMechanicalSound = () => {
    if (!isSoundEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch(e) {}
  };

  useEffect(() => {
    if (spinning && targetIndex >= 0 && items.length > 0 && wheelRef.current) {
      const targetMidAngle = (targetIndex * sliceDegree) + (sliceDegree / 2);
      
      const baseRotation = 360 - targetMidAngle;
      const extraSpins = 360 * 6;
      const current = currentRotRef.current;
      const targetRotation = current + extraSpins + (baseRotation - (current % 360));

      let lastPulseAngle = current;

      gsap.to(wheelRef.current, {
        rotation: targetRotation,
        duration: 4.5,
        ease: 'power4.out',
        onUpdate: function() {
          const r = gsap.getProperty(wheelRef.current, "rotation") as number;
          if (Math.abs(r - lastPulseAngle) >= sliceDegree) {
            playMechanicalSound();
            lastPulseAngle = Math.floor(r / sliceDegree) * sliceDegree;
          }
        },
        onComplete: () => {
          currentRotRef.current = targetRotation;
          
          gsap.to(wheelRef.current, {
            rotation: targetRotation - 2,
            yoyo: true,
            repeat: 1,
            duration: 0.15,
            ease: 'power1.inOut',
            onComplete: () => {
              if (onSpinEnd) {
                setTimeout(onSpinEnd, 200);
              }
            }
          });
        }
      });
    }
  }, [spinning]);

  const getConicGradient = () => {
    if (displayItems.length === 1) return colors[0];
    
    let gradientParts = [];
    let currentAngle = 0;
    
    for (let i = 0; i < displayItems.length; i++) {
      const c = colors[i % colors.length];
      gradientParts.push(`${c} ${currentAngle}deg ${currentAngle + sliceDegree}deg`);
      currentAngle += sliceDegree;
    }
    
    return `conic-gradient(${gradientParts.join(', ')})`;
  };

  return (
    <div className="flex flex-col items-center gap-6 relative p-4">
      <div className="flex items-center justify-between w-full max-w-[300px]">
        <h3 className="text-xl font-bold text-white uppercase tracking-wider drop-shadow-md">{title}</h3>
        <button 
          onClick={toggleSound}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          title="Toggle Sound"
        >
          {isSoundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>
      
      <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20 drop-shadow-[0_4px_10px_rgba(255,255,255,0.5)]">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" className="transform rotate-180">
            <path d="M12 24L0 0L24 0L12 24Z" />
          </svg>
        </div>

        <div 
          className="w-full h-full rounded-full overflow-hidden border-4 border-white/20 relative shadow-[0_0_50px_rgba(139,92,246,0.25)]"
        >
          {/* Wheel Background */}
          <div 
            ref={wheelRef}
            className="w-full h-full rounded-full absolute top-0 left-0"
            style={{ 
              background: getConicGradient(),
            }}
          >
            {displayItems.map((_, i) => (
              <div 
                key={`line-${i}`}
                className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-white/40 origin-bottom"
                style={{ transform: `rotate(${i * sliceDegree}deg) translateX(-50%)` }}
              />
            ))}

            {displayItems.map((item, i) => {
              const rotateAngle = (i * sliceDegree) + (sliceDegree / 2);
              
              return (
                 <div
                   key={`text-${i}`}
                   className="absolute top-0 left-1/2 h-1/2 flex items-start justify-center pt-8 origin-bottom"
                   style={{ transform: `rotate(${rotateAngle}deg) translateX(-50%)` }}
                 >
                   <span 
                     className="text-white font-bold text-sm sm:text-base lg:text-lg [writing-mode:vertical-rl] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                   >
                     {item.length > 20 ? item.substring(0, 18) + '...' : item}
                   </span>
                 </div>
              );
            })}
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full glass-panel z-10 flex items-center justify-center border-4 border-white/50 shadow-2xl">
            <div className="w-4 h-4 rounded-full bg-white shadow-inner"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
