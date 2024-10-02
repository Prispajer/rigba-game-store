import { User, RequestResponse } from "@/utils/helpers/types";
import { Cart, Wishlist } from "@prisma/client";
export default interface IProductRepository {
  getUserCart(userId: string): Promise<Cart | null>;
  getUserWishList(userId: string): Promise<Wishlist | null>;
  getProductReviews(externalProductId: number): Promise<any | null>;
  getProductByExternalProductId(
    externalProductId: number
  ): Promise<Product | null>;
  createUserCart(user: User): Promise<Cart>;
  createUserWishList(user: User): Promise<Wishlist>;
  createUserProduct(
    createUserCartProductDTO: CreateUserCartProductDTO
  ): Promise<Product>;
}
