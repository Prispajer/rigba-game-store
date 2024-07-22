import ProductDescription from "@/components/Interface/Product/ProductDescription";
// import { RowDataPacket } from "mysql2";
// extends RowDataPacket
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

export interface EmailVerificationToken {
  id: string;
  email: string;
  token: string;
  expires: Date;
}
export interface TwoFactorToken {
  id: string;
  email: string;
  token: string;
  expires: Date;
}

export interface ResetPasswordToken {
  id: string;
  email: string;
  token: string;
  expires: Date;
}

export type ProductDetails = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  ratings_count: number;
};

export type ProductRatings = {
  id: number;
  count: number;
  percent: number;
  title: string;
}[];

export type ProductDescription = {
  description_raw: string;
};

export interface LoggedUserProduct {
  email: string;
  externalProductId: number;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
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
export interface LocalStorageProduct {
  externalProductId: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export type Product = ProductDetails & ProductDescription;

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

export interface RequestResponse<T> {
  data?: T;
  success?: boolean;
  message?: string | undefined;
  twoFactor?: boolean;
}
export interface UserDataRequest {
  email: string;
  password: string;
  token?: string;
  code?: string;
}

export interface GameAPIResponse {
  id: number;
  slug?: string;
  name: string;
  background_image: string;
  rating?: number;
  added?: number;
  games_count?: number;
  image_background?: string;
  price: number;
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

export type RequestData = UserDataRequest & ProductDataRequest;
