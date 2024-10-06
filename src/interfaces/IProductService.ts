import { RequestResponse } from "@/utils/helpers/types";
import { RatingTitle, Product, Cart, Review, WishList } from "@prisma/client";

export default interface IProductService {
  getUserCart(
    getUserCartDTO: GetUserCartDTO
  ): Promise<RequestResponse<Cart | null>>;
  getUserWishList(
    getUserWishListDTO: GetUserWishListDTO
  ): Promise<RequestResponse<WishList | null>>;
  getProductReviews(
    getProductReviewsDTO: GetProductReviewsDTO
  ): Promise<RequestResponse<Review | null>>;
  addProductToCart(
    addProductToCartDTO: AddProductToCartDTO
  ): Promise<RequestResponse<Cart | null>>;
  addProductToWishList(
    addProductToWishListDTO: AddProductToWishListDTO
  ): Promise<RequestResponse<WishList | null>>;
  addReviewToProduct(): Promise<RequestResponse<Review | null>>;
  deleteProductFromCart(): Promise<RequestResponse<Cart | null>>;
  decreaseProductQuantity(): Promise<RequestResponse<Cart | null>>;
  increaseProductQuantity(): Promise<RequestResponse<Cart | null>>;
  deleteProductFromWishList(): Promise<RequestResponse<WishList | null>>;
  likeReview(): Promise<RequestResponse<Review | null> | undefined>;
  unLikeReview(): Promise<RequestResponse<Review | null>>;
}
