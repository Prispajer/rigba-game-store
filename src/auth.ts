import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "@/data/database/publicSQL/queries";
import { getTwoFactorConfirmationByUserId } from "@/data/database/publicSQL/queries";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { postgres } from "@/data/database/publicSQL/postgres";
import { UserRole, Cart } from "@prisma/client";

export type ExtentedUser = DefaultSession["user"] & {
  role: UserRole;
  cart: Cart | null;
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
    async signIn({ user, account }): Promise<T> {
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById(user.id as string);

      if (!existingUser?.emailVerified) {
        return false;
      }
      if (!existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) {
          return false;
        }

        await postgres.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (token.cart && session.user) {
        session.user.cart = token.cart as Cart;
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

      const userCart = await postgres.cart.findUnique({
        where: { userId: existingUser.id },
        include: {
          products: {
            include: {
              productsInformations: true,
            },
          },
        },
      });

      token.cart = userCart;

      return token;
    },
  },
  adapter: PrismaAdapter(postgres),
  session: { strategy: "jwt" },
  ...authConfig,
});
