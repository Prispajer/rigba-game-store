import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { postgres } from "@/data/database/publicSQL/postgres";
import { getTwoFactorConfirmationByUserId } from "@/data/database/publicSQL/queries";
import authConfig from "./auth.config";
import {
  getUserById,
  getUserCart,
  getUserWishList,
} from "@/data/database/publicSQL/queries";
import { Cart, UserRole, Wishlist } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  isTwoFactorEnabled: boolean;
  emailVerificationDate: Date;
  role: UserRole;
  cartId: string | null;
  wishlistId: string | null;
  cart: Cart | null;
  wishlist: Wishlist | null;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
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
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById(user.id as string);

      if (!existingUser?.emailVerified) {
        return false;
      }

      if (existingUser?.isTwoFactorEnabled) {
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
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      const userCart = await getUserCart(existingUser.id);
      const userWishList = await getUserWishList(existingUser.id);

      token.role = existingUser.role;
      token.cartId = userCart?.id || null;
      token.wishlistId = userWishList?.id || null;
      token.twoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.emailVerificationDate = existingUser.emailVerified;

      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as UserRole;
        session.user.cartId = token.cartId as string;
        session.user.wishlistId = token.wishlistId as string;
        session.user.isTwoFactorEnabled = token.twoFactorEnabled as boolean;
        session.user.emailVerificationDate =
          token.emailVerificationDate as Date;

        if (session.user.cartId) {
          session.user.cart = await getUserCart(session.user.id);
        }
        if (session.user.wishlistId) {
          session.user.wishlist = await getUserWishList(session.user.id);
        }
      }
      return session;
    },
  },
  adapter: PrismaAdapter(postgres),
  session: { strategy: "jwt" },
  ...authConfig,
});
