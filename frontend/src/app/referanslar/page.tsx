'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const categories = [
  'Tümü',
  'Kamu Kuruluşları',
  'Özel Sektör',
  'Uluslararası',
  'Altyapı',
  'Konut'
];

interface Reference {
  id: number;
  name: string;
  category: string;
  location: string;
  year: number;
  description: string;
  logo?: string;
}

export default function ReferencesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [references, setReferences] = useState<Reference[]>([]);
  const [filteredReferences, setFilteredReferences] = useState<Reference[]>([]);

  // Load references from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('admin_references');
    if (stored) {
      setReferences(JSON.parse(stored));
    }
  }, []);

  // Filter references
  useEffect(() => {
    if (selectedCategory === 'Tümü') {
      setFilteredReferences(references);
    } else {
      setFilteredReferences(references.filter(ref => ref.category === selectedCategory));
    }
  }, [selectedCategory, references]);

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Referanslar"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        </div>
        
        <div className="container-custom relative z-10 text-center text-white">
          {/* Animated Badge */}
          <div className="mb-8 flex justify-center">
            <div className="relative inline-block overflow-hidden rounded-full border border-yellow-400 px-4 py-2 w-40 sm:w-48">
              <motion.div
                animate={{
                  x: ['-200%', '10%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 0,
                }}
                className="relative z-10 flex gap-10"
              >
                <span className="text-sm sm:text-base font-bold text-yellow-400 whitespace-nowrap">Referanslar</span>
                <span className="text-sm sm:text-base font-bold text-yellow-400 whitespace-nowrap">Referanslar</span>
                <span className="text-sm sm:text-base font-bold text-yellow-400 whitespace-nowrap">Referanslar</span>
              </motion.div>
            </div>
          </div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Güvenilen <span className="text-yellow-400">İş Ortağı</span>
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto"
          >
            Türkiye'nin ve dünyanın önde gelen kurumlarıyla gerçekleştirdiğimiz başarılı işbirlikleri
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12"
          >
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-yellow-400 mb-2">{references.length}+</div>
              <div className="text-sm md:text-base text-gray-300">Kurumsal Müşteri</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-yellow-400 mb-2">15+</div>
              <div className="text-sm md:text-base text-gray-300">Ülke</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-yellow-400 mb-2">30+</div>
              <div className="text-sm md:text-base text-gray-300">Yıllık Deneyim</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 md:py-12 bg-white sticky top-[72px] z-40 border-b border-gray-200 shadow-sm">
        <div className="container-custom">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-3 text-gray-900 flex items-center gap-2 justify-center">
              <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Kategori Filtrele
            </label>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm ${
                  selectedCategory === category
                    ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/50 scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-yellow-400 hover:text-black hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center text-sm text-gray-600"
          >
            <span className="font-semibold text-yellow-400">{filteredReferences.length}</span> kurum gösteriliyor
          </motion.div>
        </div>
      </section>

      {/* References Grid */}
      <section className="py-16 md:py-24 bg-gray-50" ref={ref}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredReferences.map((reference, index) => (
              <motion.div
                key={reference.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200 hover:border-yellow-400 hover:shadow-2xl transition-all duration-500 group cursor-pointer"
              >
                {/* Logo or Icon */}
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-900 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-yellow-400 transition-all duration-300 text-white group-hover:text-black group-hover:scale-110 overflow-hidden">
                  {reference.logo ? (
                    <img src={reference.logo} alt={reference.name} className="w-full h-full object-contain p-2" />
                  ) : (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
                  {reference.name}
                </h3>
                
                {/* Category Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-block px-3 py-1.5 bg-gray-100 text-xs font-semibold text-gray-700 rounded-lg group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                    {reference.category}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  {reference.location && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm font-medium">{reference.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">{reference.year}</span>
                  </div>
                  {reference.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mt-3">
                      {reference.description}
                    </p>
                  )}
                </div>

                {/* Hover Arrow */}
                <div className="mt-4 flex items-center text-yellow-400 font-semibold opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all text-sm">
                  <span>Detayları Gör</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredReferences.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-200 mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xl text-gray-600 font-medium">
                Bu kategoride referans bulunamadı.
              </p>
              <p className="text-gray-500 mt-2">Diğer kategorileri inceleyebilirsiniz.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(250, 204, 21, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(250, 204, 21, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 mb-6">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Sizin İçin <span className="text-yellow-400">Neler Yapabiliriz?</span>
            </h2>
            <p className="text-base md:text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Projeniz için bizimle iletişime geçin. 30 yıllık deneyimimiz ve güçlü referanslarımızla size özel çözümler üretelim.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/iletisim"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(250, 204, 21, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-500 transition-all inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                İletişime Geçin
              </motion.a>
              <motion.a
                href="/projeler"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all border-2 border-white/30 hover:border-yellow-400 inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Projeleri İncele
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
