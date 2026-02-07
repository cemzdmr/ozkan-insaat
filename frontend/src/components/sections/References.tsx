'use client';

import { FadeIn } from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';

const references = [
  { name: 'Şirket 1', logo: 'https://via.placeholder.com/200x100/333/fff?text=Logo+1' },
  { name: 'Şirket 2', logo: 'https://via.placeholder.com/200x100/333/fff?text=Logo+2' },
  { name: 'Şirket 3', logo: 'https://via.placeholder.com/200x100/333/fff?text=Logo+3' },
  { name: 'Şirket 4', logo: 'https://via.placeholder.com/200x100/333/fff?text=Logo+4' },
  { name: 'Şirket 5', logo: 'https://via.placeholder.com/200x100/333/fff?text=Logo+5' },
  { name: 'Şirket 6', logo: 'https://via.placeholder.com/200x100/333/fff?text=Logo+6' },
  { name: 'Şirket 7', logo: 'https://via.placeholder.com/200x100/333/fff?text=Logo+7' },
  { name: 'Şirket 8', logo: 'https://via.placeholder.com/200x100/333/fff?text=Logo+8' },
];

export default function References() {
  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        <FadeIn className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Referanslarımız</h2>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto">
            Türkiye'nin önde gelen kurumları ile çalışmaktan gurur duyuyoruz
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {references.map((reference, index) => (
            <FadeIn key={reference.name} delay={index * 0.05}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center p-8 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <img
                  src={reference.logo}
                  alt={reference.name}
                  className="max-w-full h-auto grayscale hover:grayscale-0 transition-all"
                />
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
