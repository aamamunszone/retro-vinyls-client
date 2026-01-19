import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Additional middleware logic can be added here if needed
    console.log('Protected route accessed:', req.nextUrl.pathname);
    console.log('Token present:', !!req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is authenticated for protected routes
        const { pathname } = req.nextUrl;

        console.log('Authorization check for:', pathname);
        console.log('Token:', token ? 'Present' : 'Missing');

        // Protect /items/add route
        if (pathname.startsWith('/items/add')) {
          return !!token;
        }

        // Allow access to other routes
        return true;
      },
    },
    pages: {
      signIn: '/login',
    },
    // Add production-specific settings
    secret: process.env.NEXTAUTH_SECRET,
  },
);

export const config = {
  matcher: [
    '/items/add/:path*',
    // Add other protected routes here as needed
  ],
};
