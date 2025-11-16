import { User, Wishlist, Product } from "@prisma/client";
import RequestResponse from "@/shared/types/requestResponse";
import {
  GetUserWishlistDTO,
  AddProductToWishlistDTO,
  DeleteProductFromWishlistDTO,
} from "@/utils/helpers/backendDTO";

export default interface IWishlistService {
  getUserWishlist(
    getUserWishlistDTO: GetUserWishlistDTO
  ): Promise<RequestResponse<Wishlist | null>>;
  addProductToWishlist(
    addProductToWishlistDTO: AddProductToWishlistDTO
  ): Promise<RequestResponse<User | Wishlist | null>>;
  deleteProductFromWishlist(
    deleteProductFromWishlistDTO: DeleteProductFromWishlistDTO
  ): Promise<RequestResponse<User | Product | Wishlist | null>>;
}
