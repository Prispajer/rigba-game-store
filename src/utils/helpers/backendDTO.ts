export type CheckDataExistsAndReturnUserDTO = {
  email: string;
  externalProductId: number;
};

export type CheckDataExistsAndReturnProductDTO = {
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

export type CheckDataExistsAndReturnUserCartProductDTO = {
  id: string;
  externalProductId: number;
};

export type CheckDataExistsAndReturnUserWishListProductDTO = {
  id: string;
  externalProductId: number;
};

export type CheckUserExistsDTO = {
  email: string;
};

export type CheckTokenExistsDTO = {
  email: string;
};

export type CheckIsEmailInUse = {
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
  id: string;
};

export type GetUserWishListDTO = {
  email: string;
  id: string;
};

export type GetProductByExternalProductIdDTO = {
  externalProductId: number;
};

export type GetProductReviewsDTO = {
  externalProductId: number;
};

export type GetUserCartProductDTO = {
  id: string;
  externalProductId: number;
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

export type CreateUserDTO = {
  email: string;
  password: string;
};

export type CreateUserCartProductDTO = {
  cartId: string;
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

export type UserProductQuantityDTO = {
  id: string;
  quantity: number;
};
