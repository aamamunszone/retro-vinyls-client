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
        // Hardcoded credentials for demo
        const validEmail = 'admin@retro.com';
        const validPassword = 'admin123';

        if (
          credentials?.email === validEmail &&
          credentials?.password === validPassword
        ) {
          return {
            id: '1',
            email: validEmail,
            name: 'RetroVinyls Admin',
            role: 'admin',
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
