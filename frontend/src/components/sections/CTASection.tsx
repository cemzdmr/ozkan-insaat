'use client';

import { FadeIn } from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="section-spacing bg-black text-white">
      <div className="container-custom">
        <FadeIn className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Projenizi Hayata Geçirelim
          </h2>
          <p className="text-xl mb-12 text-gray-300">
            30 yıllık tecrübemiz ve uzman kadromuzla projenize değer katalım. 
            Detaylı bilgi almak ve teklif için bizimle iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/iletisim">
              <Button 
                variant="primary" 
                size="large"
              >
                İletişime Geçin
              </Button>
            </Link>
            <Link href="/projeler">
              <Button 
                variant="outline" 
                size="large"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Projelerimizi İnceleyin
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
