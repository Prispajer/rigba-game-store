import "reflect-metadata";
import { Container } from "inversify";
import UserService from "../features/user/services/UserService";
import type IUserService from "@/features/user/interfaces/IUserService";
import UserRepository from "@/features/user/repositories/UserRepository";
import type IUserRepository from "@/features/user/interfaces/IUserRepository";
import TokenService from "../features/auth/services/TokenService";
import type ITokenService from "@/features/auth/interfaces/ITokenService";
import TokenRepository from "@/features/auth/repositories/TokenRepository";
import type ITokenRepository from "@/features/auth/interfaces/ITokenRepository";
import ProductService from "@/features/products/services/ProductService";
import type IProductService from "@/features/products/interfaces/IProductService";
import ProductRepository from "@/features/products/repositories/ProductRepository";
import type IProductRepository from "@/features/products/interfaces/IProductRepository";
import CheckerService from "../services/CheckerService";
import type ICheckerService from "@/interfaces/ICheckerService";
import WishlistService from "../features/wishlist/services/WishlistService";
import type IWishlistService from "@/features/wishlist/interfaces/IWishlistService";
import WishlistRepository from "@/features/wishlist/repositories/WishlistRepository";
import type IWishlistRepository from "@/features/wishlist/interfaces/IWishlistRepository";
import CartService from "@/features/cart/services/CartService";
import type ICartService from "@/features/cart/interfaces/ICartService";
import CartRepository from "@/features/cart/repositories/CartRepository";
import type ICartRepository from "@/features/cart/interfaces/ICartRepository";
import ReviewService from "@/features/reviews/services/ReviewService";
import type IReviewService from "@/features/reviews/interfaces/IReviewService";
import ReviewRepository from "@/features/reviews/repositories/ReviewRepository";
import type IReviewRepository from "@/features/reviews/interfaces/IReviewRepository";
import IPurchaseHistoryRepository from "@/features/history/interfaces/IPurchaseHistoryRepository";
import PurchaseHistoryService from "@/features/history/services/PurchaseHistoryService";
import PurchaseHistoryRepository from "@/features/history/repositories/PurchaseHistoryRepository";
import IPurchaseHistoryService from "@/features/history/interfaces/IPurchaseHistoryService";
import CLASSTYPES from "@/shared/constants/classTypes";

const container = new Container();

container.bind<IUserService>(CLASSTYPES.IUserService).to(UserService);
container.bind<IUserRepository>(CLASSTYPES.IUserRepository).to(UserRepository);
container.bind<ITokenService>(CLASSTYPES.ITokenService).to(TokenService);
container
  .bind<ITokenRepository>(CLASSTYPES.ITokenRepository)
  .to(TokenRepository);
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
container.bind<IProductService>(CLASSTYPES.IProductService).to(ProductService);
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
export const tokenService = container.get<ITokenService>(
  CLASSTYPES.ITokenService
);
export const tokenRepository = container.get<ITokenRepository>(
  CLASSTYPES.ITokenRepository
);
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
export const productService = container.get<IProductService>(
  CLASSTYPES.IProductService
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
