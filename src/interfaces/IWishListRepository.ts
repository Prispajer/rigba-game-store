import { User, WishList, Product } from "@prisma/client";

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
