'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const stats = [
  { 
    value: 248, 
    suffix: '+',
    label: 'Devam Eden Proje',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  { 
    value: 2.5,
    suffix: 'M',
    label: 'Metrekare Alan',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
      </svg>
    )
  },
  { 
    value: 5.8,
    suffix: 'B',
    prefix: '₺',
    label: 'Toplam Proje Değeri',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

function Counter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return prefix + Math.round(latest * 10) / 10 + suffix;
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 2 });
      return controls.stop;
    }
  }, [inView, count, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const timeline = [
  { 
    year: '1994', 
    title: 'Kuruluş Yılı',
    description: 'Özkan İnşaat Türkiye\'de faaliyet göstermeye başladı',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800'
  },
  { 
    year: '2005', 
    title: 'Global Genişleme',
    description: 'İlk uluslararası projeler ve ofis açılışları',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800'
  },
  { 
    year: '2015', 
    title: 'Teknoloji Odaklı',
    description: 'Yeni nesil inşaat teknolojileri ve sürdürülebilirlik',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800'
  },
  { 
    year: '2024', 
    title: 'Lider Konumda',
    description: '85+ ofis ve 1500+ çalışanla sektör lideri',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800'
  }
];

const values = [
  {
    title: 'Neler Yapıyoruz',
    description: 'Konut projelerinden ticari alanlara, altyapı çalışmalarından kentsel dönüşüme kadar geniş yelpazede hizmet sunuyoruz.',
    link: '/projeler',
    linkText: 'Projelerimiz',
    bgColor: 'bg-black',
    textColor: 'text-white'
  },
  {
    title: 'Etkimiz',
    description: 'Yatırımcılar ve geliştiricilerle birlikte çalışarak iz bırakan, kalıcı eserler yaratıyoruz.',
    link: '/projeler',
    linkText: 'Projeleri Gör',
    bgColor: 'bg-yellow-400',
    textColor: 'text-black',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600'
  },
  {
    title: 'Temel Değerlerimiz',
    description: 'Kalite, güvenilirlik ve sürdürülebilirlik ile müşterilerimize en iyi hizmeti sunuyoruz.',
    link: '/hakkimizda',
    linkText: 'Daha Fazla',
    bgColor: 'bg-gray-800',
    textColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600'
  }
];

const testimonials = [
  {
    quote: 'Özkan İnşaat ile çalışmak harika bir deneyimdi. Ne yaptıklarını biliyorlar ve süreç boyunca inanılmaz derecede bilgiliydi.',
    author: 'Mehmet Yılmaz',
    position: 'Proje Yöneticisi',
    company: 'ABC Holding'
  },
  {
    quote: 'Profesyonellik, kalite ve zamanında teslimat. Özkan İnşaat ile çalışmak her zaman güvenlidir.',
    author: 'Ayşe Demir',
    position: 'Genel Müdür',
    company: 'XYZ Yapı'
  }
];

export default function AboutPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] flex items-center justify-start bg-black text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
            alt="Özkan İnşaat"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto px-4 text-center"
          >
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-8">
              Hakkımızda
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-gray-300">
              İnşaat sektöründe 30 yılı aşkın deneyimimizle, profesyonel ve kaliteli hizmet anlayışımızın sonuçlarını sunuyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Image */}
      <section className="py-12 md:py-16 lg:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left: Team Image with Stats Overlay */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070"
                alt="Özkan İnşaat Ekibi"
                fill
                className="object-cover"
              />
              
              {/* Stats Icons Overlay */}
              <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 p-3 sm:p-4 md:p-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ 
                      opacity: { duration: 0.6, delay: index * 0.2 },
                      scale: { duration: 0.6, delay: index * 0.2 },
                      y: { 
                        duration: 3 + index * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      rotate: {
                        duration: 4 + index * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 0,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 flex flex-col items-center justify-center aspect-square border border-white/20 cursor-pointer hover:bg-yellow-400/90 hover:border-yellow-400 transition-colors group"
                  >
                    <div className="text-white/80 mb-1 sm:mb-2 group-hover:text-black transition-colors [&>svg]:w-6 [&>svg]:h-6 sm:[&>svg]:w-8 sm:[&>svg]:h-8 md:[&>svg]:w-12 md:[&>svg]:h-12">
                      {stat.icon}
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white text-center group-hover:text-black transition-colors">
                      <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                    </div>
                    <div className="text-[8px] sm:text-[10px] md:text-xs text-white/70 text-center mt-0.5 sm:mt-1 leading-tight group-hover:text-black/70 transition-colors">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Content */}
            <div className="space-y-4 md:space-y-6 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="relative inline-block mb-4 md:mb-6 overflow-hidden rounded-full border border-yellow-400 px-2 py-1 sm:px-3 sm:py-1.5 w-24 sm:w-32">
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
                    className="relative z-10 flex gap-8"
                  >
                    <span className="text-xs sm:text-sm font-bold text-yellow-400 whitespace-nowrap">Hakkımızda</span>
                    <span className="text-xs sm:text-sm font-bold text-yellow-400 whitespace-nowrap">Hakkımızda</span>
                    <span className="text-xs sm:text-sm font-bold text-yellow-400 whitespace-nowrap">Hakkımızda</span>
                  </motion.div>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3 md:mb-4 text-center">
                  Geleceği Birlikte İnşa Ediyoruz
                </h2>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 md:mb-6 leading-relaxed text-center">
                  30 yılı aşkın deneyimimiz ve global vizyonumuzla, konut projelerinden ticari alanlara, 
                  altyapı çalışmalarından büyük ölçekli kentsel dönüşüm projelerine kadar geniş bir yelpazede 
                  hizmet sunuyoruz. Müşterilerimizin hayallerini gerçeğe dönüştürmek için en son teknoloji 
                  ve sürdürülebilir inşaat yöntemlerini kullanıyor, her projede en yüksek kalite standartlarını 
                  uyguluyoruz.
                </p>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg text-center">
                  Türkiye'nin dört bir yanında ve dünya genelinde 85+ ofis, 1500+ çalışanımızla 
                  sektörün öncü kuruluşları arasında yer alıyoruz.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-yellow-400 text-black text-sm font-semibold rounded-full mb-4">
              TARİHÇEMİZ
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-3 md:mb-4">
              30+ Yıllık Olağanüstü Yolculuk
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                {/* Building Image */}
                <div className="relative h-48 sm:h-56 md:h-64 mb-4 md:mb-6 rounded-xl md:rounded-2xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.year}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-1 md:mb-2">
                      {item.year}
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="flex justify-center mb-4">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full" />
                </div>

                {/* Content */}
                <h3 className="text-lg md:text-xl font-bold text-black mb-1 md:mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-yellow-400 text-black text-xs sm:text-sm font-semibold rounded-full mb-3 md:mb-4">
              ŞİRKET PROFİLİ
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
              Hakkımızda Daha Fazla
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${value.bgColor} ${value.textColor} rounded-2xl md:rounded-3xl p-6 md:p-8 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex flex-col justify-between relative overflow-hidden group hover:scale-105 transition-transform duration-300`}
              >
                {/* Background Image if exists */}
                {value.image && (
                  <div className="absolute inset-0">
                    <Image
                      src={value.image}
                      alt={value.title}
                      fill
                      className="object-cover opacity-40 group-hover:opacity-50 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                )}

                <div className="relative z-10">
                  <span className="text-xs sm:text-sm font-semibold mb-3 md:mb-4 block opacity-70">
                    0{index + 1}.
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                    {value.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base opacity-90 mb-4 md:mb-6">
                    {value.description}
                  </p>
                </div>

                <Link
                  href={value.link}
                  className="relative z-10 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold group/link"
                >
                  <span className="border-b border-current">{value.linkText}</span>
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            {/* Rotating Badge with Text */}
            <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto mb-8 md:mb-12 relative">
              {/* Rotating Text */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 160 160" className="w-full h-full">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                    />
                  </defs>
                  <text className="text-[11px] font-bold fill-black uppercase tracking-wider">
                    <textPath href="#circlePath" startOffset="0%">
                      • Neler Diyorlar ? • Neler Diyorlar ? • Neler Diyorlar ?
                    </textPath>
                  </text>
                </svg>
              </motion.div>
              
              {/* Center Image */}
              <div className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 sm:border-3 md:border-4 border-yellow-400 bg-gray-900">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200"
                  alt="Özkan İnşaat Projeleri"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Testimonial Content */}
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black mb-6 md:mb-8 leading-relaxed px-4">
                "{testimonials[currentTestimonial].quote}"
              </p>
              <div>
                <p className="text-base sm:text-lg md:text-xl font-bold text-black">
                  {testimonials[currentTestimonial].author}
                </p>
                <p className="text-gray-600">
                  {testimonials[currentTestimonial].position}, {testimonials[currentTestimonial].company}
                </p>
              </div>
            </motion.div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-yellow-400 hover:bg-yellow-400 transition-all flex items-center justify-center group"
              >
                <span className="text-xl group-hover:text-black">←</span>
              </button>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-yellow-400 hover:bg-yellow-400 transition-all flex items-center justify-center group"
              >
                <span className="text-xl group-hover:text-black">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053"
            alt="Hayalinizdeki Proje"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-4">
              Hayalinizdeki Proje Sizi Bekliyor
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Projelerimizi keşfedin veya özel bir şeyler hayal ediyorsanız, hayallerinizi gerçeğe dönüştürmek için buradayız.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/iletisim">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-400 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-medium hover:bg-yellow-500 transition-all"
                >
                  Ücretsiz Teklif Alın
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
