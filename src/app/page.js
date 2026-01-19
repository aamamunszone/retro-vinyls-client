import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import FeaturedCollection from '@/components/landing/FeaturedCollection';
import AboutPassion from '@/components/landing/AboutPassion';
import CuratedCategories from '@/components/landing/CuratedCategories';
import ArtisanChoice from '@/components/landing/ArtisanChoice';
import Testimonials from '@/components/landing/Testimonials';
import JoinCommunity from '@/components/landing/JoinCommunity';
import Footer from '@/components/landing/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFBEB] overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <FeaturedCollection />
        <AboutPassion />
        <CuratedCategories />
        <ArtisanChoice />
        <Testimonials />
        <JoinCommunity />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
