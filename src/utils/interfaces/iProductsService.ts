import {
  RequestResponse,
  LoggedUserCart,
  LoggedUserWishList,
} from "../helpers/types";

export default interface IProductService {
  addProductToCart(): Promise<RequestResponse<LoggedUserCart | null>>;
  deleteProductFromCart(): Promise<RequestResponse<LoggedUserCart | null>>;
  decreaseProductQuantity(): Promise<RequestResponse<LoggedUserCart | null>>;
  increaseProductQuantity(): Promise<RequestResponse<LoggedUserCart | null>>;
  addProductToWishlist(): Promise<RequestResponse<LoggedUserWishList | null>>;
  deleteProductFromWishList(): Promise<
    RequestResponse<LoggedUserWishList | null>
  >;
}
