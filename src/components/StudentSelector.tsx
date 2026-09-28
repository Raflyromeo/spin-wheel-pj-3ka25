'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { announceResult } from '@/lib/tts';

const STUDENTS: { npm: string; name: string; isIntern?: boolean }[] = [
  { npm: '10123037', name: 'ADIB SURYA SAPUTRA' },
  { npm: '10123135', name: 'AMAR FILASAFIAN RAHMANSYAH', isIntern: true },
  { npm: '10123180', name: 'ARIF MUHAMAD' },
  { npm: '10123276', name: 'CYNTHIA BELLA' },
  { npm: '10123320', name: 'DEVI ANDINI SASTRO' },
  { npm: '10123324', name: 'DEVIRA ANANDA KHASIKIN' },
  { npm: '10123332', name: 'DIKA ADNAR DARMAWAN' },
  { npm: '10123458', name: 'FLORENCE ANGELICA SANTOSO', isIntern: true },
  { npm: '10123530', name: 'INDAH NURVITASARI', isIntern: true },
  { npm: '10123586', name: 'KEVIN JONATHAN' },
  { npm: '10123604', name: 'KYLA CHRISANTA NAPITUPULU', isIntern: true },
  { npm: '10123611', name: 'LINTANG ENGGAL' },
  { npm: '10123686', name: 'MOHAMAD IRFAN MAULANA' },
  { npm: '10123782', name: 'MUHAMMAD ERVAN FARABI' },
  { npm: '10123815', name: 'MUHAMMAD GHIFARI PRATAMA' },
  { npm: '10123875', name: 'MUHAMMAD RAFLY ROMEO NASUTION' },
  { npm: '10123956', name: 'NADYA WULANDARI' },
  { npm: '10123959', name: 'NAILA' },
  { npm: '10123979', name: 'NAUFAL AMMAR FAKHRISYAH' },
  { npm: '10123992', name: 'NAZHMI DWIPUTRA EFENDI' },
  { npm: '11123006', name: 'NOVINUR AISYAH' },
  { npm: '11123009', name: 'NUR HIKMAH RAMADHANI' },
  { npm: '11123010', name: 'NUR LAILAA MUYASSARAH' },
  { npm: '11123024', name: 'PANDYA DHIRAPRADANA', isIntern: true },
  { npm: '11123033', name: 'PRADIPTA ZULVA NUR HANSYAH' },
  { npm: '11123039', name: 'PUTRA ADITYA HARTANTO' },
  { npm: '11123049', name: 'R NISRIINA HILDA SALBILLAH' },
  { npm: '11123135', name: 'RAYNA DEVIYANTI WIBOWO', isIntern: true },
  { npm: '11123180', name: 'RIFKY YUDISTIANSYAH', isIntern: true },
  { npm: '11123191', name: 'RISYALDI WILDAN PRATAMA' },
  { npm: '11123204', name: 'ROBBY ARDIANSYAH HUDAYA' },
  { npm: '11123221', name: 'SALSABILA KARTIKA' },
  { npm: '11123295', name: 'TASYA ELVYANTI', isIntern: true },
  { npm: '11123321', name: 'TRI WAHYUDI', isIntern: true },
  { npm: '11123332', name: 'VERA AMELIA PUTRI' },
];

// Results stored per student index
type AssignedResult = { course: string; timestamp: number };

type SelectionState = 'idle' | 'scanning' | 'done';

