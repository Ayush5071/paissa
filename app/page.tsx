import Navbar from '@/components/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import PlatformOverview from '@/components/sections/PlatformOverview'
import FeaturesSection from '@/components/sections/FeaturesSection'
import FooterSection from '@/components/sections/FooterSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <PlatformOverview />
        <FeaturesSection />
        <FooterSection />
      </main>
    </>
  );
}
