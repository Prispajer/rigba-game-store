import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { postgres } from "@/lib/db";
import authConfig from "./auth.config";
import {
  userRepository,
  cartRepository,
  wishlistRepository,
} from "./utils/injector";
import { Cart, PersonalData, UserRole, Wishlist } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  email: string;
  password: string;
  isTwoFactorEnabled: boolean;
  emailVerificationDate: Date;
  role: UserRole;
  cartId: string | null;
  wishListId: string | null;
  personalDataId: string | null;
  cart: Cart | null;
  wishList: Wishlist | null;
  personalData: PersonalData | null;
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
  cookies: {
    sessionToken: {
      name: "authjs.session-token",
      options: {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
      },
    },
    csrfToken: {
      name: "authjs.csrf-token",
      options: {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
      },
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await userRepository.getUserById({
        id: user.id as string,
      });

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

      const existingUser = await userRepository.getUserById({ id: token.sub });

      if (!existingUser) {
        return token;
      }

      const userCart = await cartRepository.getUserCart(existingUser);
      const userWishlist = await wishlistRepository.getUserWishlist(
        existingUser
      );
      const userPersonalData = await userRepository.getUserPersonalData(
        existingUser
      );

      token.role = existingUser.role;
      token.cartId = userCart?.id || null;
      token.wishListId = userWishlist?.id || null;
      token.personalDataId = userPersonalData?.id || null;
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
        session.user.personalDataId = token.personalDataId as string;
        session.user.isTwoFactorEnabled = token.twoFactorEnabled as boolean;
        session.user.emailVerificationDate =
          token.emailVerificationDate as Date;

        if (session.user.cartId) {
          session.user.cart = await cartRepository.getUserCart(session.user);
        }
        if (session.user.wishListId) {
          session.user.wishList = await wishlistRepository.getUserWishlist(
            session.user
          );
        }
        if (session.user.personalDataId) {
          session.user.personalData = await userRepository.getUserPersonalData(
            session.user
          );
        }
        if (session.user.email) {
          const user = await userRepository.getUserByEmail(session.user);

          session.user = {
            ...session.user,
            id: user?.id as string,
            name: user?.name,
            email: user?.email as string,
            emailVerified: user?.emailVerified as Date,
            image: user?.image,
            password: user?.password as string,
            role: user?.role as UserRole,
            isTwoFactorEnabled: user?.isTwoFactorEnabled as boolean,
          };
        }
      }

      return session;
    },
  },
  adapter: PrismaAdapter(postgres) as any,
  session: { strategy: "jwt", maxAge: 60 * 60 },
  ...authConfig,
});
