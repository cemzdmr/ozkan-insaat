'use client';

import { useEffect, useRef, useState } from 'react';
import { FadeIn } from '@/components/ui/AnimatedSection';
import { useInView } from 'react-intersection-observer';

const stats = [
  { value: 85, label: 'Dünya Çapında Ofis', suffix: '+' },
  { value: 1500, label: 'Çalışan', suffix: '' },
  { value: 248, label: 'Tamamlanan Proje', suffix: '+' },
  { value: 30, label: 'Yıllık Tecrübe', suffix: '+' },
];

function Counter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      let startTime: number | null = null;
      const startValue = 0;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOutQuad = (t: number) => t * (2 - t);
        const currentValue = Math.floor(startValue + (end - startValue) * easeOutQuad(progress));
        
        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function Statistics() {
  return (
    <section className="section-spacing bg-white text-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <FadeIn className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-yellow-400">
            Rakamlarla Özkan İnşaat
          </h2>
          <p className="text-base md:text-lg text-black max-w-2xl mx-auto">
            Güvenilir ve kaliteli hizmet anlayışımızın sonuçları
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1} className="text-center group">
              <div className="bg-white rounded-2xl p-6 md:p-8 hover:bg-yellow-400 transition-all duration-300 hover:scale-105 border-2 border-gray-200 hover:border-yellow-400 h-full flex flex-col justify-between min-h-[180px]">
                <div className="mb-2 text-xs md:text-sm font-semibold text-gray-500 group-hover:text-black uppercase tracking-wider">
                  {stat.label.split(' ')[0]}
                </div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-black">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm md:text-base text-gray-600 group-hover:text-black mt-2">{stat.label.split(' ').slice(1).join(' ')}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
