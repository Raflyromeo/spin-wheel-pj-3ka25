'use client';

import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const faqs = [
  {
    id: 'tentang',
    q: 'Apa itu sistem ini?',
    a: 'Sistem ini dirancang untuk memilih Penanggung Jawab (PJ) Mata Kuliah secara acak dan transparan untuk mahasiswa Kelas 4KA25. Pemilihan dilakukan menggunakan pemindaian daftar mahasiswa dengan hasil yang benar-benar acak.'
  },
  {
    id: 'cara',
    q: 'Bagaimana cara menggunakannya?',
    a: '1. Masukkan nama mata kuliah yang ingin dipilih PJ-nya.\n2. Klik tombol "Pilih!" dan tunggu proses pemindaian.\n3. Sistem akan memindai daftar dari atas ke bawah, lalu berhenti secara acak.\n4. Nama yang terpilih akan ditandai dengan ikon PJ dan nama mata kuliah.\n5. Pemilihan bisa diulang untuk mata kuliah berbeda.'
  },
  {
    id: 'looping',
    q: 'Apakah nama bisa keluar berkali-kali?',
    a: 'Ya! Sistem ini menggunakan mekanisme looping — semua 35 mahasiswa selalu ada dalam daftar dan bisa terpilih berulang kali. Ini memastikan setiap pemilihan benar-benar acak tanpa bias urutan.'
  },
  {
    id: 'adil',
    q: 'Apakah pemilihan ini adil?',
    a: 'Setiap pemilihan menggunakan fungsi random bawaan JavaScript yang tidak dapat diprediksi. Semua mahasiswa memiliki peluang yang sama untuk terpilih setiap kali proses dijalankan.'
  },
];

function ScrollRevealItem({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.6'] });
  const y       = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div ref={ref} style={{ y, opacity }} transition={{ delay }}>
      {children}
    </motion.div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headerProgress } = useScroll({ target: headerRef, offset: ['start 0.9', 'start 0.5'] });
  const headerY       = useTransform(headerProgress, [0, 1], [50, 0]);
  const headerOpacity = useTransform(headerProgress, [0, 1], [0, 1]);

  return (
    <section id="faq" className="neo-section py-20 bg-surface">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Header with scroll reveal */}
        <motion.div ref={headerRef} style={{ y: headerY, opacity: headerOpacity }} className="mb-12 flex flex-col items-center text-center">
          <div className="inline-block bg-foreground text-background text-xs font-black px-3 py-1.5 uppercase tracking-widest mb-4">
            Info
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tight mb-3">
            Informasi Sistem
          </h2>
          <p className="text-foreground/60 font-medium max-w-lg mx-auto">
            Pelajari cara kerja sistem pemilihan Penanggung Jawab Mata Kuliah Kelas 4KA25.
          </p>
        </motion.div>

        {/* Accordion with staggered reveal */}
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <ScrollRevealItem key={faq.id} delay={i * 0.1}>
                <div className={`neo-card transition-colors duration-200 overflow-hidden ${isOpen ? 'border-foreground' : 'bg-card'}`}>
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className={`w-full flex items-center justify-between px-6 md:px-8 py-5 md:py-6 text-left group transition-colors duration-200 ${isOpen ? 'bg-primary' : 'hover:bg-surface'}`}
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className={`text-2xl md:text-3xl font-black font-mono transition-colors ${isOpen ? 'text-background/50' : 'text-foreground/20 group-hover:text-primary/40'}`}>
                        0{i + 1}
                      </span>
                      <span className={`font-black text-base md:text-lg uppercase tracking-wide pr-4 transition-colors ${isOpen ? 'text-background' : 'text-foreground group-hover:text-primary'}`}>
                        {faq.q}
                      </span>
                    </div>
                    <div className={`w-10 h-10 border-3 flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${isOpen ? 'border-background text-background bg-background/10' : 'border-foreground text-foreground bg-surface group-hover:bg-primary group-hover:text-background group-hover:border-primary'}`}>
                      <ChevronDown size={20} strokeWidth={3} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="border-t-3 border-foreground px-6 md:px-8 py-6 md:py-8 bg-background relative"
                    >
                      {/* Decorative dots in the background of active content */}
                      <div className="absolute inset-0 bg-[radial-gradient(var(--color-foreground)_1px,transparent_1px)] bg-[size:12px_12px] opacity-10 pointer-events-none"></div>
                      
                      <div className="relative z-10 flex gap-4 md:gap-6">
                        {/* Spacer to align with text from header */}
                        <div className="hidden md:block w-[36px] flex-shrink-0"></div>
                        <p className="text-foreground/80 font-medium leading-relaxed text-sm md:text-base whitespace-pre-line border-l-4 border-primary pl-4 md:pl-6 py-1">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollRevealItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}
