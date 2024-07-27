import { postgres } from "./postgres";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await postgres.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await postgres.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

export const getEmailVerificationTokenByToken = async (token: string) => {
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

export const getEmailVerificationTokenByEmail = async (email: string) => {
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

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await postgres.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await postgres.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await postgres.twoFactorToken.findUnique({
      where: { token },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await postgres.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
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

export const getUserCart = async (userId: string) => {
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

export const getUserWishList = async (userId: string) => {
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
