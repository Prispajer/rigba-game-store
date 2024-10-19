import "reflect-metadata";
import bcrypt from "bcryptjs";
import { inject, injectable } from "inversify";
import { postgres } from "@/data/database/publicSQL/postgres";
import type ICheckerService from "../interfaces/ICheckerService";
import type IUserRepository from "@/interfaces/IUserRepository";
import type IProductRepository from "@/interfaces/IProductRepository";
import type ITokenRepository from "@/interfaces/ITokenRepository";
import type IWishListRepository from "@/interfaces/IWishListRepository";
import type ICartRepository from "@/interfaces/ICartRepository";
import type IReviewRepository from "@/interfaces/IReviewRepository";
import { RequestResponse } from "../utils/helpers/types";
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
  CheckIsTokenValidDTO,
} from "@/utils/helpers/backendDTO";
import {
  Cart,
  Product,
  Review,
  WishList,
  User,
  ReviewLikers,
} from "@prisma/client";
import { reviewRepository } from "@/utils/injector";

@injectable()
export default class CheckerService implements ICheckerService {
  private readonly _userRepository: IUserRepository;
  private readonly _cartRepository: ICartRepository;
  private readonly _wishListRepository: IWishListRepository;
  private readonly _reviewRepository: IReviewRepository;
  private readonly _productRepository: IProductRepository;
  private readonly _tokenRepository: ITokenRepository;

  constructor(
    @inject(CLASSTYPES.IUserRepository) userRepository: IUserRepository,
    @inject(CLASSTYPES.ICartRepository)
    cartRepository: ICartRepository,
    @inject(CLASSTYPES.IWishListRepository)
    wishListRepository: IWishListRepository,
    @inject(CLASSTYPES.IReviewRepository)
    reviewRepository: IReviewRepository,
    @inject(CLASSTYPES.IProductRepository)
    productRepository: IProductRepository,
    @inject(CLASSTYPES.ITokenRepository) tokenRepository: ITokenRepository
  ) {
    this._userRepository = userRepository;
    this._cartRepository = cartRepository;
    this._wishListRepository = wishListRepository;
    this._reviewRepository = reviewRepository;
    this._productRepository = productRepository;
    this._tokenRepository = tokenRepository;
  }

  async getUserEntity<T, R>(
    {
      email,
    }: {
      email: string;
    },
    checkEntityExists: (user: User) => Promise<RequestResponse<T | null>>,
    createEntity: (user: User) => Promise<R | null>,
    entityName: string
  ): Promise<RequestResponse<User | T | null>> {
    try {
      const getUserByEmailResponse = await this.checkDataExistsAndReturnUser({
        email,
      });

      if (
        (getUserByEmailResponse && !getUserByEmailResponse.success) ||
        !getUserByEmailResponse.data
      ) {
        return getUserByEmailResponse;
      }

      const getEntityResponse = await checkEntityExists(
        getUserByEmailResponse.data
      );

      if (
        (getEntityResponse && !getEntityResponse.success) ||
        !getEntityResponse.data
      ) {
        await createEntity(getUserByEmailResponse.data);
      }

      return this.handleSuccess(
        getEntityResponse.success
          ? `${entityName} retrieved successfully!`
          : `${entityName} not found, creating new one!`,
        getEntityResponse.data || null
      );
    } catch (error) {
      return this.handleError(`Error while retrieving ${entityName}!`);
    }
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
        this._cartRepository.getUserCart(checkDataExistsAndReturnUserCartDTO),
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
        this._wishListRepository.getUserWishList(
          checkDataExistsAndReturnUserWishListDTO
        ),
      checkDataExistsAndReturnUserWishListDTO,
      "Wishlist not found!"
    );

    return getUserWishList;
  }

  async checkDataExistsAndReturnProductReviews(
    checkDataExistsAndReturnProductReviewsDTO: CheckDataExistsAndReturnProductReviewsDTO
  ): Promise<RequestResponse<Product | null>> {
    const getProductReviews = await this.checkDataExistsAndReturn(
      (checkDataExistsAndReturnProductReviewsDTO) =>
        this._reviewRepository.getProductReviews(
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
        this._reviewRepository.getReview(checkDataExistsAndReturnReviewDTO),
      checkDataExistsAndReturnReviewDTO,
      "Review not found!"
    );

    return getReview;
  }

  async checkDataExistsAndReturnReviewLikers(
    checkDataExistsAndReturnReviewLikersDTO: CheckDataExistsAndReturnReviewLikersDTO
  ): Promise<RequestResponse<ReviewLikers | null>> {
    const getReviewLikers = await this.checkDataExistsAndReturn(
      (checkDataExistsAndReturnReviewDTO) =>
        this._reviewRepository.getReviewLikers(
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
        productId: product.id,
      },
    });

    if (isSameReview)
      return this.handleError(
        "User has already written a review for this game!"
      );
  }

  async checkIsTokenValid(
    CheckIsTokenValidDTO: CheckIsTokenValidDTO
  ): Promise<RequestResponse<null> | void> {
    const twoFactorToken = await this._tokenRepository.getTwoFactorTokenByEmail(
      CheckIsTokenValidDTO.email
    );

    if (!twoFactorToken || twoFactorToken.token !== CheckIsTokenValidDTO.code) {
      return this.handleError("Invalid code!");
    }

    const hasExpired = new Date(twoFactorToken.expires) < new Date();

    if (hasExpired) {
      return this.handleError("Code expired!");
    }

    await postgres.twoFactorToken.delete({
      where: { id: twoFactorToken.id },
    });
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
