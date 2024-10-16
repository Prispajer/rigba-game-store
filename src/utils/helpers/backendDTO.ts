export type CheckDataExistsAndReturnUserDTO = {
  email: string;
  externalProductId: number;
};

export type CheckDataExistsAndReturnProductDTO = {
  userId: string;
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
  externalProductId: number;
};

export type CheckDataExistsAndReturnReviewDTO = {
  userId: string;
  productId: string;
};

export type CheckDataExistsAndReturnReviewLikersDTO = {
  userId: string;
  productId: string;
  reviewId: string;
};

export type CheckDataExistsAndReturnUserCartProductDTO = {
  id: string;
  externalProductId: number;
};

export type CheckDataExistsAndReturnUserWishListProductDTO = {
  id: string;
  externalProductId: number;
};

export type CheckIsUserPasswordCorrectDTO = {
  password: string;
};

export type CheckIsEmailInUseDTO = {
  email: string;
};

export type LoginUserDTO = {
  email: string;
  password?: string;
  code?: string;
};

export type RegisterUserDTO = {
  password: string;
  email: string;
};

export type ConfirmEmailVerificationDTO = {
  email?: string;
  token: string;
};

export type SetNewPasswordDTO = {
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

export type UpdatePersonalDataDTO = {
  email: string;
  fullName?: string;
  birthDate?: Date;
  address?: string;
  state?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  phoneNumber?: string;
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

export type SendToggleTwoFactorToken = {
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
};

export type GetUserWishListDTO = {
  email: string;
};

export type GetProductByExternalProductIdDTO = {
  userId: string;
  externalProductId: number;
};

export type GetProductReviewsDTO = {
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
  productId: string;
  name: string;
  price: number;
  background_image: string;
  rating: number;
  description: string;
  slug: string;
  percent: number;
  released: string;
  added: string;
  title: string;
  likes: number;
};

export type CreateReviewDTO = {
  userId: string;
  productId: string;
  likes: number;
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
  rating: number;
  slug: string;
  released: string;
  added: number;
};

export type CreateUserWishListProductDTO = {
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
  email: string;
  externalProductId: number;
};

export type DeleteUserProductFromWishListDTO = {
  id: string;
  email: string;
  externalProductId: number;
};

export type DeleteUserProductDTO = {
  id: string;
  email: string;
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
  quantity: number;
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

export type UpdateReviewLikeDTO = {
  id: string;
  likes: number;
};

export type UpdateReviewUnLikeDTO = {
  id: string;
  likes: number;
};
