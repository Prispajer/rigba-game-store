import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { postgres } from "@/data/database/publicSQL/postgres";
import authConfig from "./auth.config";
import { userRepository, productRepository } from "./utils/injector";
import { Cart, UserRole, WishList } from "@prisma/client";
import { UserCart, UserWishList } from "./utils/helpers/types";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  isTwoFactorEnabled: boolean;
  emailVerificationDate: Date;
  role: UserRole;
  cartId: string | null;
  wishListId: string | null;
  cart: UserCart | null;
  wishList: UserWishList | null;
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

      const existingUser = await userRepository.getUserById(user);

      if (!existingUser?.emailVerified) {
        return false;
      }

      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation =
          await userRepository.getTwoFactorConfirmationByUserId(existingUser);

        if (!twoFactorConfirmation) {
          return false;
        }

        await postgres.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });

        await postgres.twoFactorConfirmation.create({
          data: {
            userId: user.id as string,
          },
        });
      }

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await userRepository.getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      const userCart = await productRepository.getUserCart(existingUser);
      const userWishList = await productRepository.getUserWishList(
        existingUser
      );

      token.role = existingUser.role;
      token.cartId = userCart?.id || null;
      token.wishListId = userWishList?.id || null;
      token.twoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.emailVerificationDate = existingUser.emailVerified;

      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as UserRole;
        session.user.cartId = token.cartId as string;
        session.user.wishListId = token.wishListId as string;
        session.user.isTwoFactorEnabled = token.twoFactorEnabled as boolean;
        session.user.emailVerificationDate =
          token.emailVerificationDate as Date;

        if (session.user.cartId) {
          session.user.cart = await productRepository.getUserCart(session.user);
        }
        if (session.user.wishListId) {
          session.user.wishList = await productRepository.getUserWishList(
            session.user
          );
        }
      }
      return session;
    },
  },
  adapter: PrismaAdapter(postgres),
  session: { strategy: "jwt" },
  ...authConfig,
});
