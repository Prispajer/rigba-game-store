import "reflect-metadata";
import { Container } from "inversify";
import UserService from "../services/UserService";
import type IUserService from "@/interfaces/IUserService";
import UserRepository from "@/repositories/UserRepository";
import type IUserRepository from "@/interfaces/IUserRepository";
import UserUtils from "@/utils/UserUtils";
import type IUserUtils from "@/interfaces/IUserUtils";
import TokenService from "../services/TokenService";
import type ITokenService from "@/interfaces/ITokenService";
import TokenRepository from "@/repositories/TokenRepository";
import type ITokenRepository from "@/interfaces/ITokenRepository";
import TokenUtils from "@/utils/TokenUtils";
import type ITokenUtils from "@/interfaces/ITokenUtils";
import ProductRepository from "@/repositories/ProductRepository";
import type IProductRepository from "@/interfaces/IProductRepository";
import ProductUtils from "@/utils/ProductUtils";
import type IProductUtils from "@/interfaces/IProductUtils";
import CheckerService from "../services/CheckerService";
import type ICheckerService from "@/interfaces/ICheckerService";
import WishlistService from "../services/WishlistService";
import type IWishlistService from "@/interfaces/IWishlistService";
import WishlistRepository from "@/repositories/WishlistRepository";
import type IWishlistRepository from "@/interfaces/IWishlistRepository";
import CartService from "@/services/CartService";
import type ICartService from "@/interfaces/ICartService";
import CartRepository from "@/repositories/CartRepository";
import type ICartRepository from "@/interfaces/ICartRepository";
import ReviewService from "@/services/ReviewService";
import type IReviewService from "@/interfaces/IReviewService";
import ReviewRepository from "@/repositories/ReviewRepository";
import type IReviewRepository from "@/interfaces/IReviewRepository";
import IPurchaseHistoryRepository from "@/interfaces/IPurchaseHistoryRepository";
import PurchaseHistoryService from "@/services/PurchaseHistoryService";
import PurchaseHistoryRepository from "@/repositories/PurchaseHistoryRepository";
import IPurchaseHistoryService from "@/interfaces/IPurchaseHistoryService";
import CLASSTYPES from "@/shared/constants/classTypes";

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
  .bind<IWishlistService>(CLASSTYPES.IWishlistService)
  .to(WishlistService);
container
  .bind<IWishlistRepository>(CLASSTYPES.IWishlistRepository)
  .to(WishlistRepository);
container.bind<IReviewService>(CLASSTYPES.IReviewService).to(ReviewService);
container
  .bind<IReviewRepository>(CLASSTYPES.IReviewRepository)
  .to(ReviewRepository);
container.bind<IProductUtils>(CLASSTYPES.IProductUtils).to(ProductUtils);
container.bind<ICheckerService>(CLASSTYPES.ICheckerService).to(CheckerService);
container
  .bind<IPurchaseHistoryService>(CLASSTYPES.IPurchaseHistoryService)
  .to(PurchaseHistoryService);
container
  .bind<IPurchaseHistoryRepository>(CLASSTYPES.IPurchaseHistoryRepository)
  .to(PurchaseHistoryRepository);

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
export const wishlistService = container.get<IWishlistService>(
  CLASSTYPES.IWishlistService
);
export const wishlistRepository = container.get<IWishlistRepository>(
  CLASSTYPES.IWishlistRepository
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
export const purchaseHistoryService = container.get<IPurchaseHistoryService>(
  CLASSTYPES.IPurchaseHistoryService
);
export const purchaseHistoryRepository =
  container.get<IPurchaseHistoryRepository>(
    CLASSTYPES.IPurchaseHistoryRepository
  );

export { container };
