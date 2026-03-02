'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-gradient-1', {
        x: '30%', y: '10%', duration: 15, ease: 'sine.inOut', yoyo: true, repeat: -1
      });
      gsap.to('.hero-gradient-2', {
        x: '-30%', y: '-10%', duration: 18, ease: 'sine.inOut', yoyo: true, repeat: -1
      });

      gsap.from(elementsRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSpinWheel = () => {
    const el = document.getElementById('spin-wheel');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="hero-gradient-1 absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/20 dark:bg-primary/20 rounded-full blur-[100px] sm:blur-[150px] mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
        <div className="hero-gradient-2 absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-secondary/20 dark:bg-secondary/20 rounded-full blur-[100px] sm:blur-[150px] mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)] pointer-events-none"></div>
      </div>

      <div className="container relative z-10 px-6 mx-auto flex flex-col items-center text-center">
        
        <div 
          ref={el => { elementsRef.current[0] = el; }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/10 bg-background/50 backdrop-blur-md mb-8 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-foreground/80 uppercase">
            Official System
          </span>
        </div>

        <h1 
          ref={el => { elementsRef.current[1] = el; }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6 max-w-5xl drop-shadow-sm"
        >
          Selamat Datang di Pemilihan
          <br className="hidden md:block" />
          <span className="text-gradient"> Penanggung Jawab </span>
          Mata Kuliah
        </h1>

        <p 
          ref={el => { elementsRef.current[2] = el; }}
          className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
        >
          Sistem pemilihan dilakukan secara acak dan transparan menggunakan mekanisme Spin Wheel interaktif untuk Kelas 3KA25.
        </p>

        <div ref={el => { elementsRef.current[3] = el; }}>
          <MagneticButton 
            onClick={scrollToSpinWheel}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-foreground dark:bg-white dark:text-black rounded-full overflow-hidden transition-transform active:scale-95 shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)]"
          >
            <span className="relative z-10">Mulai Pemilihan</span>
            <ArrowDown size={20} className="relative z-10 group-hover:translate-y-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
