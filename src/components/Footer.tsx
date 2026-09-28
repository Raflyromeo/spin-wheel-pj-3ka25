import React from 'react';
import { Instagram, Globe, Github, Linkedin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background border-t-3 border-foreground relative overflow-hidden">
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--color-background)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 mb-16">
          
          {/* Left / Brand Section */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="inline-block bg-primary text-background text-xs font-black px-3 py-1.5 uppercase tracking-widest mb-6">
              Sistem Pemilihan
            </div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4 uppercase text-background">
              Pemilihan<br />PJ Matkul
            </h3>
            <p className="text-background/60 font-bold text-sm leading-relaxed max-w-sm mb-6">
              Sistem pemilihan Penanggung Jawab Mata Kuliah secara acak dan transparan untuk Kelas 4KA25 · Sistem Informasi.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://sisfor-3ka25.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="neo-btn bg-background text-foreground hover:bg-surface text-xs font-black uppercase tracking-widest px-5 py-3 flex items-center gap-2"
              >
                <Globe size={14} /> Website Kelas
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="md:col-span-3">
            <h4 className="text-lg font-black uppercase tracking-widest mb-6 text-background">
              Navigasi Cepat
            </h4>
            <ul className="flex flex-col gap-4">
              {['Beranda', 'Jadwal', 'Pemilihan', 'Info'].map((item) => (
                <li key={item}>
                  <a 
                    href={item === 'Beranda' ? '#' : `#${item.toLowerCase() === 'jadwal' ? 'countdown' : item.toLowerCase()}`} 
                    className="text-sm font-bold text-background/60 hover:text-primary transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-200 ease-out text-primary">
                      <ArrowUpRight size={14} />
                    </span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programmer Section */}
          <div className="md:col-span-4">
            <h4 className="text-lg font-black uppercase tracking-widest mb-6 text-background">
              Dibuat Oleh
            </h4>
            {/* Neobrutalism Card for Profile */}
            <div className="bg-background text-foreground neo-card p-6 rotate-1 hover:rotate-0 transition-transform duration-300">
              <p className="font-black text-2xl uppercase tracking-tight mb-1 text-primary">Rafly Romeo</p>
              <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-5">Programmer & Developer</p>
              
              <div className="flex flex-col gap-3">
                <a 
                  href="https://instagram.com/rfly.romeo_" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 text-sm font-bold text-foreground/80 hover:text-primary transition-colors group"
                >
                  <div className="w-8 h-8 bg-surface border-2 border-foreground flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-colors">
                    <Instagram size={14} />
                  </div>
                  Instagram
                </a>
                <a 
                  href="https://linkedin.com/in/muhammadraflyromeonasution" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 text-sm font-bold text-foreground/80 hover:text-primary transition-colors group"
                >
                  <div className="w-8 h-8 bg-surface border-2 border-foreground flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-colors">
                    <Linkedin size={14} />
                  </div>
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/Raflyromeo" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 text-sm font-bold text-foreground/80 hover:text-primary transition-colors group"
                >
                  <div className="w-8 h-8 bg-surface border-2 border-foreground flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-colors">
                    <Github size={14} />
                  </div>
                  GitHub
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="w-full h-0.5 bg-background/20 mb-8"></div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-background/40 uppercase tracking-widest text-center sm:text-left">
          <p>© {currentYear} Kelas 4KA25. Dibuat dengan ♥ oleh Rafly Romeo</p>
          <p>Sistem Informasi · Universitas Gunadarma</p>
        </div>
      </div>
    </footer>
  );
}
