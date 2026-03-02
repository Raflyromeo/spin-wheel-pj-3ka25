'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';
import { announceResult } from '@/lib/tts';

interface ResultModalProps {
  isOpen: boolean;
  name: string;
  course: string;
  onClose: () => void;
  isSoundEnabled: boolean;
}

export default function ResultModal({ isOpen, name, course, onClose, isSoundEnabled }: ResultModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && containerRef.current && cardRef.current) {
      if (isSoundEnabled) {
        try {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gainNode = ctx.createGain();
          
          osc1.type = 'sine';
          osc2.type = 'triangle';
          
          osc1.frequency.setValueAtTime(440, ctx.currentTime);
          osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
          
          osc2.frequency.setValueAtTime(554.37, ctx.currentTime);
          osc2.frequency.exponentialRampToValueAtTime(1108.73, ctx.currentTime + 0.4);
          
          gainNode.gain.setValueAtTime(0, ctx.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
          
          osc1.connect(gainNode);
          osc2.connect(gainNode);
          gainNode.connect(ctx.destination);
          
          osc1.start();
          osc2.start();
          osc1.stop(ctx.currentTime + 1.5);
          osc2.stop(ctx.currentTime + 1.5);
        } catch(e) {}

        setTimeout(() => announceResult(name, course, isSoundEnabled), 500);
      }

      gsap.fromTo(containerRef.current, 
        { autoAlpha: 0, backdropFilter: 'blur(0px)' }, 
        { autoAlpha: 1, backdropFilter: 'blur(8px)', duration: 0.5, ease: 'power2.out' }
      );

      gsap.fromTo(cardRef.current,
        { scale: 0.8, y: 50, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.7, ease: 'elastic.out(1, 0.7)', delay: 0.1 }
      );
    }
  }, [isOpen, name, course, isSoundEnabled]);

  const handleClose = () => {
    if (containerRef.current && cardRef.current) {
      gsap.to(cardRef.current, { scale: 0.9, opacity: 0, y: 30, duration: 0.3, ease: 'power2.in' });
      gsap.to(containerRef.current, { 
        autoAlpha: 0, 
        backdropFilter: 'blur(0px)', 
        duration: 0.4, 
        ease: 'power2.in',
        onComplete: onClose 
      });
      window.speechSynthesis.cancel();
    }
  };

  if (!isOpen && !containerRef.current) return null;

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${!isOpen ? 'pointer-events-none opacity-0' : ''}`}
      style={{ background: 'rgba(0,0,0,0.6)' }}
    >
      <div 
        ref={cardRef}
        className="glass-panel w-full max-w-lg rounded-3xl p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden"
      >
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-secondary/30 rounded-full blur-3xl"></div>

        <div className="z-10 flex flex-col gap-6 w-full">
          <div className="space-y-2">
            <p className="text-gray-400 text-lg uppercase tracking-widest font-semibold">Selamat kepada</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white text-gradient pb-2">{name}</h2>
          </div>

          <div className="opacity-80">
            <p className="text-white/80">atas penunjukannya sebagai</p>
            <p className="text-white font-semibold text-xl mt-1">Penanggung Jawab (PJ)</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-2 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 z-0"></div>
             <div className="relative z-10">
                <p className="text-gray-400 text-sm mb-2">Mata Kuliah</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">{course}</h3>
             </div>
          </div>

          <div className="mt-8 flex justify-center">
            <MagneticButton 
              onClick={handleClose}
              className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Tutup & Lanjutkan
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
