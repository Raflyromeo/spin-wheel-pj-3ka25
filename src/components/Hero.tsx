'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';
import MagneticButton from './MagneticButton';
import TutorialAnimation from './TutorialAnimation';

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
        <div className="hero-gradient-1 absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/30 dark:bg-primary/20 rounded-full blur-[100px] sm:blur-[150px] mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
        <div className="hero-gradient-2 absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-secondary/30 dark:bg-secondary/20 rounded-full blur-[100px] sm:blur-[150px] mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)] pointer-events-none"></div>
      </div>

      <div className="container relative z-10 px-6 md:px-12 lg:px-20 xl:px-24 mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 min-h-[calc(100vh-5rem)]">
        
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 xl:w-5/12 z-10">
          <div 
            ref={el => { elementsRef.current[0] = el; }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/10 bg-background/50 backdrop-blur-md mb-6 lg:mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-foreground/80 uppercase">
              Official System
            </span>
          </div>

          <h1 
            ref={el => { elementsRef.current[1] = el; }}
            className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15] sm:leading-[1.1] mb-5 lg:mb-6 max-w-xl drop-shadow-sm px-2 sm:px-0"
          >
            Selamat Datang di Pemilihan
            <br className="hidden sm:block" />
            <span className="text-gradient block sm:inline mt-1 sm:mt-0"> Penanggung Jawab </span>
            Mata Kuliah
          </h1>

          <p 
            ref={el => { elementsRef.current[2] = el; }}
            className="text-base sm:text-lg md:text-xl text-foreground/60 max-w-xl mx-auto lg:mx-0 mb-8 lg:mb-12 font-medium leading-relaxed px-4 sm:px-0"
          >
            Sistem pemilihan dilakukan secara acak dan transparan menggunakan mekanisme Spin Wheel interaktif untuk Kelas 3KA25.
          </p>

          <div ref={el => { elementsRef.current[3] = el; }} className="w-full sm:w-auto px-6 sm:px-0">
            <MagneticButton 
              onClick={scrollToSpinWheel}
              className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white bg-foreground dark:bg-white dark:text-black rounded-full overflow-hidden transition-transform active:scale-95 shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)] w-full sm:w-auto"
            >
              <span className="relative z-10">Mulai Pemilihan</span>
              <ArrowDown size={20} className="relative z-10 group-hover:translate-y-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </MagneticButton>
          </div>
        </div>

        <div 
          ref={el => { elementsRef.current[4] = el; }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center pointer-events-none mt-12 lg:mt-0"
        >
          <div className="w-full max-w-[450px] lg:max-w-full xl:max-w-[500px] origin-center pointer-events-auto transform scale-95 lg:scale-90 xl:scale-95">
            <TutorialAnimation />
          </div>
        </div>

      </div>
    </section>
  );
}
