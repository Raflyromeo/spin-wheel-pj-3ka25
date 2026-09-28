'use client';

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, Clock, CircleDot, HelpCircle, Moon, Sun } from "lucide-react"
import { useTheme } from './ThemeProvider';
import Image from 'next/image';

interface MenuItem {
  id: string
  title: string
  target: string
  icon: React.ReactNode
}

const defaultMenuItems: MenuItem[] = [
  { id: "home", title: "Beranda", target: "hero", icon: <Home className="w-4 h-4" /> },
  { id: "countdown", title: "Jadwal", target: "countdown", icon: <Clock className="w-4 h-4" /> },
  { id: "pemilihan", title: "Pemilihan", target: "pemilihan", icon: <CircleDot className="w-4 h-4" /> },
  { id: "faq", title: "Info", target: "faq", icon: <HelpCircle className="w-4 h-4" /> },
]


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(target);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b-3 border-foreground">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-14">
            
            {/* Logo */}
            <button
              className="flex items-center gap-2 font-bold text-foreground hover:opacity-80 transition-opacity"
              onClick={(e) => scrollToSection(e, 'hero')}
            >
              <div className="w-8 h-8 border-2 border-foreground flex items-center justify-center bg-primary overflow-hidden">
                <Image 
                  src="/3KA25_LOGO.png" 
                  alt="4KA25" 
                  width={28} 
                  height={28} 
                  className="w-7 h-7 object-contain"
                />
              </div>
              <span className="hidden sm:block text-sm font-bold tracking-wide uppercase">4KA25 Spin Wheel</span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {defaultMenuItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.target}`}
                  onClick={(e) => scrollToSection(e, item.target)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-foreground hover:bg-primary hover:text-white border-2 border-transparent hover:border-foreground transition-all duration-100 uppercase tracking-wide"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="neo-btn w-9 h-9 flex items-center justify-center bg-card text-foreground hover:bg-primary hover:text-white transition-colors duration-100"
                aria-label="Ganti Tema"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden neo-btn w-9 h-9 flex items-center justify-center bg-card text-foreground"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-foreground/40 z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="fixed top-14 right-0 bottom-0 w-72 bg-background border-l-3 border-foreground z-40 lg:hidden overflow-y-auto"
            >
              <div className="p-4 flex flex-col gap-1">
                <p className="text-xs font-bold tracking-widest text-foreground/40 uppercase px-2 py-3 border-b-2 border-foreground/10 mb-2">
                  Navigasi
                </p>
                {defaultMenuItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.target}`}
                    onClick={(e) => scrollToSection(e, item.target)}
                    className="flex items-center gap-3 px-4 py-3 text-base font-bold text-foreground hover:bg-primary hover:text-white border-2 border-transparent hover:border-foreground transition-all duration-100 uppercase tracking-wide"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
