'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FadeIn } from '@/components/ui/AnimatedSection';
import Link from 'next/link';
import Image from 'next/image';

const categories = ['Tümü', 'Konut', 'Ticari', 'Altyapı', 'Endüstriyel', 'Restorasyon'];
const statuses = ['Tümü', 'Devam Eden', 'Tamamlanan'];

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

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedStatus, setSelectedStatus] = useState('Tümü');
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  // Load projects from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('admin_projects');
    if (stored) {
      setAllProjects(JSON.parse(stored));
    }
  }, []);

  // Filter projects
  useEffect(() => {
    let filtered = allProjects;

    if (selectedCategory !== 'Tümü') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedStatus !== 'Tümü') {
      filtered = filtered.filter(p => p.status === selectedStatus);
    }

    setFilteredProjects(filtered);
  }, [selectedCategory, selectedStatus, allProjects]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
            alt="Projelerimiz"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        </div>

        <div className="relative z-20 container-custom text-center text-white">
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
                <span className="text-sm sm:text-base font-bold text-yellow-400 whitespace-nowrap">Projelerimiz</span>
                <span className="text-sm sm:text-base font-bold text-yellow-400 whitespace-nowrap">Projelerimiz</span>
                <span className="text-sm sm:text-base font-bold text-yellow-400 whitespace-nowrap">Projelerimiz</span>
              </motion.div>
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Başarı Hikayelerimiz
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
          >
            30 yılı aşkın deneyimimizle gerçekleştirdiğimiz projeler, kalite ve mükemmellik anlayışımızın birer yansımasıdır
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12"
          >
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-yellow-400 mb-2">{allProjects.length}+</div>
              <div className="text-sm md:text-base text-gray-300">Toplam Proje</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-yellow-400 mb-2">
                {allProjects.filter((p: Project) => p.status === 'Tamamlanan').length}
              </div>
              <div className="text-sm md:text-base text-gray-300">Tamamlanan</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-yellow-400 mb-2">
                {allProjects.filter((p: Project) => p.status === 'Devam Eden').length}
              </div>
              <div className="text-sm md:text-base text-gray-300">Devam Eden</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white py-8 md:py-12 sticky top-[72px] z-40 border-b border-gray-200 shadow-sm">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-3 text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Kategori
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                      selectedCategory === category
                        ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/50 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-yellow-400 hover:text-black hover:shadow-md'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-3 text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Durum
              </label>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                      selectedStatus === status
                        ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/50 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-yellow-400 hover:text-black hover:shadow-md'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center text-sm text-gray-600"
          >
            <span className="font-semibold text-yellow-400">{filteredProjects.length}</span> proje gösteriliyor
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project, index) => (
              <FadeIn key={project.id} delay={index * 0.1}>
                <motion.div
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer"
                  whileHover={{ y: -12 }}
                >
                    {/* Image Container */}
                    <div className="relative h-[280px] overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <span className="inline-block px-3 py-1.5 bg-yellow-400 text-black text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg">
                          {project.category}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className={`inline-block px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg ${
                          project.status === 'Tamamlanan' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-blue-500 text-white'
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      {/* Year Badge */}
                      <div className="absolute bottom-4 right-4 z-10">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-white text-sm font-semibold">{project.year}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 group-hover:text-yellow-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      {/* Location */}
                      <div className="flex items-center gap-2 mb-3 text-gray-600">
                        <svg className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">{project.location}</span>
                      </div>

                      {/* Project Info */}
                      <div className="grid grid-cols-2 gap-3 mb-4 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                          <div>
                            <div className="text-xs text-gray-500">Alan</div>
                            <div className="text-sm font-semibold text-gray-900">{project.area}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <div className="text-xs text-gray-500">Süre</div>
                            <div className="text-sm font-semibold text-gray-900">{project.duration}</div>
                          </div>
                        </div>
                      </div>

                      {/* View Details Button */}
                      <div className="flex items-center text-yellow-400 font-semibold group-hover:gap-3 gap-2 transition-all text-sm">
                        <span>Detayları Gör</span>
                        <svg 
                          className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
              </FadeIn>
            ))}
          </div>

          {filteredProjects.length === 0 && (
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
              <p className="text-xl text-gray-600 font-medium">Seçilen kriterlere uygun proje bulunamadı.</p>
              <p className="text-gray-500 mt-2">Filtreleri değiştirerek tekrar deneyebilirsiniz.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
