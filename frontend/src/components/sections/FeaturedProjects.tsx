'use client';

import { FadeIn, SlideIn } from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useEffect, useState } from 'react';

interface Project {
  id: number;
  title: string;
  location: string;
  year: number;
  status: string;
  category: string;
  area: string;
  duration: string;
  image: string;
  description: string;
  featured?: boolean;
}

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('admin_projects');
    if (stored) {
      const allProjects = JSON.parse(stored);
      const featured = allProjects.filter((p: Project) => p.featured);
      setProjects(featured.slice(0, 4));
    }
  }, []);
  return (
    <section className="section-spacing">
      <div className="container-custom">
        <FadeIn className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Öne Çıkan Projeler</h2>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto">
            Gerçekleştirdiğimiz başarılı projelere göz atın
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <SlideIn
              key={project.title}
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 0.1}
            >
              <Link href={`/projeler/${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <motion.div
                  className="card card-hover image-zoom relative h-[500px] group"
                  whileHover={{ y: -8 }}
                >
                  <div className="absolute inset-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="overlay-gradient" />
                  </div>
                  
                  <div className="relative h-full flex flex-col justify-end p-8 text-white z-10">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-1 bg-yellow-400 text-black text-sm font-medium mb-4">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-200 mb-1">{project.location}</p>
                    <p className="text-gray-300">{project.year}</p>
                    
                    <motion.div
                      className="mt-4 flex items-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <span className="mr-2">Detayları Gör</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </SlideIn>
          ))}
        </div>

        <FadeIn className="text-center">
          <Link href="/projeler">
            <Button variant="primary" size="large">
              Tüm Projeleri Görüntüle
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
