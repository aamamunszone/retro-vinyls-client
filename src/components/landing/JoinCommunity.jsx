'use client';

import { useState } from 'react';
import { Mail, Bell, Users, Disc3, ArrowRight, Check } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function JoinCommunity() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const benefits = [
    {
      icon: Bell,
      title: 'Rare Drop Alerts',
      description: 'Be the first to know when rare records become available',
    },
    {
      icon: Users,
      title: 'Collector Community',
      description:
        'Connect with fellow vinyl enthusiasts and share discoveries',
    },
    {
      icon: Disc3,
      title: 'Exclusive Access',
      description: 'Get early access to limited editions and special releases',
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-[#CC5500] via-[#D4AF37] to-[#CC5500] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.1'%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Ccircle cx='40' cy='40' r='10'/%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the Community
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Get notified about rare drops, exclusive releases, and connect with
            passionate collectors from around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Benefits Side */}
          <div className="space-y-8">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-6">
                Why Join Our Community?
              </h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-lg">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-white/80 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">
                    5,000+
                  </div>
                  <div className="text-white/80 text-sm">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">
                    Weekly
                  </div>
                  <div className="text-white/80 text-sm">New Arrivals</div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Form Side */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="bg-[#CC5500]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-[#CC5500]" />
              </div>
              <h3 className="text-2xl font-bold text-[#2C2C2C] mb-2">
                Stay in the Loop
              </h3>
              <p className="text-[#4A4A4A]">
                Subscribe to get exclusive updates and early access to rare
                finds
              </p>
            </div>

            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#2C2C2C] mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CC5500] focus:border-transparent transition-colors"
                    required
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 h-4 w-4 text-[#CC5500] focus:ring-[#CC5500] border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-[#4A4A4A]">
                    I agree to receive marketing emails and understand I can
                    unsubscribe at any time.
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  fullWidth
                  icon={ArrowRight}
                  iconPosition="right"
                  className="shadow-lg hover:shadow-xl"
                >
                  Join the Community
                </Button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#2C2C2C] mb-2">
                  Welcome to the Community!
                </h3>
                <p className="text-[#4A4A4A]">
                  Check your email for a confirmation message and get ready for
                  some amazing vinyl discoveries.
                </p>
              </div>
            )}

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-6 text-sm text-[#4A4A4A]">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>No spam</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Unsubscribe anytime</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Privacy protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
