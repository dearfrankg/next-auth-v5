import { Adapter } from "next-auth/adapters";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true, // bug in next-auth - should remove later
  theme: { logo: "/logo.png" },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [Google, GitHub],
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
});
