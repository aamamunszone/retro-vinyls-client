import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Enhanced middleware logic for production debugging
    const { pathname } = req.nextUrl;
    const token = req.nextauth?.token;

    console.log('🔐 Middleware - Route:', pathname);
    console.log('🔐 Middleware - Token exists:', !!token);
    console.log(
      '🔐 Middleware - Token details:',
      token
        ? {
            email: token.email,
            role: token.role,
            exp: token.exp,
            iat: token.iat,
          }
        : 'No token',
    );

    // Log session token cookie for debugging
    const sessionCookie =
      req.cookies.get('next-auth.session-token') ||
      req.cookies.get('__Secure-next-auth.session-token');
    console.log('🔐 Middleware - Session cookie exists:', !!sessionCookie);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        console.log('🔐 Authorization check for:', pathname);
        console.log(
          '🔐 Token in authorized callback:',
          token ? 'Present' : 'Missing',
        );

        // Protect /items/add route - require valid token
        if (pathname.startsWith('/items/add')) {
          const isAuthorized = !!token && !!token.email;
          console.log('🔐 Authorization result for /items/add:', isAuthorized);
          return isAuthorized;
        }

        // Allow access to other routes
        return true;
      },
    },
    pages: {
      signIn: '/login',
    },
    // Explicit secret for production compatibility
    secret: process.env.NEXTAUTH_SECRET,
    // Add JWT configuration for consistency
    jwt: {
      secret: process.env.NEXTAUTH_SECRET,
    },
  },
);

export const config = {
  matcher: [
    '/items/add/:path*',
    // Ensure we catch all variations
    '/items/add',
  ],
};
