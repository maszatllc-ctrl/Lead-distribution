import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { Role } from "@prisma/client"
import type { NextAuthConfig } from "next-auth"

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.id = user.id
      }
      return token
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.role = user.role as Role
      }
      return session
    },
    async signIn({ user }) {
      // Ensure seller profile exists on first sign-in for sellers
      if (user.role === Role.seller) {
        const seller = await prisma.seller.findUnique({ where: { userId: user.id } })
        if (!seller) {
          await prisma.seller.create({
            data: {
              userId: user.id,
              companyName: user.name ?? "New Seller",
            },
          })
        }
      }
      return true
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
