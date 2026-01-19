'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Disc3, User, Plus, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collection', href: '/items' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-elegant ${
        isScrolled ? 'glass-elegant shadow-elegant' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-[#B08968] rounded-full flex items-center justify-center shadow-minimal">
                <Disc3 className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="font-serif text-xl lg:text-2xl font-semibold text-[#3C2F2F] tracking-tight">
              RetroVinyls
            </span>
          </Link>

          {/* Desktop Navigation */}
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-[#3C2F2F] font-medium text-sm tracking-wide hover:text-[#B08968] transition-smooth group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B08968] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {/* Authentication Buttons */}
            {status === 'loading' ? (
              <div className="w-20 h-10 bg-[#F7F3F0] rounded-lg animate-pulse"></div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                {/* Add Item Button */}
                <Link href="/items/add" className="btn-primary text-sm">
                  <Plus className="w-4 h-4" />
                  Add Item
                </Link>

                {/* User Info & Logout */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-[#6B5B5B]">
                    {session.user?.name || session.user?.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="text-[#6B5B5B] border border-[#E8E2DD] px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#F7F3F0] transition-smooth"
                  >
                    <LogOut className="w-4 h-4 inline mr-1" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="btn-primary text-sm">
                <User className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-[#3C2F2F] hover:text-[#B08968] transition-smooth"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="glass-elegant rounded-lg mt-2 p-4 shadow-elegant border border-[#E8E2DD]">
              <div className="space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-2 text-[#3C2F2F] font-medium hover:text-[#B08968] hover:bg-[#F7F3F0] rounded-lg transition-smooth"
                    onClick={toggleMenu}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="pt-3 border-t border-[#E8E2DD] space-y-2">
                  {session ? (
                    <>
                      <div className="px-3 py-2 text-sm text-[#6B5B5B]">
                        {session.user?.name || session.user?.email}
                      </div>
                      <Link
                        href="/items/add"
                        className="btn-primary w-full text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        Add Item
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-[#6B5B5B] border border-[#E8E2DD] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#F7F3F0] transition-smooth"
                      >
                        <LogOut className="w-4 h-4 inline mr-2" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link href="/login" className="btn-primary w-full text-sm">
                      <User className="w-4 h-4" />
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
