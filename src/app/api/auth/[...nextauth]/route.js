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
        // Hardcoded credentials for now
        const validEmail = 'admin@retro.com';
        const validPassword = 'admin123';

        if (
          credentials?.email === validEmail &&
          credentials?.password === validPassword
        ) {
          // Return user object if credentials are valid
          return {
            id: '1',
            email: validEmail,
            name: 'RetroVinyls Admin',
            role: 'admin',
          };
        }

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
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist user data in the token
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Ensure NEXTAUTH_URL is properly recognized
  url: process.env.NEXTAUTH_URL,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
