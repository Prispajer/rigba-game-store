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

export interface GameAPIProduct {
  id: number;
  externalProductId: number | string;
  name: string;
  price: number;
  background_image: string;
  description_raw?: string;
  rating?: number;
  slug: string;
  released?: string;
  added?: number;
  ratings_count?: number;
}

export interface ProductInformations {
  name: string;
  price: number;
  background_image: string;
  description?: string;
  rating?: number;
  slug: string;
  released?: string;
  added?: number;
}

export interface UserWishList {
  id: string;
  externalProductId: number;
  productsInformations: ProductInformations;
}
export interface UserCart {
  id: string;
  externalProductId: number;
  productsInformations: ProductInformations;
}

export interface LocalWishList {
  externalProductId: number;
  name: string;
  price: number;
  background_image: string;
  description?: string;
  rating?: number;
  slug?: string;
  released?: string;
  added?: number;
}

export interface LocalCart extends ProductInformations {
  externalProductId: number;
  quantity: number;
}

export interface UserReviews {
  id: string;
  createdAt: Date;
  likes: number;
  rating: {
    description: string;
    rating: number;
    percent: number;
    title: string;
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
export interface GameAPIResponse extends GameAPIProduct {
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
  ICartService: Symbol.for("ICartService"),
  ICartRepository: Symbol.for("ICartRepository"),
  IWishListService: Symbol.for("IWishListService"),
  IWishListRepository: Symbol.for("IWishListRepository"),
  IReviewService: Symbol.for("IReviewService"),
  IReviewRepository: Symbol.for("IReviewRepository"),
  IProductService: Symbol.for("IProductService"),
  IProductRepository: Symbol.for("IProductRepository"),
  IProductUtils: Symbol.for("IProductUtils"),
  ICheckerService: Symbol.for("ICheckerService"),
};
