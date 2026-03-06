'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const colors = [
  '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', 
  '#facc15', '#10b981', '#14b8a6', '#6366f1'
];

interface MiniWheelProps {
  items: string[];
  rotation: number;
}

const MiniWheel = ({ items, rotation }: MiniWheelProps) => {
  const displayItems = items.length > 0 ? items : [''];
  const sliceDegree = 360 / displayItems.length;

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
    <div className="relative w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2.5 z-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_2px_4px_rgba(255,255,255,0.5)]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-foreground" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 24L0 0L24 0L12 24Z" />
        </svg>
      </div>

      <div className="w-full h-full rounded-full overflow-hidden border-2 sm:border-[3px] border-foreground/20 relative shadow-[0_0_20px_rgba(139,92,246,0.15)] dark:shadow-[0_0_20px_rgba(139,92,246,0.25)]">
        <motion.div 
          className="w-full h-full rounded-full absolute top-0 left-0"
          style={{ background: getConicGradient() }}
          animate={{ rotate: rotation }}
          transition={{ ease: "linear", duration: 0.1 }}
        >
          {displayItems.map((_, i) => (
            <div 
              key={`line-${i}`}
              className="absolute top-0 left-1/2 w-[1px] h-1/2 bg-white/40 origin-bottom"
              style={{ transform: `rotate(${i * sliceDegree}deg) translateX(-50%)` }}
            />
          ))}

          {displayItems.map((item, i) => {
            const rotateAngle = (i * sliceDegree) + (sliceDegree / 2);
            return (
               <div
                 key={`text-${i}`}
                 className="absolute top-0 left-1/2 h-1/2 flex items-start justify-center pt-2 origin-bottom"
                 style={{ transform: `rotate(${rotateAngle}deg) translateX(-50%)` }}
               >
                 <span 
                   className="text-white font-bold text-[6px] sm:text-[8px] md:text-[9px] [writing-mode:vertical-rl] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                 >
                   {item.length > 12 ? item.substring(0, 10) + '...' : item}
                 </span>
               </div>
            );
          })}
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full glass-panel z-10 flex items-center justify-center border-2 border-background shadow-xl">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-foreground/20 dark:bg-white shadow-inner"></div>
        </div>
      </div>
    </div>
  );
};

