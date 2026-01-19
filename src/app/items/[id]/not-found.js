import Link from 'next/link';
import { ArrowLeft, Search, Home } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFBEB] pt-24">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center py-20">
          {/* Back Navigation */}
          <div className="mb-12">
            <Link
              href="/items"
              className="inline-flex items-center space-x-2 text-[#6B5B5B] hover:text-[#B08968] hover:bg-stone-100 px-4 py-2 rounded-lg border border-stone-300 transition-all duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
              <span className="text-sm font-medium">Back to Collection</span>
            </Link>
          </div>

          {/* 404 Content */}
          <div className="max-w-lg mx-auto">
            <div className="w-32 h-32 bg-gradient-to-br from-[#F7F3F0] to-[#E8E2DD] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Search className="w-12 h-12 text-[#B08968]" />
            </div>

            <h1 className="font-serif text-4xl font-bold text-[#3C2F2F] mb-6">
              Record Not Found
            </h1>

            <p className="text-lg text-[#6B5B5B] mb-8 leading-relaxed">
              The vinyl record you're looking for doesn't exist or may have been
              removed from our collection. Let's help you find something amazing
              instead.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/items">
                <Button
                  variant="primary"
                  size="lg"
                  icon={Search}
                  iconPosition="left"
                >
                  Browse Collection
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="ghost"
                  size="lg"
                  icon={Home}
                  iconPosition="left"
                >
                  Return Home
                </Button>
              </Link>
            </div>

            {/* Helpful suggestions */}
            <div className="bg-[#F7F3F0] p-6 rounded-xl text-left">
              <h3 className="font-semibold text-[#3C2F2F] mb-3">
                What you can do:
              </h3>
              <ul className="text-sm text-[#6B5B5B] space-y-2">
                <li>• Check if the URL is correct</li>
                <li>• Browse our full collection of vintage vinyl records</li>
                <li>• Use the search feature to find similar records</li>
                <li>• Contact us if you're looking for something specific</li>
              </ul>
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
