'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import TutorialAnimation from './TutorialAnimation';

interface TabList {
  id: string;
  title: string;
  content: React.ReactNode;
}

const faqs: TabList[] = [
  {
    id: 'tentang',
    title: 'Tentang Sistem',
    content: (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Tentang Sistem</h3>
        <p className="text-foreground/70 leading-relaxed">
          Sistem ini dirancang untuk memilih Penanggung Jawab (PJ) Mata Kuliah secara adil dan transparan untuk mahasiswa Kelas 3KA25.
        </p>
        <p className="text-foreground/70 leading-relaxed">
          Pemilihan menggunakan mekanisme <strong className="text-foreground font-semibold">spin wheel acak</strong> dengan antarmuka yang modern, memberikan pengalaman interaktif sebelum hasil final ditetapkan.
        </p>
      </div>
    )
  },
  {
    id: 'cara',
    title: 'Cara Menggunakan',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Panduan Penggunaan</h3>
          <p className="text-foreground/70 leading-relaxed">
            Perhatikan simulasi interaktif di bawah ini untuk melihat bagaimana cara menggunakan sistem mulai dari input data hingga hasil pemilihan keluar.
          </p>
        </div>
        <TutorialAnimation />
      </div>
    )
  },
];

export default function FAQ() {
  const [activeTab, setActiveTab] = useState<string>(faqs[0].id);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { autoAlpha: 0, x: 20 }, 
        { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-foreground/5 dark:bg-background/40">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-24 z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            Informasi Sistem
          </h2>
          <p className="text-foreground/50 max-w-2xl mx-auto">
            Pelajari lebih lanjut tentang bagaimana sistem pemilihan Penanggung Jawab Kelas 3KA25 ini bekerja.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 max-w-5xl mx-auto">
          
          <div className="w-full md:w-1/3 flex border-b md:border-b-0 md:border-l border-foreground/10 overflow-x-auto md:overflow-visible hide-scrollbar">
            <div className="flex flex-row md:flex-col w-full">
              {faqs.map((faq) => {
                const isActive = activeTab === faq.id;
                return (
                  <button
                    key={faq.id}
                    onClick={() => setActiveTab(faq.id)}
                    className={`relative text-left px-6 py-4 transition-all duration-300 whitespace-nowrap md:whitespace-normal
                      ${isActive 
                        ? 'text-primary font-bold bg-primary/5' 
                        : 'text-foreground/60 font-medium hover:text-foreground hover:bg-foreground/5'
                      }
                    `}
                  >
                    {isActive && (
                       <span className="absolute bottom-0 left-0 w-full h-0.5 md:w-0.5 md:h-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                    )}
                    {faq.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full md:w-2/3 min-h-[300px]" ref={contentRef}>
            <div className="glass-panel p-8 sm:p-10 rounded-3xl h-full shadow-lg">
              {faqs.find(f => f.id === activeTab)?.content}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