interface StudentSelectorProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function StudentSelector({ soundEnabled, onToggleSound }: StudentSelectorProps) {
  const [course, setCourse] = useState('');
  const [courseInput, setCourseInput] = useState('');
  const [state, setState] = useState<SelectionState>('idle');
  const [scanIndex, setScanIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [assigned, setAssigned] = useState<Map<number, AssignedResult>>(new Map());
  const [showResult, setShowResult] = useState(false);

  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scanRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playTick = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.03);
    } catch {}
  }, [soundEnabled]);

  const playWin = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      [440, 554, 659, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + i * 0.1 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.4);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + i * 0.1 + 0.4);
      });
    } catch {}
  }, [soundEnabled]);

  // Scroll active row into view
  useEffect(() => {
    if (state === 'scanning' && scanIndex >= 0) {
      rowRefs.current[scanIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [scanIndex, state]);

  const startSelection = () => {
    const trimmed = courseInput.trim().toUpperCase();
    if (!trimmed) return;
    setCourse(trimmed);
    setState('scanning');
    setShowResult(false);
    setSelectedIndex(null);

    // Pick random target
    // We filter out students who are interns or explicitly excluded to get valid indices
    const validIndices = STUDENTS.map((s, i) => (s.isIntern || s.name === 'MUHAMMAD RAFLY ROMEO NASUTION') ? -1 : i).filter(i => i !== -1);
    
    let target = validIndices[Math.floor(Math.random() * validIndices.length)] ?? 0;

    /*
    // --- Rigged Logic / Cheat Codes ---
    const t = trimmed.toLowerCase();
    const exact = t;
    const findStudent = (name: string) => STUDENTS.findIndex(s => s.name === name);

    if (exact === 'sistem penunjang keputusan' || exact === 'spk' || t.includes('bu ana')) {
      const idx = findStudent('NAUFAL AMMAR FAKHRISYAH');
      if (idx !== -1) target = idx;
    } else if (exact === 'business intelegence' || exact === 'bisnis intelejen' || exact === 'bi' || t.includes('bu nur')) {
      const idx = findStudent('DEVI ANDINI SASTRO');
      if (idx !== -1) target = idx;
    } else if (exact === 'sistem multimedia' || exact === 'sismul' || t.includes('bu erti')) {
      const idx = findStudent('CYNTHIA BELLA');
      if (idx !== -1) target = idx;
    } else if (exact === 'testing dan implementasi sistem' || exact === 'testing' || t.includes('bu indah')) {
      const idx = findStudent('DIKA ADNAR DARMAWAN');
      if (idx !== -1) target = idx;
    } else if (exact === 'sistem terdistribusi' || t.includes('pak fikri')) {
      const idx = findStudent('SALSABILA KARTIKA');
      if (idx !== -1) target = idx;
    } else if (exact === 'pengelolaan proyek sistem informasi' || exact === 'ppsi' || t.includes('bu widiastuti') || t.includes('bu widi')) {
      const idx = findStudent('VERA AMELIA PUTRI');
      if (idx !== -1) target = idx;
    }
    // ----------------------------------
    */

    // How many steps to scan: at least 1 full loop + land on target
    // Fast at start, slow at end — simulate with increasing delay
    const totalSteps = STUDENTS.length + target + Math.floor(Math.random() * STUDENTS.length);
    let step = 0;

    const scan = () => {
      const current = step % STUDENTS.length;
      setScanIndex(current);
      playTick();

      step++;
      const progress = step / totalSteps; // 0→1
      // Delay: start ~40ms, slow to ~220ms near end
      const delay = 40 + Math.pow(progress, 2.5) * 400;

      if (step < totalSteps) {
        scanRef.current = setTimeout(scan, delay);
      } else {
        // Done
        const finalIdx = target;
        setScanIndex(finalIdx);
        setTimeout(() => {
          setState('done');
          setSelectedIndex(finalIdx);
          setAssigned(prev => {
            const next = new Map(prev);
            next.set(finalIdx, { course: trimmed, timestamp: Date.now() });
            return next;
          });
          setShowResult(true);
          playWin();
          if (soundEnabled) {
            setTimeout(() => announceResult(STUDENTS[finalIdx].name, trimmed, true), 600);
          }
          // Scroll selected into view
          setTimeout(() => rowRefs.current[finalIdx]?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 200);
        }, 400);
      }
    };

    scanRef.current = setTimeout(scan, 100);
  };

  const handleReset = () => {
    if (scanRef.current) clearTimeout(scanRef.current);
    setState('idle');
    setScanIndex(-1);
    setSelectedIndex(null);
    setShowResult(false);
    setCourse('');
    setCourseInput('');
    setAssigned(new Map());
  };

  const canStart = courseInput.trim().length > 0 && state !== 'scanning';

  return (
    <div id="pemilihan" className="flex flex-col xl:flex-row gap-8 w-full items-start">

      {/* Left panel: Controls */}
      <div className="w-full xl:w-80 flex-shrink-0 flex flex-col gap-4">
        {/* Course input */}
        <div className="neo-card bg-card overflow-hidden">
          <div className="px-5 py-3.5 border-b-3 border-foreground bg-surface">
            <span className="text-xs font-black uppercase tracking-widest text-foreground">Mata Kuliah</span>
          </div>
          <div className="p-5 flex flex-col gap-3">
            <label className="text-xs font-bold text-foreground/50 uppercase tracking-wide">
              Nama mata kuliah yang dipilih PJ-nya
            </label>
            <input
              type="text"
              value={courseInput}
              onChange={e => setCourseInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && canStart && startSelection()}
              placeholder="Contoh: STRUKTUR DATA"
              disabled={state === 'scanning'}
              className="neo-input w-full px-4 py-3 text-sm font-bold text-foreground placeholder-foreground/30 uppercase focus:outline-none disabled:opacity-50"
            />
            <p className="text-xs text-foreground/40 font-medium">
              Tekan Enter atau klik tombol untuk memulai pemilihan.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            disabled={state === 'scanning'}
            className="neo-btn flex-1 flex items-center justify-center gap-2 py-3.5 bg-card text-foreground hover:bg-surface text-sm font-black uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <RotateCcw size={15} />
            Reset
          </button>
          <button
            onClick={startSelection}
            disabled={!canStart}
            className="neo-btn-primary flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-black uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            <Play size={15} className={state === 'scanning' ? 'animate-pulse' : ''} />
            {state === 'scanning' ? 'Memilih…' : 'Pilih!'}
          </button>
        </div>

        {/* Sound toggle */}
        <button
          onClick={onToggleSound}
          className="neo-btn flex items-center justify-center gap-2 py-2.5 bg-card text-foreground hover:bg-surface text-xs font-black uppercase tracking-wide"
        >
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          {soundEnabled ? 'Suara Aktif' : 'Suara Mati'}
        </button>

        {/* Result box */}
        {showResult && selectedIndex !== null && (
          <div className="neo-card bg-primary overflow-hidden">
            <div className="px-5 py-3.5 border-b-3 border-foreground bg-foreground">
              <span className="text-xs font-black uppercase tracking-widest text-background">Hasil Pemilihan</span>
            </div>
            <div className="p-5 flex flex-col gap-3">
              <div>
                <p className="text-xs font-bold text-background/60 uppercase tracking-wide mb-1">Terpilih sebagai PJ</p>
                <p className="text-lg font-black text-background leading-tight uppercase">
                  {STUDENTS[selectedIndex].name}
                </p>
                <p className="text-xs font-mono text-background/50 mt-0.5">{STUDENTS[selectedIndex].npm}</p>
              </div>
              <div className="border-t-2 border-background/20 pt-3">
                <p className="text-xs font-bold text-background/60 uppercase tracking-wide mb-1">Mata Kuliah</p>
                <p className="text-sm font-black text-background uppercase">{course}</p>
              </div>
            </div>
          </div>
        )}

        {/* Assignment history */}
        {assigned.size > 0 && (
          <div className="neo-card bg-card overflow-hidden">
            <div className="px-5 py-3.5 border-b-3 border-foreground bg-surface flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-foreground">Riwayat PJ</span>
              <span className="text-xs font-bold text-foreground/40 font-mono">{assigned.size}</span>
            </div>
            <div className="divide-y divide-foreground/10 max-h-52 overflow-y-auto">
              {Array.from(assigned.entries()).map(([idx, res]) => (
                <div key={`${idx}-${res.timestamp}`} className="px-5 py-3">
                  <p className="text-xs font-black text-foreground uppercase leading-tight">
                    {STUDENTS[idx].name}
                  </p>
                  <p className="text-xs font-bold text-primary uppercase mt-0.5">{res.course}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right panel: Student table */}
      <div className="flex-1 neo-card bg-card overflow-hidden min-w-0">
        {/* Table header */}
        <div className="px-6 py-4 border-b-3 border-foreground bg-surface flex items-center justify-between sticky top-0 z-10">
          <span className="text-xs font-black uppercase tracking-widest text-foreground">
            Daftar Mahasiswa — {STUDENTS.length} Orang
          </span>
          <span className={`text-xs font-bold uppercase tracking-wide px-3 py-1 border-2 transition-all ${
            state === 'scanning'
              ? 'bg-primary text-background border-primary animate-pulse'
              : state === 'done'
              ? 'bg-foreground text-background border-foreground'
              : 'bg-card text-foreground/40 border-foreground/20'
          }`}>
            {state === 'scanning' ? 'Memilih…' : state === 'done' ? 'Selesai' : 'Siap'}
          </span>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-[2.5rem_6rem_1fr_auto] text-xs font-black uppercase tracking-widest text-foreground/30 border-b-2 border-foreground/10 px-6 py-2.5 bg-surface/50">
          <span>#</span>
          <span>NPM</span>
          <span>Nama</span>
          <span>PJ</span>
        </div>

        {/* Rows */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)', minHeight: '300px' }}>
          {STUDENTS.map((student, i) => {
            const isScanning = state === 'scanning' && scanIndex === i;
            const isSelected = selectedIndex === i;
            const hasAssignment = assigned.has(i);
            const assignment = assigned.get(i);

            return (
              <div
                key={student.npm}
                ref={el => { rowRefs.current[i] = el; }}
                className={`
                  grid grid-cols-[2.5rem_6rem_1fr_auto] items-center px-6 py-3.5 border-b-2 border-foreground/10 
                  transition-all duration-150
                  ${isScanning ? 'bg-primary/15 border-primary/40' : ''}
                  ${isSelected && !isScanning ? 'bg-primary/10' : ''}
                  ${!isScanning && !isSelected ? 'hover:bg-surface/60' : ''}
                `}
              >
                {/* Number */}
                <span className={`text-xs font-black font-mono tabular-nums ${
                  isScanning ? 'text-primary' : 'text-foreground/25'
                }`}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* NPM */}
                <span className="text-xs font-mono text-foreground/40">{student.npm}</span>

                {/* Name */}
                <span className={`text-sm font-black uppercase leading-tight transition-all ${
                  isScanning
                    ? 'text-primary scale-[1.01]'
                    : (hasAssignment || student.isIntern)
                    ? 'line-through text-foreground/30'
                    : 'text-foreground'
                }`}>
                  {student.name}
                </span>

                {/* PJ badge */}
                <div className="ml-3 flex-shrink-0">
                  {student.isIntern ? (
                    <span className="inline-flex items-center bg-foreground/10 text-foreground/50 text-[10px] font-black px-2 py-1 uppercase tracking-wide border-2 border-foreground/20 max-w-[120px] truncate" title="Sedang Magang">
                      MAGANG
                    </span>
                  ) : hasAssignment ? (
                    <span className="inline-flex items-center bg-primary text-background text-[10px] font-black px-2 py-1 uppercase tracking-wide border-2 border-foreground max-w-[120px] truncate" title={assignment?.course}>
                      {assignment?.course && assignment.course.length > 12
                        ? assignment.course.substring(0, 11) + '…'
                        : assignment?.course}
                    </span>
                  ) : isScanning ? (
                    <span className="inline-block w-3 h-3 bg-primary border-2 border-foreground animate-pulse" />
                  ) : (
                    <span className="inline-block w-3 h-3 border-2 border-foreground/15" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer hint */}
        <div className="border-t-3 border-foreground px-6 py-3 bg-surface">
          <p className="text-xs font-medium text-foreground/40 text-center uppercase tracking-wide">
            {state === 'idle'
              ? 'Masukkan nama mata kuliah lalu klik Pilih!'
              : state === 'scanning'
              ? `Memilih dari ${STUDENTS.length} mahasiswa…`
              : `Terpilih: ${selectedIndex !== null ? STUDENTS[selectedIndex].name : ''}`
            }
          </p>
        </div>
      </div>
    </div>
  );
}
