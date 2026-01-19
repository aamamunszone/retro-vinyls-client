import { Music, Award, Users, Clock } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function AboutPassion() {
  const features = [
    {
      icon: Music,
      title: 'Authentic Sound',
      description:
        'Experience music as it was meant to be heard - warm, rich, and full of character.',
    },
    {
      icon: Award,
      title: 'Curated Quality',
      description:
        'Every record is carefully inspected and graded by our team of vinyl experts.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description:
        'Join thousands of collectors sharing their passion for analog music.',
    },
    {
      icon: Clock,
      title: 'Timeless Collection',
      description:
        'From rare first pressings to modern classics, we preserve musical history.',
    },
  ];

  return (
    <section id="about" className="section-padding bg-[#FFFBEB]">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="aspect-4/5 relative rounded-2xl overflow-hidden shadow-prominent">
              <Image
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Vintage turntable with vinyl record"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 glass-elegant rounded-xl p-6 shadow-elegant max-w-xs">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#B08968] rounded-full flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-serif text-lg font-semibold text-[#3C2F2F]">
                    Since 1975
                  </div>
                  <div className="text-small text-[#6B5B5B]">
                    Preserving musical heritage
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <span className="text-small text-[#B08968] font-medium tracking-wide uppercase mb-4 block">
                Our Story
              </span>
              <h2 className="heading-secondary text-[#3C2F2F] mb-6">
                About Our Passion
              </h2>
              <div className="space-y-4">
                <p className="text-body">
                  In a world of digital convenience, we believe in the
                  irreplaceable magic of analog music. Every vinyl record tells
                  a story - not just through its grooves, but through its
                  journey from studio to your hands.
                </p>
                <p className="text-body">
                  Founded by collectors, for collectors, RetroVinyls is more
                  than a marketplace. We're custodians of musical history,
                  connecting passionate enthusiasts with the authentic sound
                  that only vinyl can deliver.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#F7F3F0] rounded-lg flex items-center justify-center group-hover:bg-[#B08968] transition-elegant">
                      <feature.icon className="w-5 h-5 text-[#B08968] group-hover:text-white transition-elegant" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-[#3C2F2F] mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-small text-[#6B5B5B] leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button variant="primary" size="md">
                Learn Our Story
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
