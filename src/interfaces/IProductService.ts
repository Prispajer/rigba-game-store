import { RequestResponse } from "@/utils/helpers/types";
import { RatingTitle, Product, Cart, Review, Wishlist } from "@prisma/client";

export default interface IProductService {
  getUserCart(
    getUserCartDTO: GetUserCartDTO
  ): Promise<RequestResponse<Cart | null>>;
  getUserWishList(
    getUserWishListDTO: GetUserWishListDTO
  ): Promise<RequestResponse<Wishlist | null>>;
  getProductReviews(
    getProductReviewsDTO: GetProductReviewsDTO
  ): Promise<RequestResponse<Review | null>>;
  addProductToData(
    addProductToDataDTO: AddProductToDataDTO
  ): Promise<RequestResponse<Product>>;
  addProductToCart(
    addProductToCartDTO: AddProductToCartDTO
  ): Promise<RequestResponse<Cart | null>>;
  deleteProductFromCart(): Promise<RequestResponse<Cart | null>>;
  decreaseProductQuantity(): Promise<RequestResponse<Cart | null>>;
  increaseProductQuantity(): Promise<RequestResponse<Cart | null>>;
  addProductToWishlist(): Promise<RequestResponse<Wishlist | null>>;
  deleteProductFromWishList(): Promise<RequestResponse<Wishlist | null>>;
  addReviewToProduct(): Promise<RequestResponse<Review | null>>;
  likeReview(): Promise<RequestResponse<Review | null> | undefined>;
  unLikeReview(): Promise<RequestResponse<Review | null>>;
}
