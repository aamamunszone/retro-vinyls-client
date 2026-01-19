/**
 * Professional error state component
 * Handles various error scenarios with appropriate messaging and actions
 */

import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error while loading this content.',
  showRetry = false,
  onRetry,
  showHomeLink = true,
}) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>

        <h2 className="heading-tertiary text-[#3C2F2F] mb-4">{title}</h2>

        <p className="text-body text-[#6B5B5B] mb-8 leading-relaxed">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {showRetry && onRetry && (
            <button
              onClick={onRetry}
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          )}

          {showHomeLink && (
            <Link
              href="/"
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
