import {
  RequestResponse,
  LoggedUserCart,
  LoggedUserWishList,
} from "../helpers/types";

export default interface IProductService {
  getCart(): Promise<RequestResponse<LoggedUserCart | null>>;
  getWishList(): Promise<RequestResponse<LoggedUserWishList | null>>;
  getReviews(): Promise<RequestResponse<LoggedUserWishList | null>>;
  addProductToCart(): Promise<RequestResponse<LoggedUserCart | null>>;
  deleteProductFromCart(): Promise<RequestResponse<LoggedUserCart | null>>;
  decreaseProductQuantity(): Promise<RequestResponse<LoggedUserCart | null>>;
  increaseProductQuantity(): Promise<RequestResponse<LoggedUserCart | null>>;
  addProductToWishlist(): Promise<RequestResponse<LoggedUserWishList | null>>;
  deleteProductFromWishList(): Promise<
    RequestResponse<LoggedUserWishList | null>
  >;
  addProductToDatabase(): Promise<RequestResponse<Product | null>>;
  addReviewToProduct(): Promise<RequestResponse<any | null>>;
  likeReview(): Promise<RequestResponse<any | null>>;
  unlikeReview(): Promise<RequestResponse<any | null>>;
}
