'use client';

import React from 'react';
import { SpinData } from '@/hooks/useSpinWheel';
import { RotateCcw, Play } from 'lucide-react';

const DEFAULT_NAMES = `ADIB SURYA SAPUTRA
AMAR FILASAFIAN RAHMANSYAH
ARIF MUHAMAD
CYNTHIA BELLA
DEVI ANDINI SASTRO
DEVIRA ANANDA KHASIKIN
DIKA ADNAR DARMAWAN
FLORENCE ANGELICA SANTOSO
INDAH NURVITASARI
KEVIN JONATHAN
KYLA CHRISANTA NAPITUPULU
LINTANG ENGGAL
MOHAMAD IRFAN MAULANA
MUHAMMAD ERVAN FARABI
MUHAMMAD GHIFARI PRATAMA
MUHAMMAD RAFLY ROMEO NASUTION
NADYA WULANDARI
NAILA
NAUFAL AMMAR FAKHRISYAH
NAZHMI DWIPUTRA EFENDI
NOVINUR AISYAH
NUR HIKMAH RAMADHANI
NUR LAILAA MUYASSARAH
PANDYA DHIRAPRADANA
PRADIPTA ZULVA NUR HANSYAH
PUTRA ADITYA HARTANTO
R NISRIINA HILDA SALBILLAH
RAYNA DEVIYANTI WIBOWO
RIFKY YUDISTIANSYAH
RISYALDI WILDAN PRATAMA
ROBBY ARDIANSYAH HUDAYA
SALSABILA KARTIKA
TASYA ELVYANTI
TRI WAHYUDI
VERA AMELIA PUTRI`;

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
  const loadDefaults = () => {
    updateText('names', DEFAULT_NAMES);
  };

  const canSpin = !isSpinning && data.names.length > 0 && data.courses.length > 0;

  return (
    <div className="neo-card bg-card flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b-3 border-foreground flex items-center justify-between bg-surface">
        <h2 className="text-sm font-black uppercase tracking-widest text-foreground">Pengaturan Roda</h2>
        <button
          onClick={loadDefaults}
          className="text-xs font-bold text-primary hover:text-foreground border-2 border-primary hover:border-foreground px-3 py-1.5 transition-colors duration-100 uppercase tracking-wide"
          disabled={isSpinning}
        >
          Muat Data Kelas
        </button>
      </div>

      <div className="p-6 flex flex-col gap-5">
        {/* Names textarea */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black uppercase tracking-widest text-foreground">
              Daftar Nama
            </label>
            <span className="text-xs font-bold text-foreground/40 font-mono">
              {data.names.length} nama
            </span>
          </div>
          <textarea
            value={namesText}
            onChange={(e) => updateText('names', e.target.value)}
            placeholder={'NAMA MAHASISWA\n(satu per baris)'}
            className="neo-input w-full h-36 p-3 text-sm font-mono text-foreground placeholder-foreground/30 bg-background resize-none focus:outline-none uppercase"
            disabled={isSpinning}
          />
          <p className="text-xs text-foreground/40 font-medium">
            Ketik satu nama per baris. Nama looping dari absen 1–{data.names.length || 35}.
          </p>
        </div>

        {/* Courses textarea */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black uppercase tracking-widest text-foreground">
              Nama Mata Kuliah
            </label>
            <span className="text-xs font-bold text-foreground/40 font-mono">
              {data.courses.length} matkul
            </span>
          </div>
          <textarea
            value={coursesText}
            onChange={(e) => updateText('courses', e.target.value)}
            placeholder={'NAMA MATA KULIAH\n(satu per baris)'}
            className="neo-input w-full h-28 p-3 text-sm font-mono text-foreground placeholder-foreground/30 bg-background resize-none focus:outline-none uppercase"
            disabled={isSpinning}
          />
        </div>

        {/* Error state */}
        {!canSpin && !isSpinning && (
          <div className="border-2 border-foreground bg-surface px-4 py-2">
            <p className="text-xs font-bold text-foreground/60 uppercase tracking-wide">
              ⚠ Masukkan minimal 1 nama dan 1 mata kuliah untuk memutar roda.
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={onReset}
            disabled={isSpinning}
            className="neo-btn flex-1 flex items-center justify-center gap-2 py-3.5 bg-background text-foreground hover:bg-surface text-sm font-black uppercase tracking-wide transition-colors duration-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>
          <button
            onClick={onSpin}
            disabled={!canSpin}
            className="neo-btn-primary flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-black uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            <Play size={15} className={isSpinning ? 'animate-spin' : ''} />
            <span>{isSpinning ? 'Berputar…' : 'Putar Roda!'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
