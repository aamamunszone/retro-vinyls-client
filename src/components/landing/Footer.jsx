import {
  Disc3,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Disc3 className="h-6 w-6 text-[#CC5500]" />
              <span className="text-xl font-bold">RetroVinyls</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Discover the authentic sound of vintage vinyl records. Every
              groove tells a story, every record holds a memory.
            </p>
            <p className="text-gray-400 text-xs">
              © 2024 RetroVinyls. All rights reserved.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#CC5500]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-300 hover:text-[#CC5500] transition-colors text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#explore"
                  className="text-gray-300 hover:text-[#CC5500] transition-colors text-sm"
                >
                  Explore Collection
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-[#CC5500] transition-colors text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#categories"
                  className="text-gray-300 hover:text-[#CC5500] transition-colors text-sm"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-[#CC5500] transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#CC5500]">Follow Us</h3>
            <p className="text-gray-300 text-sm">
              Join our community of vinyl enthusiasts
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-[#CC5500] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#CC5500] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#CC5500] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#CC5500] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#CC5500]">
              Stay Updated
            </h3>
            <p className="text-gray-300 text-sm">
              Get notified about rare vinyl drops and exclusive collections
            </p>
            <div className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-[#4A4A4A] text-white placeholder-gray-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#CC5500] text-sm"
                />
                <button className="bg-[#CC5500] text-white px-4 py-2 rounded-r-lg hover:bg-[#B84A00] transition-colors">
                  <Mail className="h-4 w-4" />
                </button>
              </div>
              <p className="text-gray-400 text-xs">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              Made with ♥ for vinyl collectors worldwide
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-[#CC5500] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#CC5500] transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#CC5500] transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
