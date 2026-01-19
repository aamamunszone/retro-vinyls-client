'use client';

import { useState, useEffect, Suspense } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Disc3, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

// Loading component for Suspense fallback
function LoginLoading() {
  return (
    <div className="min-h-screen bg-[#FFFBEB] flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-elegant border border-[#E8E2DD] p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#E8E2DD] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Disc3 className="w-8 h-8 text-[#6B5B5B]" />
            </div>
            <p className="text-body text-[#6B5B5B]">Loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main login component that uses useSearchParams
function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push(callbackUrl);
      }
    };
    checkSession();
  }, [router, callbackUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('🔐 Login - Attempting sign in for:', formData.email);
      console.log('🔐 Login - Callback URL:', callbackUrl);

      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        callbackUrl: callbackUrl,
        redirect: false,
      });

      console.log('🔐 Login - SignIn result:', result);

      if (result?.error) {
        console.log('🔐 Login - Error:', result.error);
        toast.error('Invalid credentials. Please try again.');
      } else if (result?.ok) {
        console.log('🔐 Login - Success, redirecting to:', callbackUrl);
        toast.success('Login successful! Welcome back.');

        // Force a hard redirect to ensure session is properly set
        window.location.href = callbackUrl;
      }
    } catch (error) {
      console.error('🔐 Login - Exception:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setFormData({
      email: 'admin@retro.com',
      password: 'admin123',
    });
    toast.success('Demo credentials filled!');
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        {/* Back to Home */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-[#6B5B5B] hover:text-[#B08968] transition-smooth"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-small font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-elegant border border-[#E8E2DD] p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#B08968] rounded-full flex items-center justify-center shadow-minimal">
                <Disc3 className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="heading-tertiary text-[#3C2F2F] mb-2">
              Welcome Back
            </h1>
            <p className="text-body text-[#6B5B5B]">
              Sign in to access your RetroVinyls account
            </p>
          </div>

          {/* Demo Credentials Banner */}
          <div className="bg-[#F7F3F0] border border-[#E8E2DD] rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-small font-medium text-[#3C2F2F] mb-1">
                  Demo Credentials
                </p>
                <p className="text-xs text-[#6B5B5B]">
                  admin@retro.com / admin123
                </p>
              </div>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-xs bg-[#B08968] text-white px-3 py-1 rounded hover:bg-[#9A7B5F] transition-smooth"
              >
                Fill
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-small font-medium text-[#3C2F2F] mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-[#E8E2DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B08968] focus:border-transparent transition-smooth"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-small font-medium text-[#3C2F2F] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 pr-12 border border-[#E8E2DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B08968] focus:border-transparent transition-smooth"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B5B5B] hover:text-[#B08968] transition-smooth"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-smooth ${
                isLoading
                  ? 'bg-[#E8E2DD] text-[#6B5B5B] cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-small text-[#6B5B5B]">
              Don't have an account?{' '}
              <span className="text-[#B08968] font-medium">
                Contact admin for access
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  );
}
