import "reflect-metadata";
import bcrypt from "bcryptjs";
import { inject, injectable } from "inversify";
import { postgres } from "@/data/database/publicSQL/postgres";
import { RequestResponse } from "../utils/helpers/types";
import type ICheckerService from "../interfaces/ICheckerService";
import type IUserRepository from "@/interfaces/IUserRepository";
import type IProductRepository from "@/interfaces/IProductRepository";
import { CLASSTYPES } from "../utils/helpers/types";
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
} from "@/utils/helpers/backendDTO";
import { Cart, Product, Review, WishList, User } from "@prisma/client";

@injectable()
export default class CheckerService implements ICheckerService {
  private readonly _userRepository: IUserRepository;
  private readonly _productRepository: IProductRepository;

  constructor(
    @inject(CLASSTYPES.IUserRepository) userRepository: IUserRepository,
    @inject(CLASSTYPES.IProductRepository) productRepository: IProductRepository
  ) {
    this._userRepository = userRepository;
    this._productRepository = productRepository;
  }

  async checkDataExistsAndReturn<T, R>(
    checkDataExists: (data: R) => Promise<T | null>,
    data: R,
    message: string
  ): Promise<RequestResponse<T | null>> {
    const checkDataExistsResponse = await checkDataExists(data);

    if (!checkDataExistsResponse) {
      return this.handleError(message);
    }

    return this.handleSuccess("Data has been found!", checkDataExistsResponse);
  }

  async checkDataExistsAndReturnUser(
    checkDataExistsAndReturnUserDTO: CheckDataExistsAndReturnUserDTO
  ): Promise<RequestResponse<User | null>> {
    const getUserByEmail = await this.checkDataExistsAndReturn(
      (checkDataExistsAndReturnUserDTO) =>
        this._userRepository.getUserByEmail(checkDataExistsAndReturnUserDTO),
      checkDataExistsAndReturnUserDTO,
      "User not found!"
    );

    return getUserByEmail;
  }

  async checkDataExistsAndReturnProduct(
    CheckDataExistsAndReturnProductDTO: CheckDataExistsAndReturnProductDTO
  ): Promise<RequestResponse<Product | null>> {
    const getProductByExternalProductId = await this.checkDataExistsAndReturn(
      (CheckDataExistsAndReturnProductDTO) =>
        this._productRepository.getProductByExternalProductId(
          CheckDataExistsAndReturnProductDTO
        ),
      CheckDataExistsAndReturnProductDTO,
      "Product not found!"
    );

    return getProductByExternalProductId;
  }

  async checkDataExistsAndReturnUserCart(
    checkDataExistsAndReturnUserCartDTO: CheckDataExistsAndReturnUserCartDTO
  ): Promise<RequestResponse<Cart | null>> {
    const getUserCart = await this.checkDataExistsAndReturn(
      (checkDataExistsAndReturnUserCartDTO) =>
        this._productRepository.getUserCart(
          checkDataExistsAndReturnUserCartDTO
        ),
      checkDataExistsAndReturnUserCartDTO,
      "Cart not found!"
    );

    return getUserCart;
  }

  async checkDataExistsAndReturnUserWishList(
    checkDataExistsAndReturnUserWishListDTO: CheckDataExistsAndReturnUserWishListDTO
  ): Promise<RequestResponse<WishList | null>> {
    const getUserWishList = await this.checkDataExistsAndReturn(
      (checkDataExistsAndReturnUserWishListDTO) =>
        this._productRepository.getUserWishList(
          checkDataExistsAndReturnUserWishListDTO
        ),
      checkDataExistsAndReturnUserWishListDTO,
      "Wishlist not found!"
    );

    return getUserWishList;
  }

  async checkDataExistsAndReturnProductReviews(
    checkDataExistsAndReturnProductReviewsDTO: CheckDataExistsAndReturnProductReviewsDTO
  ): Promise<RequestResponse<Review | null>> {
    const getProductReviews = await this.checkDataExistsAndReturn(
      (checkDataExistsAndReturnProductReviewsDTO) =>
        this._productRepository.getProductReviews(
          checkDataExistsAndReturnProductReviewsDTO
        ),
      checkDataExistsAndReturnProductReviewsDTO,
      "Reviews not found!"
    );

    return getProductReviews;
  }

  async checkDataExistsAndReturnReview(
    checkDataExistsAndReturnReviewDTO: CheckDataExistsAndReturnReviewDTO
  ): Promise<RequestResponse<Review | null>> {
    const getReview = await this.checkDataExistsAndReturn(
      (checkDataExistsAndReturnReviewDTO) =>
        this._productRepository.getReview(checkDataExistsAndReturnReviewDTO),
      checkDataExistsAndReturnReviewDTO,
      "Review not found!"
    );

    return getReview;
  }

  async checkDataExistsAndReturnReviewLikers(
    checkDataExistsAndReturnReviewLikersDTO: CheckDataExistsAndReturnReviewLikersDTO
  ): Promise<RequestResponse<Review | null>> {
    const getReviewLikers = await this.checkDataExistsAndReturn(
      (checkDataExistsAndReturnReviewDTO) =>
        this._productRepository.getReviewLikers(
          checkDataExistsAndReturnReviewDTO
        ),
      checkDataExistsAndReturnReviewLikersDTO,
      "Review likers not found!"
    );

    return getReviewLikers;
  }

  async checkIsUserPasswordCorrect(
    user: User,
    checkIsUserPasswordCorrectDTO: CheckIsUserPasswordCorrectDTO
  ): Promise<RequestResponse<null> | void> {
    const isPasswordCorrect = await bcrypt.compare(
      checkIsUserPasswordCorrectDTO.password as string,
      user.password as string
    );

    if (!isPasswordCorrect) {
      return this.handleError("Invalid Credentials!");
    }
  }

  async checkIsEmailInUse(
    CheckIsEmailInUseDTO: CheckIsEmailInUseDTO
  ): Promise<RequestResponse<User | null> | void> {
    const isEmailInUse = await this._userRepository.getUserByEmail(
      CheckIsEmailInUseDTO
    );

    if (isEmailInUse) return this.handleError("Email is in use!");
  }

  async checkIsSameReview(
    user: User,
    product: Product
  ): Promise<RequestResponse<Review | null> | void> {
    const isSameReview = await postgres.review.findFirst({
      where: {
        userId: user.id,
        productId: product?.id,
      },
    });

    console.log("XDasdasdasdasd", isSameReview);

    if (isSameReview)
      return this.handleError(
        "User has already written a review for this game!"
      );
  }

  handleSuccess<T>(message: string, data: T): RequestResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  }

  handleError(message: string): RequestResponse<null> {
    return {
      success: false,
      message,
      data: null,
    };
  }
}
