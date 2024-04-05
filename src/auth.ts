import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "@/data/database/publicSQL/queries";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { postgres } from "@/data/database/publicSQL/postgres";
import { UserRole } from "@prisma/client";

export type ExtentedUser = DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    user: ExtentedUser;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await postgres.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(postgres),
  session: { strategy: "jwt" },
  ...authConfig,
});
