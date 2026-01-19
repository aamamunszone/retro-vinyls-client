import './globals.css';
import AuthProvider from '@/providers/AuthProvider';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'RetroVinyls | Rediscover the Classics',
  description:
    'Premium platform for vintage music enthusiasts. Discover rare vinyl records and authentic analog experiences.',
  keywords: 'vinyl records, vintage music, retro, analog, collectibles',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning={true}>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#3C2F2F',
                color: '#FFFBEB',
                borderRadius: '8px',
                fontSize: '14px',
              },
              success: {
                iconTheme: {
                  primary: '#B08968',
                  secondary: '#FFFBEB',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#FFFBEB',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
