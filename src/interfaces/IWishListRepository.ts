import { User, WishList, Product } from "@prisma/client";
import {
  GetUserWishListDTO,
  CreateUserProductWishListDTO,
  DeleteUserProductFromWishListDTO,
} from "@/utils/helpers/backendDTO";

export default interface IWishListRepository {
  getUserWishList(
    getUserWishListDTO: GetUserWishListDTO
  ): Promise<WishList | null>;
  createUserWishList(user: User): Promise<WishList | null>;
  createUserProductWishList(
    createUserProductWishListDTO: CreateUserProductWishListDTO
  ): Promise<Product | null>;
  deleteUserProductFromWishList(
    deleteUserProductFromWishListDTO: DeleteUserProductFromWishListDTO
  ): Promise<Product | null>;
}
