import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-background border-t border-foreground/10 pt-16 pb-8 relative z-10 selection:bg-primary/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-12">
          
          <div className="max-w-sm">
            <h3 className="text-xl font-bold tracking-tight mb-2 text-foreground">
              Pemilihan Penanggung Jawab<br/>Mata Kuliah
            </h3>
            <p className="text-foreground/60 font-medium">Kelas 3KA25</p>
            <p className="text-foreground/50 text-sm mt-1">Sistem Informasi</p>
          </div>

          {/* Right Section */}
          <div className="flex flex-col md:text-right">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground/40 mb-4">Explore More</h4>
            <div className="flex flex-wrap md:justify-end gap-x-6 gap-y-2 text-sm font-medium text-foreground/70">
              <span className="hover:text-primary transition-colors cursor-default">Instagram</span>
              <span className="hover:text-primary transition-colors cursor-default">Website 3KA25</span>
            </div>
          </div>
          
        </div>

        <div className="w-full h-px bg-foreground/10 mb-8"></div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-medium text-foreground/40 gap-4">
          <p>© 2026 Kelas 3KA25. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors relative group">
              Privacy Policy
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="hover:text-foreground transition-colors relative group">
              Terms of Service
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
