import { postgres } from "./postgres";
import {
  EmailVerificationToken,
  PasswordResetToken,
  TwoFactorToken,
  TwoFactorConfirmation,
} from "@prisma/client";
import { UserCart, UserWishList } from "@/utils/helpers/types";

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

export const getUserCart = async (userId: string): Promise<UserCart | null> => {
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
): Promise<UserWishList | null> => {
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

export const getProductReviews = async (
  externalProductId: number
): Promise<any | null> => {
  try {
    const productReviews = await postgres.product.findFirst({
      where: { externalProductId: externalProductId },
      include: {
        reviews: {
          include: {
            rating: true,
            user: true,
          },
        },
      },
    });
    return productReviews;
  } catch {
    return null;
  }
};
