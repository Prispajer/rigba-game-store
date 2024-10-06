import "reflect-metadata";
import bcrypt from "bcryptjs";
import { inject, injectable } from "inversify";
import { RequestResponse } from "../utils/helpers/types";
import type ICheckerService from "../interfaces/ICheckerService";
import type IUserRepository from "@/interfaces/IUserRepository";
import { User, CLASSTYPES } from "../utils/helpers/types";
import {
  CheckDataExistsAndReturnProductDTO,
  CheckDataExistsAndReturnProductReviewsDTO,
  CheckDataExistsAndReturnUserDTO,
  CheckDataExistsAndReturnUserCartDTO,
  CheckDataExistsAndReturnUserCartProductDTO,
  CheckDataExistsAndReturnUserWishListDTO,
  RegisterUserDTO,
} from "@/utils/helpers/backendDTO";
import IProductRepository from "@/interfaces/IProductRepository";
import { Cart, Product, Review, WishList } from "@prisma/client";

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
    checkDataExistsAndReturnUser: CheckDataExistsAndReturnUserDTO
  ): Promise<RequestResponse<User | null>> {
    const getUserByEmailResponse = await this.checkDataExistsAndReturn(
      (checkDataExistsAndReturnUser) =>
        this._userRepository.getUserByEmail(checkDataExistsAndReturnUser),
      checkDataExistsAndReturnUser,
      "User not found!"
    );

    return getUserByEmailResponse;
  }

  async checkDataExistsAndReturnProduct(
    checkDataExistsAndReturnProduct: CheckDataExistsAndReturnProductDTO
  ): Promise<RequestResponse<Product | null>> {
    const getProductByExternalProductIdResponse =
      await this.checkDataExistsAndReturn(
        (checkDataExistsAndReturnProduct) =>
          this._productRepository.getProductByExternalProductId(
            checkDataExistsAndReturnProduct
          ),
        checkDataExistsAndReturnProduct,
        "Product not found!"
      );

    return getProductByExternalProductIdResponse;
  }

  async checkDataExistsAndReturnUserCart(
    checkDataExistsAndReturnUserCart: CheckDataExistsAndReturnUserCartDTO
  ): Promise<RequestResponse<Cart | null>> {
    const getUserCartResponse = await this.checkDataExistsAndReturn(
      (checkDataExistsAndReturnUserCart) =>
        this._productRepository.getUserCart(checkDataExistsAndReturnUserCart),
      checkDataExistsAndReturnUserCart,
      "Cart not found!"
    );

    return getUserCartResponse;
  }

  async checkDataExistsAndReturnUserWishList(
    checkDataExistsAndReturnUserWishList: CheckDataExistsAndReturnUserWishListDTO
  ): Promise<RequestResponse<WishList | null>> {
    const getUserWishListResponse = await this.checkDataExistsAndReturn(
      (checkDataExistsAndReturnUserWishList) =>
        this._productRepository.getUserWishList(
          checkDataExistsAndReturnUserWishList
        ),
      checkDataExistsAndReturnUserWishList,
      "Wishlist not found!"
    );

    return getUserWishListResponse;
  }

  async checkDataExistsAndReturnProductReviews(
    checkDataExistsAndReturnProductReviews: CheckDataExistsAndReturnProductReviewsDTO
  ): Promise<RequestResponse<Review | null>> {
    const getProductReviewsResponse = await this.checkDataExistsAndReturn(
      (checkDataExistsAndReturnProductReviews) =>
        this._productRepository.getProductReviews(
          checkDataExistsAndReturnProductReviews
        ),
      checkDataExistsAndReturnProductReviews,
      "Reviews not found!"
    );

    return getProductReviewsResponse;
  }

  async checkDataExistsAndReturnUserCartProduct(
    checkDataExistsAndReturnUserCartProduct: CheckDataExistsAndReturnUserCartProductDTO
  ): Promise<RequestResponse<Product | null>> {
    const getUserCartProductResponse = await this.checkDataExistsAndReturn(
      (checkDataExistsAndReturnUserCartProduct) =>
        this._productRepository.getUserCartProduct(
          checkDataExistsAndReturnUserCartProduct
        ),
      checkDataExistsAndReturnUserCartProduct,
      "User cart product not found!"
    );

    return getUserCartProductResponse;
  }

  async checkDataExistsAndReturnUserWishListProduct(
    checkDataExistsAndReturnUserWishListDTO: CheckDataExistsAndReturnUserWishListDTO
  ): Promise<RequestResponse<Product | null>> {
    const getUserWishListResponse = await this.checkDataExistsAndReturn(
      (checkDataExistsAndReturnUserWishListDTO) =>
        this._productRepository.getUserWishListProduct(
          checkDataExistsAndReturnUserWishListDTO
        ),
      checkDataExistsAndReturnUserWishListDTO,
      "User wishlist product not found!"
    );

    return getUserWishListResponse;
  }

  async checkIsUserPasswordCorrect(
    user: User,
    loginUserDTO: LoginUserDTO
  ): Promise<RequestResponse<null> | void> {
    const isPasswordCorrect = await bcrypt.compare(
      loginUserDTO.password as string,
      user.password as string
    );

    if (!isPasswordCorrect) {
      return this.handleError("Invalid Credentials!");
    }
  }

  async checkIsEmailInUse(
    registerUserDTO: RegisterUserDTO
  ): Promise<RequestResponse<User | null> | void> {
    const getUserByEmailResponse = await this._userRepository.getUserByEmail(
      registerUserDTO.email
    );

    if (getUserByEmailResponse) return this.handleError("Email is in use!");
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
