export interface User {
  id: string;
  name?: string | null;
  email: string | null;
  emailVerified?: Date | null;
  password?: string | null;
  role: string;
  image?: string | null;
  isTwoFactorEnabled: boolean;
}
export interface Token {
  id: string;
  email: string;
  token: string;
  expires: Date;
}

export type EmailVerificationToken = Token;
export type TwoFactorToken = Token;
export type ResetPasswordToken = Token;

export interface Product {
  id?: number;
  externalProductId?: number;
  name: string;
  price: number;
  background_image: string;
  quantity?: number;
  rating?: number;
  slug?: string;
  description?: string;
  description_raw?: string;
}

export interface LoggedUserProduct extends Product {
  email: string;
}

export interface LoggedUserCart {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoggedUserUpdatedProduct {
  id: string;
  externalProductId: number;
  cartId: string;
  quantity: number;
}

export interface LoggedUserWishlist {
  id: string;
  userId: string;
  products: LoggedUserProduct[];
}

export interface RequestResponse<T> {
  data?: T;
  success?: boolean;
  message?: string;
  twoFactor?: boolean;
}

export interface UserDataRequest {
  email: string;
  password: string;
  token?: string;
  code?: string;
}

export interface ProductDataRequest {
  externalProductId: number;
  quantity: number;
}

export type RequestData = UserDataRequest & ProductDataRequest;

export interface GameAPIResponse extends Product {
  slug?: string;
  background_image: string;
  rating?: number;
  added?: number;
  image_background?: string;
  games_count?: number;
}

export interface SearchData {
  id: number;
  name: string;
  slug?: string;
  background_image?: string;
  games_count?: number;
}

export type ProfileModalContainerProps = {
  navItems?: { href: string; icon: IconType; label: string }[];
  translateX?: string;
  translateY?: string;
};

export enum SignInProvider {
  Credentials = "credentials",
  Google = "google",
  Facebook = "facebook",
  Discord = "discord",
}

export enum ViewType {
  Home = "home",
  Filters = "filters",
  Similar = "similar",
}
