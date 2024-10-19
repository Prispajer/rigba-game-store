import { RequestResponse } from "@/utils/helpers/types";
import { User, Product, Cart, Review } from "@prisma/client";
import {
  CheckDataExistsAndReturnProductDTO,
  CheckDataExistsAndReturnProductReviewsDTO,
  CheckDataExistsAndReturnUserDTO,
  CheckDataExistsAndReturnUserCartDTO,
  CheckDataExistsAndReturnUserWishListDTO,
  CheckIsEmailInUseDTO,
  CheckIsUserPasswordCorrectDTO,
  CheckDataExistsAndReturnReviewDTO,
  CheckDataExistsAndReturnReviewLikersDTO,
  CheckIsTokenValidDTO,
} from "@/utils/helpers/backendDTO";

export default interface ICheckerService {
  getUserEntity<T, R>(
    {
      email,
    }: {
      email: string;
    },
    checkEntityExists: (user: User) => Promise<RequestResponse<T | null>>,
    createEntity: (user: User) => Promise<R | null>,
    entityName: string
  ): Promise<RequestResponse<User | T | null>>;
  checkDataExistsAndReturn<T, R>(
    checkDataExists: (data: R) => Promise<T | null>,
    data: R,
    message: string
  ): Promise<RequestResponse<T | null>>;
  checkDataExistsAndReturnUser(
    checkDataExistsAndReturnUser: CheckDataExistsAndReturnUserDTO
  ): Promise<RequestResponse<User | null>>;
  checkDataExistsAndReturnProduct(
    CheckDataExistsAndReturnProductDTO: CheckDataExistsAndReturnProductDTO
  ): Promise<RequestResponse<Product | null>>;
  checkDataExistsAndReturnUserCart(
    checkDataExistsAndReturnUserCartDTO: CheckDataExistsAndReturnUserCartDTO
  ): Promise<RequestResponse<Cart | null>>;
  checkDataExistsAndReturnUserWishList(
    checkDataExistsAndReturnUserWishListDTO: CheckDataExistsAndReturnUserWishListDTO
  ): Promise<RequestResponse<WishList | null>>;
  checkDataExistsAndReturnProductReviews(
    checkDataExistsAndReturnProductReviewsDTO: CheckDataExistsAndReturnProductReviewsDTO
  ): Promise<RequestResponse<Product | null>>;
  checkDataExistsAndReturnReview(
    checkDataExistsAndReturnReviewDTO: CheckDataExistsAndReturnReviewDTO
  ): Promise<RequestResponse<Review | null>>;
  checkDataExistsAndReturnReviewLikers(
    checkDataExistsAndReturnReviewLikersDTO: CheckDataExistsAndReturnReviewLikersDTO
  ): Promise<RequestResponse<ReviewLikers | null>>;
  checkIsUserPasswordCorrect(
    user: User,
    checkIsUserPasswordCorrectDTO: CheckIsUserPasswordCorrectDTO
  ): Promise<RequestResponse<null> | void>;
  checkIsEmailInUse(
    CheckIsEmailInUseDTO: CheckIsEmailInUseDTO
  ): Promise<RequestResponse<User | null> | void>;
  checkIsSameReview(
    user: User,
    product: Product
  ): Promise<RequestResponse<Review | null> | void>;
  checkIsTokenValid(
    CheckIsTokenValidDTO: CheckIsTokenValidDTO
  ): Promise<RequestResponse<null> | void>;
  handleSuccess<T>(message: string, data: T): RequestResponse<T>;
  handleError(message: string): RequestResponse<null>;
}
