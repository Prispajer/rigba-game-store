import { User, Wishlist, Product } from "@prisma/client";
import {
  GetUserWishlistDTO,
  CreateUserProductWishlistDTO,
  DeleteUserProductFromWishlistDTO,
} from "@/utils/helpers/backendDTO";

export default interface IWishlistRepository {
  getUserWishlist(
    getUserWishlistDTO: GetUserWishlistDTO
  ): Promise<Wishlist | null>;
  createUserWishlist(user: User): Promise<Wishlist | null>;
  createUserProductWishlist(
    createUserProductWishlistDTO: CreateUserProductWishlistDTO
  ): Promise<Product | null>;
  deleteUserProductFromWishlist(
    deleteUserProductFromWishlistDTO: DeleteUserProductFromWishlistDTO
  ): Promise<Product | null>;
}
