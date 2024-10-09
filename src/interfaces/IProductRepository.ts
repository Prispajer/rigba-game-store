import { User, RequestResponse } from "@/utils/helpers/types";
import {
  GetProductByExternalProductIdDTO,
  GetUserCartDTO,
  GetUserWishListDTO,
} from "@/utils/helpers/backendDTO";
import { Cart, WishList } from "@prisma/client";
export default interface IProductRepository {
  getUserCart(getUserCartDTO: GetUserCartDTO): Promise<Cart | null>;
  getUserWishList(
    getUserWishListDTO: GetUserWishListDTO
  ): Promise<WishList | null>;
  getProductReviews(
    getProductReviewsDTO: GetProductReviewsDTO
  ): Promise<Product | null>;
  getProductByExternalProductId(
    getProductByExternalProductIdDTO: GetProductByExternalProductIdDTO
  ): Promise<Product | null>;
  createUserCart(user: User): Promise<Cart | null>;
  createUserWishList(user: User): Promise<WishList | null>;
  createReview(createReviewDTO: CreateReviewDTO): Promise<Review | null>;
  createRating(createRatingDTO: CreateRatingDTO): Promise<Rating | null>;
  createUserCartProduct(
    createUserCartProductDTO: CreateUserCartProductDTO
  ): Promise<Product>;
  createUserWishListProduct(
    createUserWishListProductDTO: CreateUserWishListProductDTO
  ): Promise<Product>;
  createProductToReview(
    createProductToReviewDTO: CreateProductToReviewDTO
  ): Promise<Product | null>;
  deleteUserProductFromCart(
    deleteUserProductFromCartDTO: DeleteUserProductFromCartDTO
  ): Promise<Product | null>;
  deleteUserProductFromWishList(
    deleteUserProductFromWishListDTO: DeleteUserProductFromWishListDTO
  ): Promise<Product | null>;
  deleteUserProduct(
    deleteUserProductDTO: DeleteUserProductDTO
  ): Promise<Product | null>;
  increaseUserProductQuantity(
    UserProductQuantityDTO: UserProductQuantityDTO
  ): Promise<UserProductQuantity | null>;
  decreaseUserProductQuantity(
    userProductQuantityDTO: UserProductQuantityDTO
  ): Promise<UserProductQuantity | null>;
}
