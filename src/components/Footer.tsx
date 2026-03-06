import React from 'react';
import { Instagram, Globe } from 'lucide-react';
import GsapScrollReveal from './GsapScrollReveal';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-foreground/[0.02] dark:bg-background/40 border-t border-foreground/10 pt-16 pb-8 relative z-10 selection:bg-primary/30">
      <GsapScrollReveal>
        <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-12">
          
          <div className="max-w-sm">
            <h3 className="text-xl font-bold tracking-tight mb-2 text-foreground">
              Pemilihan Penanggung Jawab<br/>Mata Kuliah
            </h3>
            <p className="text-foreground/60 font-medium">Kelas 3KA25</p>
            <p className="text-foreground/50 text-sm mt-1">Sistem Informasi</p>
          </div>

          <div className="flex flex-col md:text-right">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground/40 mb-4">Explore More</h4>
            <div className="flex flex-wrap md:justify-end gap-x-6 gap-y-2 text-sm font-medium text-foreground/70">
              <a href="https://www.instagram.com/otherside.ka25_/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
              <a href="https://sisfor-3ka25.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                Website 3KA25
              </a>
            </div>
          </div>
          
        </div>

        <div className="w-full h-px bg-foreground/10 mb-8"></div>

        <div className="flex flex-col sm:flex-row justify-center items-center text-xs font-medium text-foreground/40 gap-4">
          <p>© {currentYear} Kelas 3KA25. All rights reserved.</p>
        </div>
      </div>
      </GsapScrollReveal>
    </footer>
  );
}
