import './globals.css';

export const metadata = {
  title: 'RetroVinyls | Rediscover the Classics',
  description:
    'Premium platform for vintage music enthusiasts. Discover rare vinyl records and authentic analog experiences.',
  keywords: 'vinyl records, vintage music, retro, analog, collectibles',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
