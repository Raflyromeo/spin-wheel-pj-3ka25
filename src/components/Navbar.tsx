'use client';

import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from "framer-motion"
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
  {
    id: "home",
    title: "Home",
    target: "hero",
    icon: <Home className="w-5 h-5" />
  },
  {
    id: "countdown",
    title: "Countdown",
    target: "countdown",
    icon: <Clock className="w-5 h-5" />
  },
  {
    id: "spin-wheel",
    title: "Spin Wheel",
    target: "spin-wheel",
    icon: <CircleDot className="w-5 h-5" />
  },
  {
    id: "faq",
    title: "FAQ",
    target: "faq",
    icon: <HelpCircle className="w-5 h-5" />
  }
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const { theme, toggleTheme } = useTheme();
  
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100)
  })

  const scrollToSection = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    setTimeout(() => {
        const element = document.getElementById(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    closed: {
      y: 20,
      opacity: 0,
      scale: 0.8
    },
    open: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  }

  const hamburgerVariants: Variants = {
    normal: { rotate: 0, scale: 1 },
    scrolled: { rotate: 360, scale: 1.1 }
  }

  return (
    <>
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isScrolled ? -100 : 0,
          opacity: isScrolled ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 bg-background/0 backdrop-blur-md py-3`}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-24">
          <div className="flex items-center justify-between h-12">
            
            <motion.div
              className="flex-shrink-0 cursor-pointer text-xl font-bold tracking-tight flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => scrollToSection(e, 'hero')}
            >
              <Image 
                src="/3KA25_LOGO.png" 
                alt="3KA25 Logo" 
                width={32} 
                height={32} 
                className="w-8 h-8 object-contain"
              />
              <span className="hidden lg:block text-foreground text-lg ml-1">3KA25 PJ Spin Wheel</span>
            </motion.div>

            <div className="hidden lg:flex flex-1 items-center justify-end">
              <div className="flex items-baseline space-x-1 lg:space-x-2 mr-4 lg:mr-6">
                {defaultMenuItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="relative px-2"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href={`#${item.target}`}
                      onClick={(e) => scrollToSection(e, item.target)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-colors relative z-10"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                    {hoveredItem === item.id && (
                      <motion.div
                        layoutId="navbar-hover"
                        className="absolute inset-0 bg-foreground/5 rounded-md -z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
              
              <div className="w-px h-6 bg-foreground/20 mr-6"></div>

              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-foreground/5 transition-colors text-foreground"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-foreground/5 transition-colors text-foreground"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <motion.button
                onClick={toggleMenu}
                className="p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isScrolled && !isMenuOpen ? 1 : 0,
          opacity: isScrolled && !isMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-6 right-6 z-50 md:top-8 md:right-8"
      >
        <motion.button
          onClick={toggleMenu}
          className="w-14 h-14 bg-background/80 backdrop-blur-md text-foreground border border-foreground/10 rounded-full shadow-lg flex items-center justify-center hover:bg-background transition-colors"
          variants={hamburgerVariants}
          animate={isScrolled ? "scrolled" : "normal"}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="w-6 h-6 text-primary" />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60]"
              onClick={toggleMenu}
            />

            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-11/12 max-w-sm sm:max-w-md"
            >
              <div className="relative bg-background border border-foreground/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
                <motion.button
                  onClick={toggleMenu}
                  className="absolute top-4 right-4 p-2 text-foreground/60 hover:text-primary rounded-full hover:bg-foreground/5 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>

                <div className="flex items-center justify-between mb-8 pb-4 border-b border-foreground/10">
                    <span className="text-sm font-semibold tracking-wider text-foreground/40 uppercase">Navigation</span>
                    <button 
                        onClick={toggleTheme}
                        className="lg:hidden p-2 rounded-full hover:bg-foreground/5 transition-colors text-foreground"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                <div className="space-y-2">
                  {defaultMenuItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <a
                        href={`#${item.target}`}
                        onClick={(e) => scrollToSection(e, item.target)}
                        className="flex items-center space-x-4 p-4 rounded-xl hover:bg-foreground/5 transition-colors group"
                      >
                        <motion.div
                          className="text-foreground/50 group-hover:text-primary transition-colors"
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.icon}
                        </motion.div>
                        <span className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </span>
                      </a>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="absolute -top-2 -left-2 w-4 h-4 bg-primary rounded-full shadow-lg shadow-primary/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-2 -right-2 w-3 h-3 bg-secondary rounded-full shadow-lg shadow-secondary/20"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
