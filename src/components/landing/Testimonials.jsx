import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Marcus Thompson',
      role: 'Jazz Collector',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 5,
      text: "RetroVinyls helped me find a first pressing of Kind of Blue that I'd been searching for over 20 years. The condition was exactly as described, and the packaging was museum-quality.",
      location: 'New York, NY',
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'Rock Enthusiast',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 5,
      text: 'As someone new to vinyl collecting, RetroVinyls made the experience incredible. Their grading system is honest, and the community aspect helps me discover amazing albums I never knew existed.',
      location: 'Los Angeles, CA',
    },
    {
      id: 3,
      name: 'David Rodriguez',
      role: 'Soul & Blues Aficionado',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 5,
      text: 'The authenticity and passion of RetroVinyls is unmatched. Every record tells a story, and they preserve that story beautifully. My collection has grown tremendously thanks to their curated selections.',
      location: 'Chicago, IL',
    },
  ];

  return (
    <section className="section-padding bg-[#F7F3F0]">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-small text-[#B08968] font-medium tracking-wide uppercase mb-4 block">
            What Collectors Say
          </span>
          <h2 className="heading-secondary text-[#3C2F2F] mb-6">
            Collector Stories
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Hear from passionate collectors who've found their musical treasures
            with us
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card-uniform group">
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-elegant">
                <Quote className="w-8 h-8 text-[#B08968]" />
              </div>

              <div className="card-content">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-[#D4A574] fill-current"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-body text-[#3C2F2F] mb-6 leading-relaxed text-ellipsis-3">
                  "{testimonial.text}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center space-x-4 mt-auto">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="font-serif text-base font-semibold text-[#3C2F2F]">
                      {testimonial.name}
                    </h4>
                    <p className="text-small text-[#B08968] font-medium">
                      {testimonial.role}
                    </p>
                    <p className="text-small text-[#6B5B5B]">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-[#E8E2DD]">
          <div className="text-center">
            <div className="heading-tertiary text-[#B08968] mb-2">4.9/5</div>
            <div className="text-body text-[#6B5B5B]">Average Rating</div>
            <div className="flex justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#D4A574] fill-current" />
              ))}
            </div>
          </div>

          <div className="text-center">
            <div className="heading-tertiary text-[#B08968] mb-2">2,500+</div>
            <div className="text-body text-[#6B5B5B]">Happy Collectors</div>
          </div>

          <div className="text-center">
            <div className="heading-tertiary text-[#B08968] mb-2">15,000+</div>
            <div className="text-body text-[#6B5B5B]">Records Sold</div>
          </div>
        </div>
      </div>
    </section>
  );
}
