import { injectable, inject } from "inversify";
import { postgres } from "@/data/database/publicSQL/postgres";
import { Cart, Review, WishList } from "@prisma/client";
import type IUserRepository from "@/interfaces/IUserRepository";
import type IProductService from "../interfaces/IProductService";
import type ICheckerService from "@/interfaces/ICheckerService";
import type IProductRepository from "@/interfaces/IProductRepository";
import type { RequestResponse } from "../utils/helpers/types";
import { userRepository } from "@/utils/injector";
import { CLASSTYPES } from "../utils/helpers/types";
import {
  AddProductToCartDTO,
  AddProductToWishListDTO,
  AddReviewToProductDTO,
  DecreaseProductQuantityDTO,
  DeleteProductFromCartDTO,
  DeleteProductFromWishListDTO,
  GetProductReviewsDTO,
  GetUserCartDTO,
  GetUserWishListDTO,
  IncreaseProductQuantityDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class ProductService implements IProductService {
  private readonly _checkerService: ICheckerService;
  private readonly _productRepository: IProductRepository;
  private readonly _userRepository: IUserRepository;

  constructor(
    @inject(CLASSTYPES.ICheckerService) checkerService: ICheckerService,
    @inject(CLASSTYPES.IProductRepository)
    productRepository: IProductRepository,
    @inject(CLASSTYPES.IUserRepository) userRepository: IUserRepository
  ) {
    this._checkerService = checkerService;
    this._productRepository = productRepository;
    this._userRepository = userRepository;
  }

  async getUserCart(
    getUserCartDTO: GetUserCartDTO
  ): Promise<RequestResponse<Cart | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(getUserCartDTO);

      if (getUserByEmailResponse && !getUserByEmailResponse.success)
        return getUserByEmailResponse;

      const getUserCartResponse =
        await this._checkerService.checkDataExistsAndReturnUserCart(
          getUserByEmailResponse.data
        );

      if (getUserCartResponse && !getUserCartResponse.success) {
        await this._productRepository.createUserCart(
          getUserByEmailResponse.data
        );
      }

      return this._checkerService.handleSuccess(
        getUserCartResponse.success
          ? "Cart retrieved successfully!"
          : "Cart not found, creating new one!",
        getUserCartResponse.data
      );
    } catch (error) {
      return this._checkerService.handleError("Error while retrieving cart!");
    }
  }

  async getUserWishList(
    getUserWishListDTO: GetUserWishListDTO
  ): Promise<RequestResponse<WishList | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          getUserWishListDTO
        );

      if (getUserByEmailResponse && !getUserByEmailResponse.success)
        return getUserByEmailResponse;

      const getUserWishListResponse =
        await this._checkerService.checkDataExistsAndReturnUserWishList(
          getUserByEmailResponse.data
        );

      if (getUserWishListResponse && !getUserWishListResponse.success) {
        await this._productRepository.createUserWishList(
          getUserByEmailResponse.data
        );
      }

      return this._checkerService.handleSuccess(
        getUserWishListResponse.success
          ? "Wishlist retrieved successfully!"
          : "Wishlist not found, creating new one!",
        getUserWishListResponse.data
      );
    } catch (error) {
      return this._checkerService.handleError(
        "Error while retrieving Wishlist!"
      );
    }
  }

  async getProductReviews(
    getProductReviewsDTO: GetProductReviewsDTO
  ): Promise<RequestResponse<Review | null>> {
    try {
      const getUserProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct(
          getProductReviewsDTO
        );

      if (getUserProductResponse && !getUserProductResponse.success)
        return getUserProductResponse;

      const getProductReviewsResponse =
        await this._checkerService.checkDataExistsAndReturnProductReviews(
          getUserProductResponse.data
        );

      if (getProductReviewsResponse && !getProductReviewsResponse.success) {
        return getProductReviewsResponse;
      }

      return this._checkerService.handleSuccess(
        "Reviews retrieved successfully!",
        getProductReviewsResponse.data
      );
    } catch (error) {
      return this._checkerService.handleError(
        "Error while retrieving reviews!"
      );
    }
  }

  async addProductToCart(
    addProductToCartDTO: AddProductToCartDTO
  ): Promise<RequestResponse<Cart | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          addProductToCartDTO
        );

      if (getUserByEmailResponse && !getUserByEmailResponse.success) {
        return getUserByEmailResponse;
      }

      const getUserCartResponse =
        await this._checkerService.checkDataExistsAndReturnUserCart(
          getUserByEmailResponse.data
        );

      if (getUserCartResponse && !getUserCartResponse.success)
        return getUserCartResponse;

      const getUserProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId: addProductToCartDTO.externalProductId,
          userId: getUserByEmailResponse.data.id,
        });

      if (getUserProductResponse && getUserProductResponse.success) {
        if (getUserProductResponse.data.cartId === null) {
          await prisma?.product.update({
            where: {
              id: getUserProductResponse.data.id,
            },
            data: {
              cartId: getUserCartResponse.data.id,
            },
          });
        }
        await this._productRepository.increaseUserProductQuantity({
          id: getUserProductResponse.data.id,
          userId: getUserByEmailResponse.data.id,
          quantity: getUserProductResponse.data.quantity,
        });
      } else {
        await this._productRepository.createUserCartProduct({
          cartId: getUserCartResponse.data.id,
          userId: getUserByEmailResponse.data.id,
          ...addProductToCartDTO,
        });
      }

      return this._checkerService.handleSuccess(
        "Product added to cart successfully!",
        getUserCartResponse.data || null
      );
    } catch (error) {
      console.error("Error while adding product to cart:", error);
      return this._checkerService.handleError(
        "Error while adding product to the cart!"
      );
    }
  }

  async addProductToWishList(
    addProductToWishListDTO: AddProductToWishListDTO
  ): Promise<RequestResponse<WishList | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          addProductToWishListDTO
        );

      if (getUserByEmailResponse && !getUserByEmailResponse.success)
        return getUserByEmailResponse;

      const getUserWishListResponse =
        await this._checkerService.checkDataExistsAndReturnUserWishList(
          getUserByEmailResponse.data
        );

      if (getUserWishListResponse && !getUserWishListResponse.success)
        return getUserWishListResponse;

      const getUserProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId: addProductToWishListDTO.externalProductId,
          userId: getUserByEmailResponse.data.id,
        });

      if (getUserProductResponse && getUserProductResponse.success) {
        if (getUserProductResponse.data.wishListId === null) {
          await prisma?.product.update({
            where: {
              id: getUserProductResponse.data.id,
            },
            data: {
              wishListId: getUserWishListResponse.data.id,
            },
          });
        }
        return this._checkerService.handleError(
          "User wishlist product already exists!"
        );
      } else {
        await this._productRepository.createUserWishListProduct({
          wishListId: getUserWishListResponse.data.id,
          userId: getUserByEmailResponse.data.id,
          ...addProductToWishListDTO,
        });
      }

      return this._checkerService.handleSuccess(
        "Product added to wishlist successfully!",
        getUserWishListResponse.data
      );
    } catch (error) {
      console.error("Error while adding product to wishlist:", error);
      return this._checkerService.handleError(
        "Error while adding product to the wishlist!"
      );
    }
  }

  async addReviewToProduct(
    addReviewToProductDTO: AddReviewToProductDTO
  ): Promise<RequestResponse<Review | null>> {
    try {
      const { externalProductId } = addReviewToProductDTO;
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          addReviewToProductDTO
        );

      if (getUserByEmailResponse && !getUserByEmailResponse.success)
        return getUserByEmailResponse;

      const getReviewProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId,
          userId: null,
        });

      if (getReviewProductResponse && !getReviewProductResponse.success)
        await this._productRepository.createProductToReview(
          addReviewToProductDTO
        );

      const checkIsSameReviewResponse =
        await this._checkerService.checkIsSameReview(
          getUserByEmailResponse.data,
          getReviewProductResponse.data
        );

      if (checkIsSameReviewResponse && !checkIsSameReviewResponse.success) {
        return checkIsSameReviewResponse;
      } else {
        const createdReview = await this._productRepository.createReview({
          userId: getUserByEmailResponse.data.id,
          productId: getReviewProductResponse.data.id,
          ...addReviewToProductDTO,
        });

        await this._productRepository.createRating({
          reviewId: createdReview.id,
          ...addReviewToProductDTO,
        });
      }

      return this._checkerService.handleSuccess(
        "Review was added successfully to product!",
        null
      );
    } catch (error) {
      return this._checkerService.handleError("Error while adding review!");
    }
  }

  async deleteProductFromCart(
    deleteProductFromCartDTO: DeleteProductFromCartDTO
  ): Promise<RequestResponse<Cart | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          deleteProductFromCartDTO
        );

      if (getUserByEmailResponse && !getUserByEmailResponse.success)
        return getUserByEmailResponse;

      const getUserCartResponse =
        await this._checkerService.checkDataExistsAndReturnUserCart(
          getUserByEmailResponse.data
        );

      if (getUserCartResponse && !getUserCartResponse.success)
        return getUserCartResponse;

      const getUserProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId: deleteProductFromCartDTO.externalProductId,
          userId: getUserByEmailResponse.data.id,
        });

      if (getUserProductResponse && !getUserProductResponse.success) {
        return getUserProductResponse;
      } else if (
        !getUserProductResponse.data.cartId &&
        !getUserProductResponse.data.wishListId
      ) {
        await this._productRepository.deleteUserProduct(
          getUserProductResponse.data
        );
      } else {
        await this._productRepository.deleteUserProductFromCart(
          getUserProductResponse.data
        );
      }

      return this._checkerService.handleSuccess(
        "Product added to cart successfully!",
        getUserCartResponse.data
      );
    } catch (error) {
      return this._checkerService.handleError(
        "Error while removing product from cart!"
      );
    }
  }

  async deleteProductFromWishList(
    deleteProductFromWishListDTO: DeleteProductFromWishListDTO
  ): Promise<RequestResponse<WishList | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          deleteProductFromWishListDTO
        );

      if (getUserByEmailResponse && !getUserByEmailResponse.success)
        return getUserByEmailResponse;

      const getUserWishListResponse =
        await this._checkerService.checkDataExistsAndReturnUserWishList(
          getUserByEmailResponse.data
        );

      if (getUserWishListResponse && !getUserWishListResponse.success)
        return getUserWishListResponse;

      const getUserProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId: deleteProductFromWishListDTO.externalProductId,
          userId: getUserByEmailResponse.data.id,
        });

      if (getUserProductResponse && !getUserProductResponse.success) {
        return getUserProductResponse;
      } else if (
        !getUserProductResponse.data.cartId &&
        !getUserProductResponse.data.wishListId
      ) {
        await this._productRepository.deleteUserProduct(
          getUserProductResponse.data
        );
      } else {
        await this._productRepository.deleteUserProductFromWishList(
          getUserProductResponse.data
        );
      }

      return this._checkerService.handleSuccess(
        "Product added to wishlist successfully!",
        getUserWishListResponse.data
      );
    } catch (error) {
      return this._checkerService.handleError(
        "Error while removing product from wishlist!"
      );
    }
  }

  async increaseProductQuantity(
    increaseProductQuantityDTO: IncreaseProductQuantityDTO
  ): Promise<RequestResponse<Cart | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          increaseProductQuantityDTO
        );

      if (getUserByEmailResponse && !getUserByEmailResponse.success)
        return getUserByEmailResponse;

      const getUserCartResponse =
        await this._checkerService.checkDataExistsAndReturnUserCart(
          getUserByEmailResponse.data
        );

      if (getUserCartResponse && !getUserCartResponse.success)
        return getUserCartResponse;

      const getUserProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId: increaseProductQuantityDTO.externalProductId,
          userId: getUserByEmailResponse.data.id,
        });

      if (getUserProductResponse && !getUserProductResponse.success) {
        return getUserProductResponse;
      }

      await this._productRepository.increaseUserProductQuantity({
        id: getUserProductResponse.data.id,
        userId: getUserByEmailResponse.data.id,
      });

      return {
        success: true,
        message: "Product increase quantity was successfull!",
        data: getUserCartResponse.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong!",
        data: null,
      };
    }
  }

  async decreaseProductQuantity(
    decreaseProductQuantityDTO: DecreaseProductQuantityDTO
  ): Promise<RequestResponse<Cart | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          decreaseProductQuantityDTO
        );

      if (getUserByEmailResponse && !getUserByEmailResponse.success)
        return getUserByEmailResponse;

      const getUserCartResponse =
        await this._checkerService.checkDataExistsAndReturnUserCart(
          getUserByEmailResponse.data
        );

      if (getUserCartResponse && !getUserCartResponse.success)
        return getUserCartResponse;

      const getUserProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId: decreaseProductQuantityDTO.externalProductId,
          userId: getUserByEmailResponse.data.id,
        });

      if (getUserProductResponse && !getUserProductResponse.success) {
        return getUserProductResponse;
      } else if (getUserProductResponse.data.quantity <= 0) {
        await this._productRepository.deleteUserProductFromCart(
          getUserProductResponse.data
        );
      } else {
        await this._productRepository.decreaseUserProductQuantity({
          id: getUserProductResponse.data.id,
          userId: getUserByEmailResponse.data.id,
        });
      }

      return {
        success: true,
        message: "Product decrease quantity was successfull !",
        data: getUserCartResponse,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong!",
        data: null,
      };
    }
  }

  async likeReview(): Promise<RequestResponse<Review | null>> {
    try {
      if (!this.productData.email || !this.productData.externalProductId) {
        return {
          success: false,
          message: "Email and product ID are required!",
          data: null,
        };
      }

      const user = await postgres.user.findUnique({
        where: { email: this.productData.email },
        include: { reviewsLikers: true, reviews: true },
      });

      if (!user) {
        return { success: false, message: "User not found!", data: null };
      }

      const product = await postgres.product.findFirst({
        where: { externalProductId: this.productData.externalProductId },
      });

      if (!product) {
        return { success: false, message: "Product not found!", data: null };
      }

      const review = await postgres.review.findUnique({
        where: { id: this.productData.reviewId },
      });

      const existingLiker = await postgres.reviewLikers.findUnique({
        where: {
          userId_productId_reviewId: {
            userId: user.id,
            productId: product.id,
            reviewId: review?.id as string,
          },
        },
      });

      if (existingLiker) {
        if (existingLiker.isLiked) {
          return {
            success: false,
            message: "You have already liked this review!",
            data: null,
          };
        } else {
          await postgres.reviewLikers.update({
            where: { id: existingLiker.id },
            data: { isLiked: true },
          });

          await postgres.review.update({
            where: { id: review?.id },
            data: { likes: (review?.likes ?? 0) + 1 },
          });

          return {
            success: true,
            message: "Review liked successfully!",
            data: null,
          };
        }
      }

      await postgres.reviewLikers.create({
        data: {
          userId: user.id,
          productId: product.id,
          reviewId: review?.id as string,
          isLiked: true,
        },
      });

      await postgres.review.update({
        where: { id: review?.id as string },
        data: { likes: (review?.likes ?? 0) + 1 },
      });

      return {
        success: true,
        message: "Review liked successfully!",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while liking review!",
        data: null,
      };
    }
  }

  async unLikeReview(): Promise<RequestResponse<Review | null>> {
    try {
      if (!this.productData.email || !this.productData.externalProductId) {
        return {
          success: false,
          message: "Email and product ID are required!",
          data: null,
        };
      }

      const user = await userRepository.getUserByEmail(this.productData.email);

      if (!user) {
        return { success: false, message: "User not found!", data: null };
      }

      const product = await postgres.product.findFirst({
        where: { externalProductId: this.productData.externalProductId },
        include: {
          reviews: true,
        },
      });

      if (!product) {
        return { success: false, message: "Product not found!", data: null };
      }

      const review = await postgres.review.findUnique({
        where: { id: this.productData.reviewId },
      });

      const existingLiker = await postgres.reviewLikers.findUnique({
        where: {
          userId_productId_reviewId: {
            userId: user.id,
            productId: product.id,
            reviewId: review?.id as string,
          },
        },
      });

      if (existingLiker) {
        if (!existingLiker.isLiked) {
          return {
            success: false,
            message: "You have already disliked this review!",
            data: null,
          };
        } else {
          await postgres.reviewLikers.update({
            where: { id: existingLiker.id },
            data: { isLiked: false },
          });

          await postgres.review.update({
            where: { id: review?.id },
            data: { likes: (review?.likes ?? 0) - 1 },
          });

          return {
            success: true,
            message: "Review dislike updated successfully!",
            data: null,
          };
        }
      }

      await postgres.reviewLikers.create({
        data: {
          userId: user.id,
          productId: product.id,
          reviewId: review?.id as string,
          isLiked: false,
        },
      });

      await postgres.review.update({
        where: { id: review?.id },
        data: { likes: (review?.likes ?? 0) - 1 },
      });

      return {
        success: true,
        message: "Review disliked successfully!",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while disliking review!",
        data: null,
      };
    }
  }
}
