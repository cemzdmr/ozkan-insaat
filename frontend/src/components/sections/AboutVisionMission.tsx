'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const sections = [
  {
    title: 'Biz Kimiz',
    content: 'Özkan İnşaat, 30 yılı aşkın deneyimi ile inşaat ve hafriyat sektöründe öncü konumdadır. Müşteri memnuniyetini ön planda tutarak, her projede mükemmelliği hedefleriz.',
    direction: 'left',
  },
  {
    title: 'Vizyonumuz',
    content: 'Türkiye\'nin önde gelen inşaat ve hafriyat şirketi olarak, sürdürülebilir ve yenilikçi projelerle sektöre değer katmayı hedefliyoruz.',
    direction: 'right',
  },
  {
    title: 'Misyonumuz',
    content: 'Kalite, güvenilirlik ve müşteri odaklı yaklaşımla, yaşam alanlarını dönüştüren projeler gerçekleştirmek ve sektörde standartları yükseltmektir.',
    direction: 'left',
  },
];

export default function AboutVisionMission() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-16 md:py-24 text-white overflow-hidden" ref={ref}>
      {/* Background Image with Blur */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          alt="Özkan İnşaat"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      <div className="container-custom relative z-10">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ 
              x: section.direction === 'left' ? -100 : 100, 
              opacity: 0 
            }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{
              duration: 1,
              delay: index * 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`mb-12 md:mb-16 last:mb-0 ${
              section.direction === 'right' ? 'text-right ml-auto' : 'text-left'
            } max-w-2xl md:max-w-3xl`}
          >
            {/* Animated Badge */}
            <div className={`mb-6 ${section.direction === 'right' ? 'flex justify-end' : ''}`}>
              <div className="relative inline-block overflow-hidden rounded-full border border-yellow-400 px-3 py-1.5 w-32 sm:w-40">
                <motion.div
                  animate={{
                    x: ['-110%', '10%', '-100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0,
                  }}
                  className="relative z-10 flex gap-8"
                >
                  <span className="text-xs sm:text-sm font-bold text-yellow-400 whitespace-nowrap">{section.title}</span>
                  <span className="text-xs sm:text-sm font-bold text-yellow-400 whitespace-nowrap">{section.title}</span>
                  <span className="text-xs sm:text-sm font-bold text-yellow-400 whitespace-nowrap">{section.title}</span>
                </motion.div>
              </div>
            </div>

            {/* Animated Content */}
            <motion.p
              initial={{ 
                x: section.direction === 'left' ? -30 : 30, 
                opacity: 0 
              }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.3 + 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-base md:text-lg text-gray-200 leading-relaxed"
            >
              {section.content}
            </motion.p>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.3 + 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`h-0.5 w-20 md:w-32 bg-yellow-400 mt-4 md:mt-6 ${
                section.direction === 'right' ? 'ml-auto origin-right' : 'origin-left'
              }`}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
