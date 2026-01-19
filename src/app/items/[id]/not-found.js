import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFBEB] pt-24">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center py-20">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/items"
              className="inline-flex items-center space-x-2 text-[#6B5B5B] hover:text-[#B08968] transition-smooth"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-small font-medium">Back to Collection</span>
            </Link>
          </div>

          {/* 404 Content */}
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-[#F7F3F0] rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-[#B08968]" />
            </div>

            <h1 className="heading-secondary text-[#3C2F2F] mb-4">
              Record Not Found
            </h1>

            <p className="text-body text-[#6B5B5B] mb-8">
              The vinyl record you're looking for doesn't exist or may have been
              removed from our collection.
            </p>

            <div className="space-y-4">
              <Link href="/items" className="btn-primary">
                Browse Collection
              </Link>
              <div>
                <Link
                  href="/"
                  className="text-[#B08968] hover:text-[#9A7B5F] font-medium transition-smooth"
                >
                  Return Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Record Not Found | RetroVinyls',
  description:
    'The requested vinyl record could not be found in our collection.',
};
