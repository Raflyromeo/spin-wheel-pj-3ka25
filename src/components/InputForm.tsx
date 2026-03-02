'use client';

import React, { useState } from 'react';
import MagneticButton from './MagneticButton';
import { SpinData } from '@/hooks/useSpinWheel';

interface InputFormProps {
  onSpin: () => void;
  onReset: () => void;
  isSpinning: boolean;
  data: SpinData;
  namesText: string;
  coursesText: string;
  updateText: (type: 'names' | 'courses', text: string) => void;
}

export default function InputForm({ onSpin, onReset, isSpinning, data, namesText, coursesText, updateText }: InputFormProps) {
  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col gap-6 w-full max-w-xl mx-auto z-10 relative">
      <h2 className="text-2xl font-bold text-center text-gradient mb-2">Input Data</h2>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300 ml-1">Nama Mahasiswa (1 per baris)</label>
          <textarea 
            value={namesText}
            onChange={(e) => updateText('names', e.target.value)}
            placeholder="Muhammad Rafly Romeo Nasution"
            className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            disabled={isSpinning}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300 ml-1">Nama Mata Kuliah (1 per baris)</label>
          <textarea 
            value={coursesText}
            onChange={(e) => updateText('courses', e.target.value)}
            placeholder="Struktur Data yang Tidak Terbalas"
            className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            disabled={isSpinning}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <MagneticButton 
          onClick={onReset}
          disabled={isSpinning}
          className="flex-1 py-3 px-6 rounded-xl border border-white/10 hover:bg-white/5 active:scale-95 text-white/80 font-medium"
        >
          Reset
        </MagneticButton>
        <MagneticButton 
          onClick={onSpin}
          disabled={isSpinning || data.names.length === 0 || data.courses.length === 0}
          className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 active:scale-95 font-bold text-white shadow-lg shadow-primary/20"
        >
          {isSpinning ? 'Berputar...' : 'Spin Wheel'}
        </MagneticButton>
      </div>
      
      {(data.names.length === 0 || data.courses.length === 0) && (
        <p className="text-sm text-center text-rose-400 mt-2">
          Silakan masukkan minimal 1 nama dan 1 mata kuliah
        </p>
      )}
    </div>
  );
}
