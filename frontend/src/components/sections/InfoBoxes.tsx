'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import Link from 'next/link';

interface InfoBox {
  title: string;
  description: string;
  icon: ReactNode;
  direction: string;
  color: string;
}

const infoBoxes: InfoBox[] = [
  {
    title: 'Yüksek Kalite',
    description: 'Lüks ve zarif tasarımlar, çevre mimarisi ile uyumlu yaşam alanları sunar.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    direction: 'left',
    color: 'from-yellow-400 to-lime-400',
  },
  {
    title: 'Proje Yönetimi',
    description: 'Her projede profesyonel ekibimizle mükemmel yönetim ve koordinasyon.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    direction: 'right',
    color: 'from-blue-400 to-cyan-400',
  },
  {
    title: 'Mimari & Tasarım',
    description: 'Modern ve işlevsel tasarımlar ile hayallerinizdeki yaşam alanları.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    direction: 'bottom',
    color: 'from-purple-400 to-pink-400',
  },
];

export default function InfoBoxes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const getInitialPosition = (direction: string) => {
    switch (direction) {
      case 'left':
        return { x: -100, opacity: 0 };
      case 'right':
        return { x: 100, opacity: 0 };
      case 'bottom':
        return { y: 100, opacity: 0 };
      default:
        return { opacity: 0 };
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white" ref={ref}>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {infoBoxes.map((box, index) => (
            <motion.div
              key={index}
              initial={getInitialPosition(box.direction)}
              animate={isInView ? { x: 0, y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative"
            >
              <Link href="/projeler">
                <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-8 h-full hover:border-yellow-400 hover:shadow-xl transition-all duration-500">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl bg-yellow-400 text-black mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    {box.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-black transition-all duration-300">
                    {box.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
                    {box.description}
                  </p>

                  {/* Hover Button */}
                  <div className="flex items-center text-gray-900 font-semibold group-hover:text-yellow-400 transition-colors text-sm md:text-base">
                    <span className="mr-2">Projeler</span>
                    <svg 
                      className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-2 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
