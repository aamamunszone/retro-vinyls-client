'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Disc3,
  User,
  Plus,
  LogOut,
  ChevronDown,
  Mail,
} from 'lucide-react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { NAV_LINKS } from '@/utils/constants';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleSmoothScroll = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    setIsProfileOpen(false);
    try {
      await signOut({ callbackUrl: '/' });
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navLinks = NAV_LINKS;

  // Helper function to check if link is active
  const isActiveLink = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

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
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`relative font-medium text-sm tracking-wide transition-smooth group ${
                  isActiveLink(link.href)
                    ? 'text-[#B08968]'
                    : 'text-[#3C2F2F] hover:text-[#B08968]'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#B08968] transition-all duration-300 ${
                    isActiveLink(link.href)
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}

            {/* Authentication Section */}
            {status === 'loading' ? (
              <div className="flex items-center space-x-3">
                <div className="w-20 h-10 bg-[#F7F3F0] rounded-lg animate-pulse" />
                <div className="w-16 h-10 bg-[#F7F3F0] rounded-lg animate-pulse" />
              </div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                {/* Add Item Button */}
                <Link href="/items/add">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Plus}
                    iconPosition="left"
                    className={pathname === '/items/add' ? 'bg-[#9A7B5F]' : ''}
                  >
                    Add Item
                  </Button>
                </Link>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={toggleProfile}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#F7F3F0] transition-smooth"
                  >
                    <div className="w-8 h-8 bg-[#B08968] rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#6B5B5B] transition-transform duration-200 ${
                        isProfileOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-md border border-[#E8E2DD] rounded-lg shadow-elegant z-50">
                      <div className="p-4 border-b border-[#E8E2DD]">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#B08968] rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#3C2F2F]">
                              {session.user?.name || 'User'}
                            </p>
                            <p className="text-xs text-[#6B5B5B] flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {session.user?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <Link
                          href="/items/add"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-[#3C2F2F] hover:bg-[#F7F3F0] rounded-lg transition-smooth"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add New Record</span>
                        </Link>

                        <button
                          onClick={handleSignOut}
                          disabled={isLoggingOut}
                          className={`flex items-center space-x-3 w-full px-3 py-2 text-sm rounded-lg transition-smooth ${
                            isLoggingOut
                              ? 'text-[#6B5B5B] cursor-not-allowed'
                              : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                          }`}
                        >
                          {isLoggingOut ? (
                            <>
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                              <span>Logging out...</span>
                            </>
                          ) : (
                            <>
                              <LogOut className="w-4 h-4" />
                              <span>Logout</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link href="/login">
                <Button
                  variant="primary"
                  size="sm"
                  icon={User}
                  iconPosition="left"
                  className={pathname === '/login' ? 'bg-[#9A7B5F]' : ''}
                >
                  Login
                </Button>
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
                    onClick={(e) => {
                      handleSmoothScroll(e, link.href);
                      toggleMenu();
                    }}
                    className={`block px-3 py-2 font-medium rounded-lg transition-smooth ${
                      isActiveLink(link.href)
                        ? 'text-[#B08968] bg-[#F7F3F0]'
                        : 'text-[#3C2F2F] hover:text-[#B08968] hover:bg-[#F7F3F0]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="pt-3 border-t border-[#E8E2DD] space-y-2">
                  {status === 'loading' ? (
                    <div className="space-y-2">
                      <div className="w-full h-10 bg-[#F7F3F0] rounded-lg animate-pulse" />
                      <div className="w-full h-10 bg-[#F7F3F0] rounded-lg animate-pulse" />
                    </div>
                  ) : session ? (
                    <>
                      <div className="px-3 py-3 bg-[#F7F3F0] rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-[#B08968] rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#3C2F2F]">
                              {session.user?.name || 'User'}
                            </p>
                            <p className="text-xs text-[#6B5B5B]">
                              {session.user?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Link
                        href="/items/add"
                        className={
                          pathname === '/items/add' ? 'bg-[#9A7B5F]' : ''
                        }
                        onClick={toggleMenu}
                      >
                        <Button
                          variant="primary"
                          size="sm"
                          fullWidth
                          icon={Plus}
                          iconPosition="left"
                        >
                          Add New Record
                        </Button>
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          toggleMenu();
                        }}
                        disabled={isLoggingOut}
                        className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-smooth flex items-center justify-center space-x-2 ${
                          isLoggingOut
                            ? 'bg-[#F7F3F0] text-[#6B5B5B] cursor-not-allowed border border-[#E8E2DD]'
                            : 'text-red-600 hover:bg-red-50 border border-red-200 hover:border-red-300'
                        }`}
                      >
                        {isLoggingOut ? (
                          <>
                            <div className="w-4 h-4 border-2 border-[#6B5B5B] border-t-transparent rounded-full animate-spin" />
                            <span>Logging out...</span>
                          </>
                        ) : (
                          <>
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </>
                        )}
                      </button>
                    </>
                  ) : (
                    <Link href="/login" onClick={toggleMenu}>
                      <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        icon={User}
                        iconPosition="left"
                        className={pathname === '/login' ? 'bg-[#9A7B5F]' : ''}
                      >
                        Login
                      </Button>
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
