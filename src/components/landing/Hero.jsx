'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Hero() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const heroSlides = [
    {
      id: 1,
      title: 'Discover Timeless Music',
      subtitle: 'Curated vinyl records from the golden age of sound',
      image:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      cta: 'Explore Collection',
    },
    {
      id: 2,
      title: 'Authentic Analog Experience',
      subtitle: 'Every record tells a story, every groove holds a memory',
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      cta: 'Browse Rarities',
    },
    {
      id: 3,
      title: "Collector's Paradise",
      subtitle: 'From legendary pressings to hidden gems',
      image:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      cta: 'Start Collecting',
    },
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Hero Swiper */}
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        loop={true}
        className="h-screen"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full flex items-center justify-center">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt="Vintage vinyl records"
                  fill
                  className="object-cover"
                  priority
                  quality={90}
                />

                {/* Elegant Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-4xl mx-auto text-center container-padding pt-20">
                {/* Main Heading */}
                <h1
                  className="heading-primary text-white mb-6"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
                >
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p
                  className="text-xl lg:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                >
                  {slide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button className="btn-primary bg-[#B08968] hover:bg-[#9A7B5F] px-8 py-4 text-lg">
                    {slide.cta}
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button className="btn-secondary border-white text-white hover:bg-white hover:text-[#3C2F2F] px-8 py-4 text-lg">
                    <Play className="w-5 h-5" />
                    Watch Story
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Desktop Scroll Indicator */}
      {isDesktop && (
        <div
          className={`scroll-indicator ${!showScrollIndicator ? 'hidden' : ''}`}
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white/80 text-sm font-medium tracking-wide">
              Scroll
            </span>
            <div className="scroll-arrow"></div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="glass-elegant border-t border-white/10">
          <div className="max-w-7xl mx-auto container-padding py-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="heading-tertiary text-[#3C2F2F] mb-2">
                  10,000+
                </div>
                <div className="text-body text-[#6B5B5B]">Rare Records</div>
              </div>
              <div>
                <div className="heading-tertiary text-[#3C2F2F] mb-2">500+</div>
                <div className="text-body text-[#6B5B5B]">Happy Collectors</div>
              </div>
              <div>
                <div className="heading-tertiary text-[#3C2F2F] mb-2">50+</div>
                <div className="text-body text-[#6B5B5B]">Years of Music</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
