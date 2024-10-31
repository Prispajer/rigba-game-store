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
  CheckIsTokenValidAndReturnTwoFactorTokenDTO,
} from "@/utils/helpers/backendDTO";

export default interface ICheckerService {
  getUserEntity<T>(
    {
      email,
    }: {
      email: string;
    },
    checkEntityExists: (user: User) => Promise<RequestResponse<T | null>>,
    createEntity: (user: User) => Promise<T | null>,
    entityName: string
  ): Promise<RequestResponse<T | null>>;
  checkDataExistsAndReturn<T, R>(
    checkDataExists: (data: R) => Promise<T | null>,
    data: R,
    message: string
  ): Promise<RequestResponse<T | null>>;
  checkDataExistsAndReturnUser(
    checkDataExistsAndReturnUser: CheckDataExistsAndReturnUserDTO
  ): Promise<RequestResponse<User | null>>;
  checkDataExistsAndReturnUserPersonalData(
    checkDataExistsAndReturnUserPersonalDataDTO: checkDataExistsAndReturnUserPersonalDataDTO
  ): Promise<RequestResponse<PersonalData | null>>;
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
  checkIsTokenValidAndReturnTwoFactorToken(
    checkIsTokenValidAndReturnTwoFactorTokenDTO: CheckIsTokenValidAndReturnTwoFactorTokenDTO
  ): Promise<RequestResponse<TwoFactorToken | null>>;
  checkIsTokenValidAndReturnPasswordResetToken(
    checkIsTokenValidAndReturnPasswordResetTokenDTO: CheckIsTokenValidAndReturnPasswordResetTokenDTO
  ): Promise<RequestResponse<PasswordResetToken | null>>;
  checkIsUserPasswordCorrect(
    user: User,
    checkIsUserPasswordCorrectDTO: CheckIsUserPasswordCorrectDTO,
    message: string
  ): Promise<RequestResponse<null> | void>;
  checkIsUserPasswordPreviousPassword(
    user: User,
    checkIsUserPasswordPreviousPasswordDTO: CheckIsUserPasswordPreviousPasswordDTO,
    message: string
  ): Promise<RequestResponse<null> | void>;
  checkIsEmailInUse(
    CheckIsEmailInUseDTO: CheckIsEmailInUseDTO
  ): Promise<RequestResponse<User | null> | void>;
  checkIsSameReview(
    user: User,
    product: Product
  ): Promise<RequestResponse<Review | null> | void>;
  handleSuccess<T>(message: string, data: T): RequestResponse<T>;
  handleError(message: string): RequestResponse<null>;
}
