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
  getUserCartProduct(
    getUserCartProductDTO: GetUserCartProductDTO
  ): Promise<Product | null>;
  getUserWishListProduct(
    GetUserWishListProductDTO: GetUserWishListProductDTO
  ): Promise<Product | null>;
  createUserCart(user: User): Promise<Cart | null>;
  createUserWishList(user: User): Promise<WishList | null>;
  createUserCartProduct(
    createUserCartProductDTO: CreateUserCartProductDTO
  ): Promise<Product>;
  createUserWishListProduct(
    createUserWishListProductDTO: CreateUserWishListProductDTO
  ): Promise<Product>;
  increaseUserProductQuantity(
    UserProductQuantityDTO: UserProductQuantityDTO
  ): Promise<UserProductQuantity | null>;
  decreaseUserProductQuantity(
    userProductQuantityDTO: UserProductQuantityDTO
  ): Promise<UserProductQuantity | null>;
}
