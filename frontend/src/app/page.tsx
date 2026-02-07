import HeroSection from '@/components/sections/HeroSection';
import InfoBoxes from '@/components/sections/InfoBoxes';
import AboutVisionMission from '@/components/sections/AboutVisionMission';
import Statistics from '@/components/sections/Statistics';
import Services from '@/components/sections/Services';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import References from '@/components/sections/References';
import CTASection from '@/components/sections/CTASection';

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <InfoBoxes />
      <AboutVisionMission />
      <Statistics />
      <Services />
      <FeaturedProjects />
      <References />
      <CTASection />
    </>
  );
}
