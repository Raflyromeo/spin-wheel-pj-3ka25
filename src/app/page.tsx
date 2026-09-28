'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroScrollSection } from '@/components/Hero';
import FAQ from '@/components/FAQ';
import StudentSelector from '@/components/StudentSelector';

// ── Lightweight scroll-reveal wrapper ─────────────────────────────────────────
function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.4'] });
  const y       = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="min-h-screen bg-background w-full">

      {/* ── Hero + Countdown scroll pair ── */}
      <HeroScrollSection
        onScrollToPemilihan={() => scrollTo('pemilihan')}
        onScrollToCountdown={() => scrollTo('countdown')}
      />

      {/* ── Pemilihan section ── */}
      <section id="pemilihan" className="neo-section py-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <ScrollReveal className="mb-12 flex flex-col items-center text-center">
            <div className="inline-block bg-foreground text-background text-xs font-black px-3 py-1.5 uppercase tracking-widest mb-4">
              Pemilihan
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tight mb-3">
              Pilih Penanggung Jawab
            </h2>
            <p className="text-foreground/60 font-medium max-w-lg mx-auto">
              Masukkan nama mata kuliah, lalu klik tombol pilih. Sistem akan memindai daftar dan berhenti secara acak.
            </p>
          </ScrollReveal>

          <StudentSelector
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled(p => !p)}
          />
        </div>
      </section>

      <FAQ />
    </main>
  );
}
