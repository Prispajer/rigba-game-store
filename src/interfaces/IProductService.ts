import { RequestResponse } from "@/utils/helpers/types";
import { User, Product, Cart, Review, WishList } from "@prisma/client";
import {
  AddProductToCartDTO,
  AddProductToWishListDTO,
  AddReviewToProductDTO,
  DecreaseProductQuantityDTO,
  DeleteProductFromCartDTO,
  DeleteProductFromWishListDTO,
  GetProductReviewsDTO,
  GetUserCartDTO,
  GetUserWishListDTO,
  IncreaseProductQuantityDTO,
  LikeReviewDTO,
  UnLikeReviewDTO,
} from "@/utils/helpers/backendDTO";

export default interface IProductService {
  getUserCart(
    getUserCartDTO: GetUserCartDTO
  ): Promise<RequestResponse<User | Cart | null>>;
  getProductReviews(
    getProductReviewsDTO: GetProductReviewsDTO
  ): Promise<RequestResponse<Product | Review | null>>;
  addProductToCart(
    addProductToCartDTO: AddProductToCartDTO
  ): Promise<RequestResponse<User | Cart | null>>;
  addProductToWishList(
    addProductToWishListDTO: AddProductToWishListDTO
  ): Promise<RequestResponse<User | WishList | null>>;
  addReviewToProduct(
    addReviewToProductDTO: AddReviewToProductDTO
  ): Promise<RequestResponse<User | Review | null>>;
  deleteProductFromCart(
    deleteProductFromCartDTO: DeleteProductFromCartDTO
  ): Promise<RequestResponse<User | Product | Cart | null>>;
  deleteProductFromWishList(
    deleteProductFromWishListDTO: DeleteProductFromWishListDTO
  ): Promise<RequestResponse<User | Product | WishList | null>>;
  increaseProductQuantity(
    increaseProductQuantityDTO: IncreaseProductQuantityDTO
  ): Promise<RequestResponse<User | Product | Cart | null>>;
  decreaseProductQuantity(
    decreaseProductQuantityDTO: DecreaseProductQuantityDTO
  ): Promise<RequestResponse<User | Product | Cart | null>>;
  likeReview(
    likeReviewDTO: LikeReviewDTO
  ): Promise<RequestResponse<User | Product | Review | null>>;
  unLikeReview(
    unLikeReviewDTO: UnLikeReviewDTO
  ): Promise<RequestResponse<User | Product | Review | null>>;
}
