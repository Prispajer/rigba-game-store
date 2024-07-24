import {
  RequestResponse,
  LoggedUserCart,
  LoggedUserUpdatedProduct,
} from "../helpers/types";

export default interface IProductService {
  addProductToCart(): Promise<RequestResponse<LoggedUserCart>>;
  deleteProductFromCart(): Promise<RequestResponse<LoggedUserCart>>;
  decreaseProductQuantity(): Promise<RequestResponse<LoggedUserUpdatedProduct>>;
  increaseProductQuantity(): Promise<RequestResponse<LoggedUserUpdatedProduct>>;
  addProductToWishlist(): Promise<RequestResponse<LoggedUserWishlist>>;
  deleteProductFromWishList(): Promise<RequestResponse<LoggedUserCart>>;
}
