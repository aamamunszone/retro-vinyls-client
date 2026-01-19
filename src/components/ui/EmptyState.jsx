/**
 * Empty state component for when no data is available
 * Provides guidance and actions for users
 */

import { Package, Plus } from 'lucide-react';
import Link from 'next/link';

export default function EmptyState({
  title = 'No items found',
  message = 'There are no vinyl records available at the moment.',
  actionText = 'Add First Item',
  actionHref = '/items/add',
  showAction = true,
}) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-[#F7F3F0] rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-8 h-8 text-[#B08968]" />
        </div>

        <h2 className="heading-tertiary text-[#3C2F2F] mb-4">{title}</h2>

        <p className="text-body text-[#6B5B5B] mb-8 leading-relaxed">
          {message}
        </p>

        {showAction && (
          <Link
            href={actionHref}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>{actionText}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
