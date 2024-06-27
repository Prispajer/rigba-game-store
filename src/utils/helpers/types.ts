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

export interface ProductSearchData {
  id: number;
  slug: string;
  background_image: string;
  name: string;
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

export interface RequestResponse<T> {
  data?: T;
  success: boolean;
  message?: string | undefined;
}
export interface UserDataRequest {
  email: string;
  password: string;
  token?: string;
  code?: string;
}

export interface ProductDataRequest {
  externalProductId: number;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  email: string;
}

export interface UserDataResponse {
  emailVerified?: Date;
  twoFactor?: boolean;
}

export interface ProductDataResponse {
  externalProductId?: number;
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  email?: string;
}

export type RequestData = UserDataRequest & ProductDataRequest;
export type ResponseData = UserDataResponse & ProductDataResponse;
