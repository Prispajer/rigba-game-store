import { UserRole } from "@prisma/client";

export type CheckDataExistsAndReturnUserDTO = {
  email: string;
};

export type CheckDataExistsAndReturnUserPersonalDataDTO = {
  id: string;
};

export type CheckDataExistsAndReturnProductDTO = {
  userId: string | null;
  externalProductId: number;
};

export type CheckDataExistsAndReturnUserCartDTO = {
  email: string;
  id: string;
};

export type CheckDataExistsAndReturnUserWishListDTO = {
  email: string;
  id: string;
};

export type CheckDataExistsAndReturnProductReviewsDTO = {
  userId: string | null;
  externalProductId: number;
};

export type CheckDataExistsAndReturnReviewDTO = {
  reviewId: string;
  productId: string;
};

export type CheckDataExistsAndReturnReviewLikersDTO = {
  userId: string;
  productId: string;
  reviewId: string;
};

export type CheckDataExistsAndReturnUserProductHistoryDTO = {
  email: string;
  userId: string;
};

export type CheckDataExistsAndReturnUserOrderHistoryDTO = {
  email: string;
  userId: string;
};

export type CheckIsUserPasswordCorrectDTO = {
  password: string;
};

export type CheckIsUserPasswordPreviousPasswordDTO = {
  password: string;
};

export type CheckIsEmailInUseDTO = {
  email: string;
};

export type CheckIsTokenValidAndReturnTwoFactorTokenDTO = {
  email: string;
  code: string;
};

export type CheckIsTokenValidAndReturnPasswordResetTokenDTO = {
  email: string;
  token: string;
};

export type LoginUserDTO = {
  email: string;
  password: string;
  code: string;
};

export type RegisterUserDTO = {
  password: string;
  email: string;
};

export type ConfirmEmailVerificationDTO = {
  email: string;
  token: string;
};

export type ConfirmTwoFactorAuthenticationDTO = {
  name: string | null;
  id: string;
  email: string;
  emailVerified: Date | null;
  password: string | null;
  role: UserRole;
  image: string | null;
  isTwoFactorEnabled: boolean;
  code: string;
};

export type SetNewPasswordDTO = {
  email: string;
  token: string;
  password: string;
};

export type ChangePasswordDTO = {
  email: string;
  code: string;
  newPassword: string;
};

export type ToggleTwoFactorDTO = {
  email: string;
  code: string;
};

export type UpdateUserDataDTO = {
  email: string;
  id?: string;
  fullName?: string;
  birthDate?: Date;
  address?: string;
  state?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  phoneNumber?: string;
};

export type PersonalDataToUpdateDTO = {
  fullName?: string;
  birthDate?: Date;
  address?: string;
  state?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  phoneNumber?: string;
};

export type UpdateUserNameDTO = {
  email: string;
  name: string;
};

export type UpdatePersonalDataDTO = {
  id: string;
};

export type UpdatePersonalImageDTO = {
  id: string;
  image: string;
};

export type UpdateUserImageDTO = {
  email: string;
  image: string;
};

export type UpdateReviewLikeDTO = {
  id: string;
  likes: number;
};

export type UpdateReviewUnLikeDTO = {
  id: string;
  likes: number;
};

export type UpdatePasswordDTO = {
  email?: string;
  password: string;
};

export type TokenDTO = {
  email: string;
};

export type SendResetPasswordTokenDTO = {
  email: string;
};

export type SendChangePasswordTokenDTO = {
  email: string;
  password: string;
};

export type SendToggleTwoFactorTokenDTO = {
  email: string;
  password: string;
};

export type GetUserByEmailDTO = {
  email: string;
};

export type GetTwoFactorConfirmationByUserIdDTO = {
  id: string;
};

export type GetUserByIdDTO = {
  id: string;
};

export type GetUserCartDTO = {
  email: string;
  id: string;
};

export type GetUserProductHistoryDTO = {
  email: string;
  userId: string;
};

export type GetUserOrderHistoryDTO = {
  email: string;
  userId: string;
};

export type GetUserPersonalDataDTO = {
  id: string;
};

export type GetUserWishListDTO = {
  id: string;
  email: string;
};

export type GetProductByExternalProductIdDTO = {
  userId: string | null;
  externalProductId: number;
};

export type GetProductReviewsDTO = {
  userId: string | null;
  externalProductId: number;
};

export type GetUserCartProductDTO = {
  id: string;
  externalProductId: number;
};

export type GetReviewDTO = {
  reviewId: string;
  productId: string;
};

export type GetReviewLikerDTO = {
  userId: string;
  productId: string;
  reviewId: string;
};

export type GetUserWishListProductDTO = {
  id: string;
  externalProductId: number;
};

export type AddProductToCartDTO = {
  email: string;
  externalProductId: number;
  name: string;
  description: string;
  price: number;
  background_image: string;
  rating: number;
  quantity?: number;
  slug: string;
  released: string;
  added: number;
};

export type AddProductToWishListDTO = {
  id: string;
  email: string;
  externalProductId: number;
  name: string;
  description: string;
  price: number;
  background_image: string;
  rating: number;
  slug: string;
  released: string;
  added: number;
};

export type AddReviewToProductDTO = {
  email: string;
  externalProductId: number;
  reviewId: string;
  userId: string;
  name: string;
  price: number;
  background_image: string;
  rating: number;
  description: string;
  slug: string;
  percent: number;
  released: string;
  added: number;
  title: string;
  likes: number;
};

export type CreateReviewDTO = {
  userId: string;
  productId: string;
  likes: number;
};

export type CreatePersonalDataDTO = {
  id: string;
};

export type CreateReviewLikerDTO = {
  userId: string;
  productId: string;
  reviewId: string;
};

export type CreateRatingDTO = {
  reviewId: string;
  rating: number;
  title: string;
  percent: number;
  description: string;
};

export type CreateUserCartProductDTO = {
  cartId: string;
  userId: string;
  externalProductId: number;
  name: string;
  description: string;
  price: number;
  background_image: string;
  quantity?: number;
  rating: number;
  slug: string;
  released: string;
  added: number;
};

export type CreateUserProductWishListDTO = {
  wishListId: string;
  userId: string;
  externalProductId: number;
  name: string;
  description: string;
  price: number;
  background_image: string;
  rating: number;
  slug: string;
  released: string;
  added: number;
};

export type CreateProductToReviewDTO = {
  externalProductId: number;
  name: string;
  description: string;
  price: number;
  background_image: string;
  rating: number;
  slug: string;
  released: string;
  added: number;
};

export type DeleteProductFromCartDTO = {
  email: string;
  externalProductId: number;
};

export type DeleteProductFromWishListDTO = {
  email: string;
  externalProductId: number;
};

export type DeleteUserProductFromCartDTO = {
  id: string;
  externalProductId: number;
};

export type DeleteUserProductFromWishListDTO = {
  id: string;
  externalProductId: number;
};

export type DeleteUserProductDTO = {
  id: string;
  externalProductId: number;
};

export type DeleteReviewLikerDTO = {
  userId: string;
  productId: string;
  reviewId: string;
};

export type IncreaseProductQuantityDTO = {
  email: string;
  externalProductId: number;
};

export type DecreaseProductQuantityDTO = {
  email: string;
  externalProductId: number;
};

export type UserProductQuantityDTO = {
  id: string;
  userId: string;
  quantity: number | null;
};

export type LikeReviewDTO = {
  email: string;
  externalProductId: number;
  reviewId: string;
};

export type UnLikeReviewDTO = {
  email: string;
  externalProductId: number;
  reviewId: string;
};
