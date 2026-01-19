import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'admin@retro.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        console.log('🔐 NextAuth - Authorize attempt for:', credentials?.email);

        // Hardcoded credentials for now
        const validEmail = 'admin@retro.com';
        const validPassword = 'admin123';

        if (
          credentials?.email === validEmail &&
          credentials?.password === validPassword
        ) {
          console.log('🔐 NextAuth - Authorization successful');
          // Return user object if credentials are valid
          return {
            id: '1',
            email: validEmail,
            name: 'RetroVinyls Admin',
            role: 'admin',
          };
        }

        console.log('🔐 NextAuth - Authorization failed');
        // Return null if credentials are invalid
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === 'production'
          ? '__Secure-next-auth.session-token'
          : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain:
          process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined,
      },
    },
    callbackUrl: {
      name:
        process.env.NODE_ENV === 'production'
          ? '__Secure-next-auth.callback-url'
          : 'next-auth.callback-url',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain:
          process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined,
      },
    },
    csrfToken: {
      name:
        process.env.NODE_ENV === 'production'
          ? '__Host-next-auth.csrf-token'
          : 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('🔐 NextAuth - JWT callback:', {
        hasToken: !!token,
        hasUser: !!user,
        userEmail: user?.email,
      });

      // Persist user data in the token
      if (user) {
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('🔐 NextAuth - Session callback:', {
        hasSession: !!session,
        hasToken: !!token,
        tokenEmail: token?.email,
      });

      // Send properties to the client
      if (token) {
        session.user.id = token.sub || token.id;
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('🔐 NextAuth - Redirect callback:', { url, baseUrl });

      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log('🔐 NextAuth - SignIn event:', { user: user?.email });
    },
    async signOut({ session, token }) {
      console.log('🔐 NextAuth - SignOut event');
    },
    async session({ session, token }) {
      console.log('🔐 NextAuth - Session event:', {
        user: session?.user?.email,
      });
    },
  },
  // Critical production settings
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  useSecureCookies: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
