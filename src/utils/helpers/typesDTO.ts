export type CheckDataExistsDTO = {
  email: string;
  externalProductId: number;
};

export type CheckUserExistsDTO = {
  email: string;
};

export type CheckTokenExistsDTO = {
  email: string;
};

export type CheckIsUserPasswordCorrectDTO = {
  email: string;
  password: string;
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

export type GetUserCartDTO = {
  email: string;
};

export type GetUserWishListDTO = {
  email: string;
};

export type GetProductReviewsDTO = {
  externalProductId: number;
};

export type AddProductToDataDTO = {
  id: string;
  externalProductId: number;
  name: string;
  description: string;
  price: number;
  background_image: string;
  slug: string;
  released: string;
  added: number;
};

export type AddProductToCartDTO = { email: string; externalProductId: number };

export type CreateUserCartProductDTO = {
  id: string;
  externalProductId: number;
  name: string;
  description: string;
  price: number;
  background_image: string;
  slug: string;
  released: string;
  added: number;
};
