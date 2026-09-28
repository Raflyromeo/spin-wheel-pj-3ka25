'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowDown, Shuffle, Users, BookOpen, Trophy, Zap, Star, CheckCircle, ArrowRight, Timer, CalendarDays, MapPin } from 'lucide-react';

// ─── Marquee items (icons only, no names) ───────────────────────────────────
const MARQUEE_ITEMS = [
  { icon: Shuffle, label: 'Acak & Adil' },
  { icon: Users, label: 'Kelas 4KA25' },
  { icon: BookOpen, label: 'Mata Kuliah' },
  { icon: Trophy, label: 'Penanggung Jawab' },
  { icon: Zap, label: 'Transparan' },
  { icon: Star, label: 'Sistem Informasi' },
  { icon: CheckCircle, label: 'Pemilihan Resmi' },
  { icon: Shuffle, label: 'Acak & Adil' },
  { icon: Users, label: 'Kelas 4KA25' },
  { icon: BookOpen, label: 'Mata Kuliah' },
  { icon: Trophy, label: 'Penanggung Jawab' },
  { icon: Zap, label: 'Transparan' },
  { icon: Star, label: 'Sistem Informasi' },
  { icon: CheckCircle, label: 'Pemilihan Resmi' },
];

// ─── Countdown logic ─────────────────────────────────────────────────────────
function useCountdown() {
  const target = new Date('2026-09-28T15:00:00+07:00').getTime();
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  const [started, setStarted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setStarted(true); return; }
      setTime({ h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return { time, started, mounted };
}

const pad = (n: number) => String(n).padStart(2, '0');

// ─── Exported hero+countdown scroll component ────────────────────────────────
export function HeroScrollSection({ onScrollToPemilihan, onScrollToCountdown }: {
  onScrollToPemilihan: () => void;
  onScrollToCountdown: () => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div id="hero" ref={container} className="relative h-[200vh] bg-foreground">
      <Section1 scrollYProgress={scrollYProgress} onScrollToPemilihan={onScrollToPemilihan} onScrollToCountdown={onScrollToCountdown} />
      <Section2 scrollYProgress={scrollYProgress} onScrollToPemilihan={onScrollToPemilihan} />
    </div>
  );
}

// ─── Section 1 (Hero) ────────────────────────────────────────────────────────
function Section1({ scrollYProgress, onScrollToPemilihan, onScrollToCountdown }: {
  scrollYProgress: MotionValue<number>;
  onScrollToPemilihan: () => void;
  onScrollToCountdown: () => void;
}) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className="sticky top-0 h-screen bg-background border-b-3 border-foreground flex flex-col items-center justify-center overflow-hidden z-0"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-foreground)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10 pointer-events-none"></div>
      
      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center text-center p-8 mt-14 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="bg-foreground text-background text-xs font-black px-3 py-1.5 uppercase tracking-widest">
            Kelas 4KA25
          </span>
          <span className="text-xs font-bold text-foreground/50 uppercase tracking-widest">
            Sistem Informasi
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[1.0] tracking-tight mb-6 sm:mb-8 uppercase">
          Pemilihan <span className="text-primary">PJ</span><br />
          <span className="inline-block bg-foreground text-background px-3 mt-2">Mata Kuliah</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/60 font-medium max-w-2xl mb-8 sm:mb-10 leading-relaxed">
          Sistem pemilihan acak dan transparan untuk Kelas 4KA25. Semua mahasiswa berpeluang sama.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto">
          <button
            onClick={onScrollToPemilihan}
            className="neo-btn-primary flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 text-xs sm:text-sm md:text-base uppercase tracking-wider w-full sm:w-auto"
          >
            <span>Mulai Pemilihan</span>
            <ArrowDown size={18} />
          </button>
          <button
            onClick={onScrollToCountdown}
            className="neo-btn bg-card text-foreground flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 text-xs sm:text-sm md:text-base uppercase tracking-wider hover:bg-surface w-full sm:w-auto"
          >
            Lihat Jadwal
          </button>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 w-full flex-shrink-0 overflow-hidden border-t-3 border-foreground bg-foreground py-2.5 z-20">
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <span key={i} className="inline-flex items-center gap-3 px-8 text-xs font-black text-background uppercase tracking-widest">
                <Icon size={14} className="text-secondary flex-shrink-0" />
                {item.label}
                <span className="text-background/20 ml-2">|</span>
              </span>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

// ─── Section 2 (Countdown) ───────────────────────────────────────────────────
function Section2({ scrollYProgress, onScrollToPemilihan }: {
  scrollYProgress: MotionValue<number>;
  onScrollToPemilihan: () => void;
}) {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
  const { time, started, mounted } = useCountdown();

  return (
    <motion.section
      id="countdown"
      style={{ scale, rotate }}
      className="relative h-screen bg-background border-t-3 border-foreground flex flex-col items-center justify-center overflow-hidden z-10"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d1b3e1a_1px,transparent_1px),linear-gradient(to_bottom,#0d1b3e1a_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16 flex flex-col items-center w-full">
        {/* Header */}
        <div className="mb-10 text-center flex flex-col items-center">
          <div className="inline-block bg-foreground text-background text-xs font-black px-3 py-1.5 uppercase tracking-widest mb-4">
            Jadwal
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight mb-4">
            Pemilihan Dimulai
          </h2>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-foreground/60">
              <CalendarDays size={16} className="text-primary" />
              Senin, 28 September 2026
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-foreground/60">
              <Timer size={16} className="text-primary" />
              Pukul 15.00 WIB
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-foreground/60">
              <MapPin size={16} className="text-primary" />
              Kelas 4KA25
            </span>
          </div>
        </div>

        {/* Countdown card */}
        <div className="neo-card bg-card w-full max-w-4xl overflow-hidden shadow-[8px_8px_0px_var(--card-border)]">
          {started ? (
            /* Started state */
            <div className="flex flex-col md:flex-row">
              <div className="bg-primary md:w-56 flex-shrink-0 flex flex-col items-center justify-center p-6 sm:p-10 gap-4 border-b-3 md:border-b-0 md:border-r-3 border-foreground">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-background flex items-center justify-center bg-background/10">
                  <ArrowRight size={24} className="text-background sm:w-7 sm:h-7" strokeWidth={3} />
                </div>
                <span className="text-background font-black text-[10px] sm:text-xs uppercase tracking-widest text-center">Status Aktif</span>
              </div>
              <div className="flex-1 p-6 sm:p-8 md:p-12 flex flex-col justify-center gap-3 sm:gap-4 text-center md:text-left items-center md:items-start">
                <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-foreground/40">Pengumuman</p>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground uppercase leading-tight">
                  Pemilihan Telah<br className="hidden sm:block" /> <span className="text-primary">Dimulai!</span>
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-foreground/60 font-medium leading-relaxed max-w-md">
                  Gulir ke bawah untuk memulai pemilihan Penanggung Jawab Mata Kuliah secara acak.
                </p>
                <div className="mt-2 sm:mt-4">
                  <button
                    onClick={onScrollToPemilihan}
                    className="neo-btn-primary inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 text-xs sm:text-sm md:text-base font-black uppercase tracking-wide w-full sm:w-auto justify-center"
                  >
                    Mulai Sekarang <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Timer state */
            <div>
              <div className="p-5 sm:p-8 md:p-12">
                <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-8 flex-wrap">
                  {/* Hours */}
                  <div className="flex flex-col items-center gap-2 sm:gap-4">
                    <div className="w-16 h-20 sm:w-24 sm:h-28 md:w-32 md:h-36 lg:w-40 lg:h-44 neo-card bg-surface flex items-center justify-center">
                      <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-mono text-foreground tabular-nums">
                        {mounted ? pad(time.h) : '00'}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-widest text-foreground/50">Jam</span>
                  </div>
                  <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-foreground/20 -mt-4 sm:-mt-6 md:-mt-8">:</span>
                  {/* Minutes */}
                  <div className="flex flex-col items-center gap-2 sm:gap-4">
                    <div className="w-16 h-20 sm:w-24 sm:h-28 md:w-32 md:h-36 lg:w-40 lg:h-44 neo-card bg-surface flex items-center justify-center">
                      <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-mono text-foreground tabular-nums">
                        {mounted ? pad(time.m) : '00'}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-widest text-foreground/50">Menit</span>
                  </div>
                  <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-foreground/20 -mt-4 sm:-mt-6 md:-mt-8">:</span>
                  {/* Seconds */}
                  <div className="flex flex-col items-center gap-2 sm:gap-4">
                    <div className="w-16 h-20 sm:w-24 sm:h-28 md:w-32 md:h-36 lg:w-40 lg:h-44 neo-card bg-primary flex items-center justify-center">
                      <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-mono text-background tabular-nums">
                        {mounted ? pad(time.s) : '00'}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-widest text-foreground/50">Detik</span>
                  </div>
                </div>
              </div>
              <div className="border-t-3 border-foreground px-4 sm:px-8 py-4 sm:py-5 bg-surface flex items-center justify-between">
                <span className="text-xs md:text-sm font-bold text-foreground/40 uppercase tracking-widest">Waktu Tersisa</span>
                <span className="text-xs md:text-sm font-bold text-foreground/40 uppercase tracking-widest">Kelas 4KA25</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
