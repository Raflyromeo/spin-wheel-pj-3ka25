'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Moon, Sun, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'Countdown', target: 'countdown' },
    { label: 'Spin Wheel', target: 'spin-wheel' },
    { label: 'FAQ', target: 'faq' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-background/80 backdrop-blur-md shadow-sm border-b border-foreground/5' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        <div 
          className="text-xl font-bold tracking-tight cursor-pointer flex items-center gap-2"
          onClick={() => scrollToSection('hero')}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
            <span className="font-extrabold text-sm">3K</span>
          </div>
          <span className="hidden sm:block">3KA25 PJ System</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-sm font-medium text-foreground/80">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button 
                  onClick={() => scrollToSection(link.target)}
                  className="hover:text-primary transition-colors hover:-translate-y-0.5 transform duration-200"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          
          <div className="w-px h-6 bg-foreground/20"></div>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-foreground/5 transition-colors text-foreground"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-foreground/5 transition-colors text-foreground"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-foreground/10 transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-64 border-b' : 'max-h-0 border-transparent'
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-4 text-base font-medium">
          {navLinks.map((link) => (
            <li key={`mobile-${link.label}`}>
              <button 
                onClick={() => scrollToSection(link.target)}
                className="w-full text-left py-2 hover:text-primary transition-colors text-foreground/80"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
