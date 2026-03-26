import NextAuth, { type DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's role. */
      id: string
      role: string
      country?: string
    } & DefaultSession["user"]
  }

  interface User {
    role: string
    country?: string
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: string
    role: string
    country?: string
  }
}
