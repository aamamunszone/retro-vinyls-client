'use client';

import { useState, useEffect } from 'react';
import { Star, Award, Clock, ShoppingCart } from 'lucide-react';

export default function ArtisanChoice() {
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 42,
    seconds: 30,
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-[#2C2C2C] via-[#3A3A3A] to-[#2C2C2C] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CC5500' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#CC5500] rounded-full px-4 py-2">
              <Award className="h-4 w-4" />
              <span className="text-sm font-semibold">Record of the Month</span>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                The Artisan's
                <span className="text-[#CC5500]"> Choice</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Hand-selected by our vinyl experts, this month's featured record
                represents the pinnacle of analog artistry and musical heritage.
              </p>
            </div>

            {/* Featured Album Info */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-[#D4AF37] fill-current"
                    />
                  ))}
                </div>
                <span className="text-gray-300 text-sm">
                  Collector's Grade: Mint
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-2">Pet Sounds</h3>
              <p className="text-gray-300 mb-4">
                The Beach Boys • 1966 Original Pressing
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-gray-400 text-sm line-through">
                    $299.99
                  </span>
                  <span className="text-3xl font-bold text-[#CC5500] ml-2">
                    $199.99
                  </span>
                </div>
                <div className="bg-[#CC5500] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  33% OFF
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="h-5 w-5 text-[#CC5500]" />
                <span className="text-lg font-semibold">
                  Limited Time Offer
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-[#CC5500] rounded-lg p-3 mb-2">
                      <span className="text-2xl font-bold text-white">
                        {item.value.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-gray-400 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-[#CC5500] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#B84A00] transition-colors duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
              <ShoppingCart className="h-5 w-5" />
              <span>Claim This Treasure</span>
            </button>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Pet Sounds vinyl record"
                className="w-full h-[600px] object-cover"
              />

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#CC5500]/20 to-transparent"></div>

              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-white rounded-full p-4 shadow-lg">
                <Award className="h-8 w-8 text-[#CC5500]" />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#CC5500]/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#D4AF37]/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
