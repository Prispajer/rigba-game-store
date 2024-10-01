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

export type UserDTO = {
  email: string;
  password?: string;
  newPassword?: string;
  emailVerified?: Date | null;
  code?: string;
  token?: string;
  fullName?: string;
  birthDate?: Date;
  address?: string;
  state?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  phoneNumber?: string;
};

export type RegisterUserDTO = {
  email: string;
  password: string;
};
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

export type TokenConstructor = {
  email?: string;
  password?: string;
  newPassword?: string;
  code?: string;
  token?: string;
};

export type ProductConstructor = {
  email?: string;
  externalProductId?: number;
  name?: string;
  description?: string;
  price?: number;
  background_image?: string;
  rating?: number;
  slug?: string;
  released?: string;
  added?: number;
  title?: string;
  likes?: number;
  reviewId?: string;
};

export const CLASSTYPES = {
  IUserService: Symbol.for("IUserService"),
  IUserRepository: Symbol.for("IUserRepository"),
  IUserQueries: Symbol.for("IUserQueries"),
  ITokenService: Symbol.for("ITokenService"),
  ITokenRepository: Symbol.for("ITokenRepository"),
  ITokenQueries: Symbol.for("ITokenQueries"),
  ICheckerService: Symbol.for("ICheckerService"),
};
