import {
  CheckUserExistsDTO,
  CheckTokenExistsDTO,
  CheckIsEmailInUse,
} from "@/utils/helpers/backendDTO";

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
  checkDataExistsAndReturnUserCartProduct(
    checkDataExistsAndReturnUserCartProduct: CheckDataExistsAndReturnUserCartProductDTO
  ): Promise<RequestResponse<Product | null>>;
  checkDataExistsAndReturnUserWishListProduct(
    checkDataExistsAndReturnUserWishListDTO: CheckDataExistsAndReturnUserWishListDTO
  ): Promise<RequestResponse<Product | null>>;
  checkIsUserPasswordCorrect(
    user: User,
    loginUserDTO: LoginUserDTO
  ): Promise<RequestResponse<null> | void>;
  checkIsEmailInUse(
    registerUserDTO: RegisterUserDTO
  ): Promise<RequestResponse<null> | void>;
  handleSuccess<T>(message: string, data: T): RequestResponse<T>;
  handleError(message: string): RequestResponse<null>;
}
