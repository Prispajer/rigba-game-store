import { postgres } from "./postgres";
import {
  User,
  EmailVerificationToken,
  PasswordResetToken,
  TwoFactorToken,
  TwoFactorConfirmation,
} from "@prisma/client";
import { LoggedUserWishList, LoggedUserCart } from "@/utils/helpers/types";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await postgres.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await postgres.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

export const getEmailVerificationTokenByToken = async (
  token: string
): Promise<EmailVerificationToken | null> => {
  try {
    const emailVerificationToken =
      await postgres.emailVerificationToken.findUnique({
        where: { token },
      });
    return emailVerificationToken;
  } catch {
    return null;
  }
};

export const getEmailVerificationTokenByEmail = async (
  email: string
): Promise<EmailVerificationToken | null> => {
  try {
    const emailVerificationToken =
      await postgres.emailVerificationToken.findFirst({
        where: { email },
      });
    return emailVerificationToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (
  token: string
): Promise<PasswordResetToken | null> => {
  try {
    const passwordResetToken = await postgres.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (
  email: string
): Promise<PasswordResetToken | null> => {
  try {
    const passwordResetToken = await postgres.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByToken = async (
  token: string
): Promise<TwoFactorToken | null> => {
  try {
    const twoFactorToken = await postgres.twoFactorToken.findUnique({
      where: { token },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (
  email: string
): Promise<TwoFactorToken | null> => {
  try {
    const twoFactorToken = await postgres.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorConfirmationByUserId = async (
  userId: string
): Promise<TwoFactorConfirmation | null> => {
  try {
    const twoFactorConfirmation =
      await postgres.twoFactorConfirmation.findUnique({
        where: { userId },
      });

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};

export const getUserCart = async (
  userId: string
): Promise<LoggedUserCart | null> => {
  try {
    const userCart = await postgres.cart.findUnique({
      where: { userId },
      include: {
        products: {
          include: {
            productsInformations: true,
          },
        },
      },
    });

    return userCart;
  } catch {
    return null;
  }
};

export const getUserWishList = async (
  userId: string
): Promise<LoggedUserWishList | null> => {
  try {
    const userWishList = await postgres.wishlist.findUnique({
      where: { userId },
      include: {
        products: {
          include: {
            productsInformations: true,
          },
        },
      },
    });

    return userWishList;
  } catch {
    return null;
  }
};
