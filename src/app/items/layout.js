// Metadata for the items/collection pages
export const metadata = {
  title: 'Vinyl Records Collection | RetroVinyls',
  description:
    'Browse our carefully curated collection of vintage vinyl records. From classic rock to jazz essentials, find your next musical treasure.',
  keywords:
    'vinyl records, vintage music, retro, analog, collectibles, rock, jazz, blues',
  openGraph: {
    title: 'Vinyl Records Collection | RetroVinyls',
    description:
      'Browse our carefully curated collection of vintage vinyl records.',
    type: 'website',
  },
};

export default function ItemsLayout({ children }) {
  return children;
}
