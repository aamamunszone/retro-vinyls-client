'use client';

import { Star, Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function FeaturedCollection() {
  const featuredItems = [
    {
      id: 1,
      name: 'Abbey Road',
      artist: 'The Beatles',
      price: '$189.99',
      originalPrice: '$240.00',
      image:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      condition: 'Near Mint',
      year: '1969',
      description:
        "Original UK pressing with rare misprint on back cover. A true collector's piece.",
    },
    {
      id: 2,
      name: 'Kind of Blue',
      artist: 'Miles Davis',
      price: '$324.99',
      originalPrice: '$400.00',
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      condition: 'Mint',
      year: '1959',
      description:
        'First pressing Columbia 6-eye label in pristine condition. Jazz masterpiece.',
    },
    {
      id: 3,
      name: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      price: '$456.99',
      originalPrice: '$600.00',
      image:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 5.0,
      condition: 'Mint',
      year: '1973',
      description:
        'Original Harvest pressing with solid blue triangle. Progressive rock legend.',
    },
    {
      id: 4,
      name: "What's Going On",
      artist: 'Marvin Gaye',
      price: '$198.99',
      originalPrice: '$260.00',
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      condition: 'Very Good+',
      year: '1971',
      description:
        'Tamla original with gatefold sleeve intact. Soul music at its finest.',
    },
  ];

  return (
    <section id="collection" className="section-padding bg-[#F7F3F0]">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-small text-[#B08968] font-medium tracking-wide uppercase mb-4 block">
            Curated Selection
          </span>
          <h2 className="heading-secondary text-[#3C2F2F] mb-6">
            Featured Collection
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Handpicked treasures from our vault of musical history. Each record
            tells a story, each groove holds a memory that transcends time.
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredItems.map((item) => (
            <div key={item.id} className="card-uniform group">
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.name} by ${item.artist}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-elegant"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-elegant flex items-center justify-center">
                  <div className="flex space-x-3">
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-smooth">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                    <button className="w-10 h-10 bg-[#B08968] rounded-full flex items-center justify-center hover:bg-[#9A7B5F] transition-smooth">
                      <ShoppingCart className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3">
                  <span className="bg-[#B08968] text-white px-2 py-1 rounded text-xs font-medium">
                    {item.condition}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                    {item.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="card-content">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-[#D4A574] fill-current" />
                    <span className="text-small text-[#6B5B5B] font-medium">
                      {item.rating}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#6B5B5B] line-through">
                      {item.originalPrice}
                    </div>
                    <div className="font-serif text-lg font-semibold text-[#B08968]">
                      {item.price}
                    </div>
                  </div>
                </div>

                <h3 className="font-serif text-lg font-semibold text-[#3C2F2F] mb-1 group-hover:text-[#B08968] transition-smooth">
                  {item.name}
                </h3>

                <p className="text-small text-[#6B5B5B] mb-3">
                  by {item.artist}
                </p>

                <p className="text-small text-[#6B5B5B] mb-4 text-ellipsis-2 leading-relaxed">
                  {item.description}
                </p>

                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  className="mt-auto"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/items">
            <Button variant="secondary" size="lg">
              View Complete Collection
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
