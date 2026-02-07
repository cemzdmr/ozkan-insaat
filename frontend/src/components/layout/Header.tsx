'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hakkımızda', href: '/hakkimizda' },
  { name: 'Projeler', href: '/projeler' },
  { name: 'Referanslar', href: '/referanslar' },
  { name: 'İletişim', href: '/iletisim' },
];

const languages = [
  { code: 'tr', name: 'TR' },
  { code: 'en', name: 'EN' },
  { code: 'ar', name: 'AR' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('tr');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-lg py-4'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="bg-white rounded-full px-8 py-4 shadow-md hover:shadow-lg transition-all w-64">
              <img 
                src="/ozkaninsaat-logo.png" 
                alt="Özkan İnşaat" 
                className="h-16 w-full object-contain"
                style={{ filter: 'none' }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="bg-white rounded-full px-12 py-8 shadow-md flex items-center justify-between w-[500px]">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-black hover:text-black transition-colors relative group"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <motion.div 
              className="hidden md:flex items-center relative overflow-visible"
              initial={false}
              whileHover="hover"
            >
              <motion.div 
                className="bg-yellow-400 rounded-full px-8 py-4 shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2 text-black font-medium cursor-pointer"
                variants={{
                  hover: { 
                    width: 'auto',
                    transition: { 
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }
                }}
                initial={{ width: '56px' }}
              >
                <span>{languages.find(l => l.code === currentLang)?.name}</span>
                
                {/* Expandable Language Options */}
                <motion.div
                  className="flex items-center gap-2 overflow-hidden"
                  variants={{
                    hover: { 
                      width: 'auto',
                      opacity: 1,
                      transition: { 
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1]
                      }
                    }
                  }}
                  initial={{ width: 0, opacity: 0 }}
                >
                  <span className="text-black/30">|</span>
                  {languages
                    .filter(lang => lang.code !== currentLang)
                    .map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setCurrentLang(lang.code)}
                        className="px-2 text-sm font-medium text-black hover:bg-black/10 rounded-full transition-colors"
                      >
                        {lang.name}
                      </button>
                    ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 transition-colors',
                isScrolled ? 'text-dark-900' : 'text-white'
              )}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white"
          >
            <div className="container-custom py-8 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-black hover:text-yellow-400 font-medium text-lg py-2 px-4 rounded-full hover:bg-gray-50 transition-all"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center gap-2 pt-6 border-t border-gray-200">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={cn(
                      'px-4 py-2 text-sm font-medium transition-all rounded-full',
                      currentLang === lang.code
                        ? 'bg-yellow-400 text-black'
                        : 'bg-gray-100 text-black hover:bg-gray-200'
                    )}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
