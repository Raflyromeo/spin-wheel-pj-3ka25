'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { announceResult } from '@/lib/tts';
import { X, Trophy } from 'lucide-react';

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
          const gain = ctx.createGain();
          osc1.type = 'sine';
          osc2.type = 'triangle';
          osc1.frequency.setValueAtTime(440, ctx.currentTime);
          osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
          osc2.frequency.setValueAtTime(554.37, ctx.currentTime);
          osc2.frequency.exponentialRampToValueAtTime(1108.73, ctx.currentTime + 0.4);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
          osc1.connect(gain); osc2.connect(gain); gain.connect(ctx.destination);
          osc1.start(); osc2.start();
          osc1.stop(ctx.currentTime + 1.5); osc2.stop(ctx.currentTime + 1.5);
        } catch {}
        setTimeout(() => announceResult(name, course, isSoundEnabled), 500);
      }

      gsap.fromTo(containerRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(cardRef.current,
        { scale: 0.85, y: 40, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)', delay: 0.05 }
      );
    }
  }, [isOpen, name, course, isSoundEnabled]);

  const handleClose = () => {
    if (containerRef.current && cardRef.current) {
      gsap.to(cardRef.current, { scale: 0.9, opacity: 0, y: 20, duration: 0.2, ease: 'power2.in' });
      gsap.to(containerRef.current, {
        autoAlpha: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: onClose
      });
      window.speechSynthesis?.cancel();
    }
  };

  if (!isOpen && !containerRef.current) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[80] flex items-center justify-center p-4 ${!isOpen ? 'pointer-events-none opacity-0' : ''}`}
      style={{ background: 'rgba(13, 27, 62, 0.75)' }}
    >
      <div
        ref={cardRef}
        className="neo-card bg-card w-full max-w-md relative overflow-hidden"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b-3 border-foreground bg-primary">
          <div className="flex items-center gap-2">
            <Trophy size={18} className="text-white" />
            <span className="text-xs font-black uppercase tracking-widest text-white">Hasil Pemilihan</span>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-primary transition-colors duration-100"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col gap-6">
          {/* Name block */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-black uppercase tracking-widest text-foreground/40">
              Selamat kepada
            </p>
            <div className="border-3 border-foreground bg-surface px-5 py-4">
              <h2 className="text-2xl md:text-3xl font-black text-foreground leading-tight uppercase">
                {name}
              </h2>
            </div>
          </div>

          {/* Role */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-black uppercase tracking-widest text-foreground/40">
              Ditunjuk sebagai
            </p>
            <div className="bg-foreground text-background px-5 py-3">
              <p className="text-base font-black uppercase tracking-wide text-center">
                Penanggung Jawab (PJ) Mata Kuliah
              </p>
            </div>
          </div>

          {/* Course */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-black uppercase tracking-widest text-foreground/40">
              Mata Kuliah
            </p>
            <div className="border-3 border-primary bg-card px-5 py-4">
              <h3 className="text-xl md:text-2xl font-black text-primary uppercase">{course}</h3>
            </div>
          </div>

          {/* Action */}
          <button
            onClick={handleClose}
            className="neo-btn-primary w-full py-4 text-sm font-black uppercase tracking-widest"
          >
            Tutup & Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}
