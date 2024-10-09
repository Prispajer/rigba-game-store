import { RequestResponse } from "@/utils/helpers/types";
import { RatingTitle, Product, Cart, Review, WishList } from "@prisma/client";
import {
  AddProductToCartDTO,
  AddProductToWishListDTO,
  AddReviewToProductDTO,
  DeleteProductFromCartDTO,
  DeleteProductFromWishListDTO,
  GetProductReviewsDTO,
  GetUserCartDTO,
  GetUserWishListDTO,
} from "@/utils/helpers/backendDTO";

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
  addReviewToProduct(
    addReviewToProductDTO: AddReviewToProductDTO
  ): Promise<RequestResponse<Review | null>>;
  deleteProductFromCart(
    deleteProductFromCartDTO: DeleteProductFromCartDTO
  ): Promise<RequestResponse<Cart | null>>;
  deleteProductFromWishList(
    deleteProductFromWishListDTO: DeleteProductFromWishListDTO
  ): Promise<RequestResponse<WishList | null>>;
  increaseProductQuantity(
    increaseProductQuantityDTO: IncreaseProductQuantityDTO
  ): Promise<RequestResponse<Cart | null>>
  decreaseProductQuantity(
    decreaseProductQuantityDTO: DecreaseProductQuantityDTO
  ): Promise<RequestResponse<Cart | null>>;;
  likeReview(): Promise<RequestResponse<Review | null> | undefined>;
  unLikeReview(): Promise<RequestResponse<Review | null>>;
}