export default function TutorialAnimation() {
  const [names, setNames] = useState('');
  const [courses, setCourses] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rotation, setRotation] = useState(0);

  const fullNames = "Romeo\nPutra\nNazhmi";
  const fullCourses = "Overthinking\nAnti Deadline\nSKS Santai";

  useEffect(() => {
    let isActive = true;

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    const typeText = async (text: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
      for (let i = 0; i <= text.length; i++) {
        if (!isActive) break;
        setter(text.substring(0, i));
        await delay(50 + Math.random() * 50);
      }
    };

    const runSequence = async () => {
      while (isActive) {
        setNames('');
        setCourses('');
        setIsSpinning(false);
        setShowModal(false);
        setRotation(0);
        await delay(1000);

        if (!isActive) break;

        await typeText(fullNames, setNames);
        await delay(500);

        await typeText(fullCourses, setCourses);
        await delay(800);

        if (!isActive) break;

        setIsSpinning(true);
        let currentRot = 0;
        const spinInterval = setInterval(() => {
           currentRot += 30;
           if (isActive) setRotation(currentRot);
        }, 50);
        
        await delay(2000);
        clearInterval(spinInterval);
        
        if (!isActive) break;
        
        setIsSpinning(false);
        
        setShowModal(true);
        
        await delay(3500);
      }
    };

    runSequence();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="w-full min-h-[460px] md:min-h-0 md:h-[350px] lg:h-[400px] max-w-3xl mx-auto bg-foreground/5 rounded-2xl p-4 sm:p-6 lg:p-8 border border-foreground/10 flex flex-col relative overflow-hidden shadow-inner mt-4 sm:mt-6 lg:mt-8">
      <div className="flex flex-col md:flex-row gap-4 lg:gap-8 h-full w-full flex-1">
        <div className="w-full md:w-5/12 flex flex-col gap-2 lg:gap-4 h-[180px] md:h-full justify-center">
           <div className="flex-1 bg-background border border-foreground/10 rounded-lg p-2.5 sm:p-3 overflow-hidden shadow-inner relative flex flex-col">
             <span className="text-[9px] md:text-[10px] text-foreground/40 font-bold mb-1 uppercase tracking-widest leading-tight">Nama Mahasiswa</span>
             <span className="text-[10px] md:text-xs text-foreground/80 whitespace-pre-wrap font-mono uppercase leading-tight">
               {names}
               {names.length < fullNames.length && <span className="animate-pulse">|</span>}
             </span>
           </div>
           <div className="flex-1 bg-background border border-foreground/10 rounded-lg p-2.5 sm:p-3 overflow-hidden shadow-inner relative flex flex-col">
             <span className="text-[9px] md:text-[10px] text-foreground/40 font-bold mb-1 uppercase tracking-widest leading-tight">Mata Kuliah</span>
             <span className="text-[10px] md:text-xs text-foreground/80 whitespace-pre-wrap font-mono uppercase leading-tight">
               {courses}
               {names.length === fullNames.length && courses.length < fullCourses.length && <span className="animate-pulse">|</span>}
             </span>
           </div>
           
           <motion.button 
             animate={{ scale: isSpinning ? 0.95 : 1 }}
             className={`w-full py-2.5 md:py-3 lg:py-4 mt-2 rounded-xl text-xs font-bold transition-all duration-300 ${isSpinning ? 'bg-primary/50 text-white/50 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/30'}`}
           >
             {isSpinning ? 'BERPUTAR...' : 'SPIN WHEEL'}
           </motion.button>
        </div>

        <div className="relative w-full md:w-7/12 flex-1 flex items-center justify-center p-4 bg-background/50 rounded-xl border border-foreground/5 min-h-[160px] md:min-h-0">
           <div className="flex flex-row md:flex-col gap-6 lg:gap-8 items-center justify-center h-full">
             <MiniWheel 
               items={['Romeo', 'Putra', 'Nazhmi']} 
               rotation={rotation} 
             />
             <MiniWheel 
               items={['Overthinking', 'Anti Deadline', 'SKS Santai']} 
               rotation={-rotation} 
             />
           </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="absolute inset-2 sm:inset-4 lg:inset-8 glass-panel rounded-3xl p-4 sm:p-6 lg:p-10 flex flex-col items-center justify-center text-center shadow-2xl z-20 overflow-hidden border border-foreground/10"
          >
             <div className="absolute -top-10 -left-10 w-24 h-24 lg:w-32 lg:h-32 bg-primary/30 rounded-full blur-2xl"></div>
             <div className="absolute -bottom-10 -right-10 w-24 h-24 lg:w-32 lg:h-32 bg-secondary/30 rounded-full blur-2xl"></div>
             
             <div className="z-10 flex flex-col items-center w-full gap-2 lg:gap-4">
               <div className="space-y-1 lg:space-y-2">
                 <p className="text-foreground/60 text-[9px] md:text-[10px] lg:text-xs uppercase tracking-widest font-semibold">Selamat kepada</p>
                 <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground text-gradient pb-1">Romeo</h2>
               </div>

               <div className="opacity-80">
                 <p className="text-foreground/80 text-[10px] md:text-xs lg:text-sm">atas penunjukannya sebagai</p>
                 <p className="text-foreground font-semibold text-[11px] md:text-xs lg:text-sm mt-0.5 lg:mt-1">Penanggung Jawab (PJ)</p>
               </div>

               <div className="bg-foreground/5 border border-foreground/10 rounded-xl lg:rounded-2xl p-2 md:p-3 lg:p-4 w-full max-w-[160px] lg:max-w-[200px] mt-1 lg:mt-2 overflow-hidden relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 z-0"></div>
                 <div className="relative z-10">
                   <p className="text-foreground/60 text-[8px] md:text-[9px] lg:text-xs mb-1">Mata Kuliah</p>
                   <h3 className="text-sm md:text-base lg:text-lg font-bold text-foreground drop-shadow-sm">Overthinking</h3>
                 </div>
               </div>

               <div className="mt-2 md:mt-3 lg:mt-5">
                  <div className="px-4 py-2 md:px-6 md:py-2.5 lg:px-8 lg:py-3 bg-foreground text-background text-[10px] md:text-xs lg:text-sm font-bold rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    Tutup & Lanjutkan
                  </div>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
