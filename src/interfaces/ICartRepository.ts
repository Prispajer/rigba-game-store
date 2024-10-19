import { User, Cart, Product } from "@prisma/client";
import {
  GetUserCartDTO,
  CreateUserCartProductDTO,
  DeleteUserProductFromCartDTO,
  UserProductQuantityDTO,
} from "@/utils/helpers/backendDTO";

export default interface ICartRepository {
  getUserCart(getUserCartDTO: GetUserCartDTO): Promise<Cart | null>;
  createUserCart(user: User): Promise<Cart | null>;
  createUserCartProduct(
    createUserCartProductDTO: CreateUserCartProductDTO
  ): Promise<Product | null>;
  deleteUserProductFromCart(
    deleteUserProductFromCartDTO: DeleteUserProductFromCartDTO
  ): Promise<Product | null>;
  increaseUserProductQuantity(
    userProductQuantityDTO: UserProductQuantityDTO
  ): Promise<Product | null>;
  decreaseUserProductQuantity(
    userProductQuantityDTO: UserProductQuantityDTO
  ): Promise<Product | null>;
}
