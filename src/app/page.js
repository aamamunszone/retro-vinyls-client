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

// Metadata for SEO
export const metadata = {
  title:
    'RetroVinyls | Rediscover the Classics - Premium Vinyl Records Collection',
  description:
    'Discover authentic vintage vinyl records from legendary artists. Curated collection of rare and classic albums with expert grading and authentication. Join our community of vinyl enthusiasts.',
  keywords: [
    'vinyl records',
    'vintage music',
    'classic albums',
    'rare vinyl',
    'record collection',
    'music memorabilia',
    'audiophile',
    'retro music',
  ],
  authors: [{ name: 'RetroVinyls Team' }],
  creator: 'RetroVinyls',
  publisher: 'RetroVinyls',
  openGraph: {
    title: 'RetroVinyls | Premium Vintage Vinyl Records',
    description:
      'Discover authentic vintage vinyl records from legendary artists. Curated collection with expert authentication.',
    url: 'https://retro-vinyls.vercel.app',
    siteName: 'RetroVinyls',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'RetroVinyls - Premium Vintage Vinyl Records Collection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RetroVinyls | Premium Vintage Vinyl Records',
    description:
      'Discover authentic vintage vinyl records from legendary artists. Curated collection with expert authentication.',
    images: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

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
