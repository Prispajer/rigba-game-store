import { injectable, inject } from "inversify";
import { Cart, Review, WishList } from "@prisma/client";
import type IUserRepository from "@/interfaces/IUserRepository";
import type IProductService from "../interfaces/IProductService";
import type ICheckerService from "@/interfaces/ICheckerService";
import type IProductRepository from "@/interfaces/IProductRepository";
import type { RequestResponse } from "../utils/helpers/types";
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
  LikeReviewDTO,
  UnLikeReviewDTO,
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
        await this._checkerService.checkDataExistsAndReturnProductReviews({
          externalProductId: getUserProductResponse.data.externalProductId,
          userId: null,
        });

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
          ...addProductToCartDTO,
          cartId: getUserCartResponse.data.id,
          userId: getUserByEmailResponse.data.id,
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
          ...addProductToWishListDTO,
          wishListId: getUserWishListResponse.data.id,
          userId: getUserByEmailResponse.data.id,
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
          ...addReviewToProductDTO,
          userId: getUserByEmailResponse.data.id,
          productId: getReviewProductResponse.data.id,
        });

        await this._productRepository.createRating({
          ...addReviewToProductDTO,
          reviewId: createdReview.id,
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
        quantity: getUserProductResponse.data.quantity,
      });

      return this._checkerService.handleSuccess(
        "Product quantity increased successfully!",
        getUserCartResponse.data
      );
    } catch (error) {
      return this._checkerService.handleError(
        "There was problem in increasing product quantity!"
      );
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
          quantity: getUserProductResponse.data.quantity,
        });
      }

      return this._checkerService.handleSuccess(
        "Product quantity decreased successfully!",
        getUserCartResponse.data
      );
    } catch (error) {
      return this._checkerService.handleError(
        "There was problem in decreasing product quantity!"
      );
    }
  }

  async likeReview(
    likeReviewDTO: LikeReviewDTO
  ): Promise<RequestResponse<Review | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(likeReviewDTO);

      if (getUserByEmailResponse && !getUserByEmailResponse.success)
        return getUserByEmailResponse;

      const getProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId: likeReviewDTO.externalProductId,
          userId: null,
        });

      if (getProductResponse && !getProductResponse.success)
        return getProductResponse;

      const getReviewResponse =
        await this._checkerService.checkDataExistsAndReturnReview({
          reviewId: likeReviewDTO.reviewId,
          productId: getProductResponse.data.id,
        });

      if (getReviewResponse && !getReviewResponse.success) {
        return getReviewResponse;
      }

      const getReviewLikersResponse =
        await this._checkerService.checkDataExistsAndReturnReviewLikers({
          userId: getUserByEmailResponse.data.id,
          productId: getProductResponse.data.id,
          reviewId: getReviewResponse.data.id,
        });

      if (getReviewLikersResponse && getReviewLikersResponse.data?.isLiked) {
        return this._checkerService.handleError(
          "You have already liked this review!"
        );
      }

      if (getReviewLikersResponse && !getReviewLikersResponse.success) {
        await this._productRepository.createReviewLiker({
          userId: getUserByEmailResponse.data.id,
          productId: getProductResponse.data.id,
          reviewId: getReviewResponse.data.id,
        });

        await this._productRepository.updateReviewLike({
          id: getReviewResponse.data.id,
          likes: getReviewResponse.data.likes,
        });
      }

      return this._checkerService.handleSuccess(
        "Review liked successfully!",
        getReviewLikersResponse.data
      );
    } catch (error) {
      return this._checkerService.handleError("Error while liking review!");
    }
  }

  async unLikeReview(
    unLikeReviewDTO: UnLikeReviewDTO
  ): Promise<RequestResponse<Review | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          unLikeReviewDTO
        );

      if (getUserByEmailResponse && !getUserByEmailResponse.success)
        return getUserByEmailResponse;

      const getProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId: unLikeReviewDTO.externalProductId,
          userId: null,
        });

      if (getProductResponse && !getProductResponse.success)
        return getProductResponse;

      const getReviewResponse =
        await this._checkerService.checkDataExistsAndReturnReview({
          reviewId: unLikeReviewDTO.reviewId,
          productId: getProductResponse.data.id,
        });

      if (getReviewResponse && !getReviewResponse.success) {
        return getReviewResponse;
      }

      const getReviewLikersResponse =
        await this._checkerService.checkDataExistsAndReturnReviewLikers({
          userId: getUserByEmailResponse.data.id,
          productId: getProductResponse.data.id,
          reviewId: getReviewResponse.data.id,
        });

      if (getReviewLikersResponse && getReviewLikersResponse.data?.isLiked) {
        await this._productRepository.deleteReviewLiker(
          getReviewLikersResponse.data
        );

        await this._productRepository.updateReviewUnLike({
          id: getReviewResponse.data.id,
          likes: getReviewResponse.data.likes,
        });
      }

      return this._checkerService.handleSuccess(
        "Review unliked successfully!",
        getReviewLikersResponse.data
      );
    } catch (error) {
      return this._checkerService.handleError("Error while unliking review!");
    }
  }
}
