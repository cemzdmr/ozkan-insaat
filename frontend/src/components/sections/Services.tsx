'use client';

import { useEffect, useState } from 'react';
import { FadeIn, StaggerContainer } from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';

interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
  active: boolean;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('admin_services');
    if (stored) {
      const allServices = JSON.parse(stored);
      // Sadece aktif hizmetleri göster
      setServices(allServices.filter((s: Service) => s.active));
    }
  }, []);
  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        <FadeIn className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-yellow-400 rounded-full mb-4">
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Hizmetlerimiz → Ne Sunuyoruz
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Sunduğumuz Hizmetlere<br />Kısa Bir Bakış
          </h2>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto">
            Discover top-tier real estate development services
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
            >
              {/* Icon Background */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-yellow-400 to-yellow-500">
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 group-hover:from-yellow-400/20 group-hover:via-yellow-400/40 group-hover:to-yellow-400/80 transition-all duration-500" />
                
                {/* Large Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl opacity-20">{service.icon}</span>
                </div>
                
                {/* Small Icon */}
                <div className="absolute top-4 left-4 text-4xl">{service.icon}</div>
                
                {/* Arrow Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-yellow-400 transition-all duration-300">
                  <svg 
                    className="w-5 h-5 text-white transform group-hover:rotate-45 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-1 text-sm text-gray-600">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-yellow-400">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400 rounded-2xl transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </StaggerContainer>

        {/* View All Services Button */}
        <FadeIn delay={0.6} className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
            <span>Tüm Hizmetleri Görüntüle</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
