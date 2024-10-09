import { User, Product, Review } from "@prisma/client";

export default interface ICheckerService {
  checkDataExistsAndReturn<T, R>(
    checkDataExists: (data: R) => Promise<T | null>,
    data: R,
    message: string
  ): Promise<RequestResponse<T | null>>;
  checkDataExistsAndReturnUser(
    checkDataExistsAndReturnUser: CheckDataExistsAndReturnUserDTO
  ): Promise<RequestResponse<User | null>>;
  checkDataExistsAndReturnProduct(
    checkDataExistsAndReturnProduct: CheckDataExistsAndReturnProductDTO
  ): Promise<RequestResponse<User | null>>;
  checkDataExistsAndReturnUserCart(
    checkDataExistsAndReturnUserCart: CheckDataExistsAndReturnUserCartDTO
  ): Promise<RequestResponse<User | null>>;
  checkDataExistsAndReturnUserWishList(
    checkDataExistsAndReturnUserWishList: CheckDataExistsAndReturnUserWishListDTO
  ): Promise<RequestResponse<User | null>>;
  checkDataExistsAndReturnProductReviews(
    checkDataExistsAndReturnProductReviews: CheckDataExistsAndReturnProductReviewsDTO
  ): Promise<RequestResponse<Review | null>>;
  checkIsUserPasswordCorrect(
    user: User,
    loginUserDTO: LoginUserDTO
  ): Promise<RequestResponse<null> | void>;
  checkIsEmailInUse(
    registerUserDTO: RegisterUserDTO
  ): Promise<RequestResponse<null> | void>;
  checkIsSameReview(
    user: User,
    product: Product
  ): Promise<RequestResponse<Review | null> | void>;
  handleSuccess<T>(message: string, data: T): RequestResponse<T>;
  handleError(message: string): RequestResponse<null>;
}
