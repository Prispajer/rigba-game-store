import { User, WishList, Product } from "@prisma/client";
import { RequestResponse } from "@/types/types";
import {
  GetUserWishListDTO,
  AddProductToWishListDTO,
  DeleteProductFromWishListDTO,
} from "@/utils/helpers/backendDTO";

export default interface IWishListService {
  getUserWishList(
    getUserWishListDTO: GetUserWishListDTO
  ): Promise<RequestResponse<WishList | null>>;
  addProductToWishList(
    addProductToWishListDTO: AddProductToWishListDTO
  ): Promise<RequestResponse<User | WishList | null>>;
  deleteProductFromWishList(
    deleteProductFromWishListDTO: DeleteProductFromWishListDTO
  ): Promise<RequestResponse<User | Product | WishList | null>>;
}
