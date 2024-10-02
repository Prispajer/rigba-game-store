import { IconType } from "react-icons/lib";
export interface User {
  id: string;
  name?: string | null;
  email: string;
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
  id?: string | number;
  externalProductId?: number | string;
  name: string;
  price: number;
  background_image: string;
  quantity?: number;
  rating?: number;
  slug?: string;
  added?: number;
  released?: string;
  ratings_count?: number;
  description?: string;
  description_raw?: string;
}

export interface ProductInformations {
  id: string;
  productId: string | null;
  name: string;
  slug: string;
  description: string | null;
  rating: number | null;
  price: number;
  background_image: string | null;
}

export interface UserWishList {
  id: string;
  externalProductId: number;
  productsInformations: Product;
}
export interface UserCart {
  id: string;
  externalProductId: number;
  productsInformations: Product;
}

export interface UserReviews {
  id: string;
  createdAt: Date;
  likes: number;
  rating: {
    description: string;
    rating: number;
  };
  user: {
    email: string;
    image: string;
    name: string;
  };
}
export interface RequestResponse<T> {
  data?: T | null;
  success?: boolean;
  message?: string;
  twoFactor?: boolean;
}
export interface GameAPIResponse extends Product {
  image_background?: string;
  games_count?: number;
  playtime?: number;
  genres: { id: number; name: string }[];
  platforms: {
    platform: {
      name: string;
    };
    released_at: string;
    requirements: {
      minimum?: string;
      recommended?: string;
    };
  }[];
  publishers: { name: string }[];
  developers: { name: string }[];
  screenshots: { id: number; image: string }[];
  ratings: { count: number; id: number; title: string; percent: number }[];
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

export enum NavCurrentElement {
  Category = "category",
  SubCategory = "subcategory",
  Link = "link",
}

export const CLASSTYPES = {
  IUserService: Symbol.for("IUserService"),
  IUserRepository: Symbol.for("IUserRepository"),
  IUserUtils: Symbol.for("IUserUtils"),
  ITokenService: Symbol.for("ITokenService"),
  ITokenRepository: Symbol.for("ITokenRepository"),
  ITokenUtils: Symbol.for("ITokenUtils"),
  IProductService: Symbol.for("IProductService"),
  IProductRepository: Symbol.for("IProductRepository"),
  IProductUtils: Symbol.for("IProductUtils"),
  ICheckerService: Symbol.for("ICheckerService"),
};
