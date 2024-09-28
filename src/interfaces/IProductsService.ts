import { RequestResponse } from "../helpers/types";
import { RatingTitle, Product, Cart, Review, Wishlist } from "@prisma/client";

export default interface IProductService {
  getCart(): Promise<RequestResponse<Cart | null>>;
  getWishList(): Promise<RequestResponse<Wishlist | null>>;
  getReviews(): Promise<RequestResponse<Review | null>>;
  addProduct(): Promise<RequestResponse<Product | null>>;
  addProductToCart(): Promise<RequestResponse<Cart | null>>;
  deleteProductFromCart(): Promise<RequestResponse<Cart | null>>;
  decreaseProductQuantity(): Promise<RequestResponse<Cart | null>>;
  increaseProductQuantity(): Promise<RequestResponse<Cart | null>>;
  addProductToWishlist(): Promise<RequestResponse<Wishlist | null>>;
  deleteProductFromWishList(): Promise<RequestResponse<Wishlist | null>>;
  addReviewToProduct(): Promise<RequestResponse<Review | null>>;
  likeReview(): Promise<RequestResponse<Review | null> | undefined>;
  unLikeReview(): Promise<RequestResponse<Review | null>>;
}
