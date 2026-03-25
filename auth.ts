import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { MOCK_USERS } from '@/lib/mock-data';

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret:
    process.env.AUTH_SECRET ??
    process.env.NEXTAUTH_SECRET ??
    'dev-only-auth-secret-change-in-production',
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // DEMO MODE: Accept any email/password combination
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) return null;

        // Check if user matches a known mock user
        const mockUser = MOCK_USERS.find((u) => u.email === email);

        if (mockUser) {
          return {
            id: mockUser.id,
            email: mockUser.email,
            name: mockUser.name,
            role: mockUser.role,
          };
        }

        // For any other email/password, create a demo guest account
        const name = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        return {
          id: `demo-${Date.now()}`,
          email,
          name,
          role: 'guest',
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
});
