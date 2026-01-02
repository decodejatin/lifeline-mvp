import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Admin',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // TODO: Validate against admin users table in Prisma
        // For MVP, accept demo@lifeline.local as admin
        if (credentials?.email === 'demo@lifeline.local' && credentials?.password === 'demo123') {
          return {
            id: '1',
            name: 'Demo Admin',
            email: 'demo@lifeline.local',
            role: 'admin'
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || 'user'
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).role = (token.role as string) || 'user';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).id = (token.id as string);
      }
      return session
    }
  }
})
