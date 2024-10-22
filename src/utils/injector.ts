import "reflect-metadata";
import { Container } from "inversify";
import UserService from "../services/UserService";
import type IUserService from "@/interfaces/IUserService";
import UserRepository from "@/repositories/UserRepository";
import type IUserRepository from "@/interfaces/IUserRepository";
import UserUtils from "@/data/utils/UserUtils";
import type IUserUtils from "@/interfaces/IUserUtils";
import TokenService from "../services/TokenService";
import type ITokenService from "@/interfaces/ITokenService";
import TokenRepository from "@/repositories/TokenRepository";
import type ITokenRepository from "@/interfaces/ITokenRepository";
import TokenUtils from "@/data/utils/TokenUtils";
import type ITokenUtils from "@/interfaces/ITokenUtils";
import ProductRepository from "@/repositories/ProductRepository";
import type IProductRepository from "@/interfaces/IProductRepository";
import ProductUtils from "@/data/utils/ProductUtils";
import type IProductUtils from "@/interfaces/IProductUtils";
import CheckerService from "../services/CheckerService";
import type ICheckerService from "@/interfaces/ICheckerService";
import WishListService from "@/services/WishListService";
import type IWishListService from "@/interfaces/IWishListService";
import WishListRepository from "@/repositories/WishListRepository";
import type IWishListRepository from "@/interfaces/IWishListRepository";
import CartService from "@/services/CartService";
import type ICartService from "@/interfaces/ICartService";
import CartRepository from "@/repositories/CartRepository";
import type ICartRepository from "@/interfaces/ICartRepository";
import ReviewService from "@/services/ReviewService";
import type IReviewService from "@/interfaces/IReviewService";
import ReviewRepository from "@/repositories/ReviewRepository";
import type IReviewRepository from "@/interfaces/IReviewRepository";
import { CLASSTYPES } from "@/utils/helpers/types";

const container = new Container();

container.bind<IUserService>(CLASSTYPES.IUserService).to(UserService);
container.bind<IUserRepository>(CLASSTYPES.IUserRepository).to(UserRepository);
container.bind<IUserUtils>(CLASSTYPES.IUserUtils).to(UserUtils);
container.bind<ITokenService>(CLASSTYPES.ITokenService).to(TokenService);
container
  .bind<ITokenRepository>(CLASSTYPES.ITokenRepository)
  .to(TokenRepository);
container.bind<ITokenUtils>(CLASSTYPES.ITokenUtils).to(TokenUtils);
container
  .bind<IProductRepository>(CLASSTYPES.IProductRepository)
  .to(ProductRepository);
container.bind<ICartService>(CLASSTYPES.ICartService).to(CartService);
container.bind<ICartRepository>(CLASSTYPES.ICartRepository).to(CartRepository);
container
  .bind<IWishListService>(CLASSTYPES.IWishListService)
  .to(WishListService);
container
  .bind<IWishListRepository>(CLASSTYPES.IWishListRepository)
  .to(WishListRepository);
container.bind<IReviewService>(CLASSTYPES.IReviewService).to(ReviewService);
container
  .bind<IReviewRepository>(CLASSTYPES.IReviewRepository)
  .to(ReviewRepository);
container.bind<IProductUtils>(CLASSTYPES.IProductUtils).to(ProductUtils);
container.bind<ICheckerService>(CLASSTYPES.ICheckerService).to(CheckerService);

export const userService = container.get<IUserService>(CLASSTYPES.IUserService);
export const userRepository = container.get<IUserRepository>(
  CLASSTYPES.IUserRepository
);
export const userUtils = container.get<IUserUtils>(CLASSTYPES.IUserUtils);
export const tokenService = container.get<ITokenService>(
  CLASSTYPES.ITokenService
);
export const tokenRepository = container.get<ITokenRepository>(
  CLASSTYPES.ITokenRepository
);
export const tokenUtils = container.get<ITokenUtils>(CLASSTYPES.ITokenUtils);
export const cartService = container.get<ICartService>(CLASSTYPES.ICartService);
export const cartRepository = container.get<ICartRepository>(
  CLASSTYPES.ICartRepository
);
export const wishListService = container.get<IWishListService>(
  CLASSTYPES.IWishListService
);
export const wishListRepository = container.get<IWishListRepository>(
  CLASSTYPES.IWishListRepository
);
export const reviewService = container.get<IReviewService>(
  CLASSTYPES.IReviewService
);
export const reviewRepository = container.get<IReviewRepository>(
  CLASSTYPES.IReviewRepository
);
export const productRepository = container.get<IProductRepository>(
  CLASSTYPES.IProductRepository
);
export const productUtils = container.get<IProductUtils>(
  CLASSTYPES.IProductUtils
);
export const checkerService = container.get<ICheckerService>(
  CLASSTYPES.ICheckerService
);

export { container };
