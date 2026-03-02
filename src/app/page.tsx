'use client';

import { useSpinWheel } from "@/hooks/useSpinWheel";
import SpinWheel from "@/components/SpinWheel";
import InputForm from "@/components/InputForm";
import ResultModal from "@/components/ResultModal";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import FAQ from "@/components/FAQ";
import { useState } from "react";

export default function Home() {
  const { 
    data, setData, 
    namesText, coursesText, updateText,
    startSpin, endSpin, 
    isSpinning, result, reset, removeResult,
    soundEnabled, setSoundEnabled
  } = useSpinWheel();

  const [targets, setTargets] = useState<{name: number, course: number} | null>(null);
  const [wheelsFinished, setWheelsFinished] = useState<{name: boolean, course: boolean}>({name: false, course: false});
  const [showModal, setShowModal] = useState(false);

  const handleSpinClick = () => {
    const res = startSpin();
    if (res) {
      setTargets({ name: res.nameTargetIndex, course: res.courseTargetIndex });
      setWheelsFinished({ name: false, course: false });
      setShowModal(false);
    }
  };

  const checkBothFinished = (type: 'name' | 'course') => {
    setWheelsFinished(prev => {
      const next = { ...prev, [type]: true };
      if (next.name && next.course && targets) {
        endSpin(targets.name, targets.course);
        setShowModal(true);
      }
      return next;
    });
  };

  const handleReset = () => {
    reset();
    setTargets(null);
    setWheelsFinished({name: false, course: false});
    setShowModal(false);
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen relative overflow-hidden bg-background w-full">
        <Hero />
        
        <Countdown />

        <section id="spin-wheel" className="container mx-auto px-6 lg:px-12 py-24 flex flex-col items-center z-10 relative">
          <header className="text-center mb-16 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
              Spin & <span className="text-gradient">Generate</span>
            </h2>
            <p className="text-foreground/60 text-lg">
              Masukkan daftar nama mahasiswa dan mata kuliah di bawah, lalu putar roda untuk menentukan Penanggung Jawab.
            </p>
          </header>

          <div className="flex flex-col xl:flex-row gap-12 w-full max-w-7xl justify-center items-center xl:items-start">
            <div className="w-full xl:w-1/3 order-2 xl:order-1">
              <InputForm 
                data={data}
                namesText={namesText}
                coursesText={coursesText}
                updateText={updateText}
                isSpinning={isSpinning}
                onSpin={handleSpinClick}
                onReset={handleReset}
              />
            </div>

            <div className="w-full xl:w-2/3 order-1 xl:order-2 flex flex-col md:flex-row gap-8 justify-center items-center">
              <SpinWheel 
                title="Mahasiswa"
                items={data.names}
                spinning={isSpinning}
                targetIndex={targets?.name ?? -1}
                onSpinEnd={() => checkBothFinished('name')}
                isSoundEnabled={soundEnabled}
                toggleSound={() => setSoundEnabled(!soundEnabled)}
              />
              
              <SpinWheel 
                title="Mata Kuliah"
                items={data.courses}
                spinning={isSpinning}
                targetIndex={targets?.course ?? -1}
                onSpinEnd={() => checkBothFinished('course')}
                isSoundEnabled={soundEnabled}
                toggleSound={() => setSoundEnabled(!soundEnabled)}
              />
            </div>
          </div>
        </section>

        <FAQ />

        <ResultModal 
          isOpen={showModal}
          name={result?.name || ''}
          course={result?.course || ''}
          onClose={() => {
             setShowModal(false);
             removeResult();
          }}
          isSoundEnabled={soundEnabled}
        />
      </main>
    </SmoothScroll>
  );
}
