import { injectable, inject } from "inversify";
import { postgres } from "@/data/database/publicSQL/postgres";
import { RatingTitle, Product, Cart, Review, WishList } from "@prisma/client";
import type IUserRepository from "@/interfaces/IUserRepository";
import type IProductService from "../interfaces/IProductService";
import type ICheckerService from "@/interfaces/ICheckerService";
import type { RequestResponse } from "../utils/helpers/types";
import { userRepository } from "@/utils/injector";
import { User, UserCart, CLASSTYPES } from "../utils/helpers/types";
import {
  AddProductToCartDTO,
  AddProductToWishListDTO,
  GetProductReviewsDTO,
  GetUserCartDTO,
  GetUserWishListDTO,
} from "@/utils/helpers/backendDTO";
import IProductRepository from "@/interfaces/IProductRepository";

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
        "Cart retrieved successfully!",
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
        "Wishlist retrieved successfully!",
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
      const getProductByExternalProductIdResponse =
        await this._checkerService.checkDataExistsAndReturnProduct(
          getProductReviewsDTO
        );

      if (
        getProductByExternalProductIdResponse &&
        !getProductByExternalProductIdResponse.success
      )
        return getProductByExternalProductIdResponse;

      const getProductReviewsResponse =
        await this._checkerService.checkDataExistsAndReturnProductReviews(
          getProductByExternalProductIdResponse.data
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

      if (getUserByEmailResponse && !getUserByEmailResponse.success)
        return getUserByEmailResponse;

      const getUserCartResponse =
        await this._checkerService.checkDataExistsAndReturnUserCart(
          getUserByEmailResponse.data
        );

      if (getUserCartResponse && !getUserCartResponse.success) {
        return getUserCartResponse;
      }

      const getUserCartProductResponse =
        await this._checkerService.checkDataExistsAndReturnUserCartProduct({
          cartId: getUserCartResponse.data.id,
          externalProductId: addProductToCartDTO.externalProductId,
        });

      if (getUserCartProductResponse && getUserCartProductResponse.success) {
        await this._productRepository.increaseUserProductQuantity({
          id: getUserCartProductResponse.data.id,
          quantity: getUserCartProductResponse.data.quantity,
        });
      } else {
        await this._productRepository.createUserCartProduct({
          cartId: getUserCartResponse.data.id,
          ...addProductToCartDTO,
        });
      }

      return this._checkerService.handleSuccess(
        "Product added to cart successfully!",
        getUserCartResponse.data || null
      );
    } catch (error) {
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

      console.log("User check response:", getUserByEmailResponse);

      if (getUserByEmailResponse && !getUserByEmailResponse?.success) {
        return getUserByEmailResponse;
      }

      const getUserWishListResponse =
        await this._checkerService.checkDataExistsAndReturnUserWishList(
          getUserByEmailResponse.data
        );

      console.log("Wishlist response:", getUserWishListResponse);

      if (getUserWishListResponse && !getUserWishListResponse.success) {
        const createUserWishList = await this.getUserWishList(
          addProductToWishListDTO
        );

        if (!createUserWishList?.success) {
          return this._checkerService.handleError(
            "Failed to create user wishlist."
          );
        }
      }

      const getUserWishListProductResponse =
        await this._checkerService.checkDataExistsAndReturnUserWishListProduct({
          wishListId: getUserWishListResponse.data.id,
          externalProductId: addProductToWishListDTO.externalProductId,
        });

      console.log("PROUDCT WISH LISTY:", getUserWishListResponse);

      console.log(getUserWishListProductResponse);

      if (
        getUserWishListProductResponse &&
        getUserWishListProductResponse.success
      ) {
        return this._checkerService.handleError(
          "User wishlist product already exists!"
        );
      } else {
        await this._productRepository.createUserWishListProduct({
          wishListId: getUserWishListResponse.data.id,
          ...addProductToWishListDTO,
        });
      }
      return this._checkerService.handleSuccess(
        "Product added to wishlist successfully!",
        getUserWishListResponse.data
      );
    } catch (error) {
      console.error(error);
      return this._checkerService.handleError(
        "Error while adding product to the wishlist!"
      );
    }
  }

  async addReviewToProduct(): Promise<RequestResponse<Review | null>> {
    try {
      if (!this.productData.externalProductId || !this.productData.rating) {
        return {
          success: false,
          message: "Product ID and rating are required!",
          data: null,
        };
      }

      if (!this.productData.email) {
        return {
          success: false,
          message: "User email is required!",
          data: null,
        };
      }

      const user = await userRepository.getUserByEmail(this.productData.email);
      if (!user) {
        return {
          success: false,
          message: "User doesn't exist!",
          data: null,
        };
      }

      let product = await postgres.product.findFirst({
        where: { externalProductId: this.productData.externalProductId },
      });

      if (!product) {
        const addedProduct = await this.addProduct();
        if (!addedProduct.success) {
          return {
            success: false,
            message: "Error adding product to database!",
            data: null,
          };
        }
        product = addedProduct.data;
      }

      const sameReview = await postgres.review.findFirst({
        where: { productId: product?.id, userId: user.id },
      });

      if (sameReview) {
        return {
          success: false,
          message: "User has already written a review for this game!",
          data: null,
        };
      }

      const createdReview = await postgres.review.create({
        data: {
          userId: user.id,
          productId: product?.id as string,
          likes: this.productData.likes,
        },
      });

      await postgres.rating.create({
        data: {
          rating: this.productData.rating,
          reviewId: createdReview.id,
          title: this.productData.title as RatingTitle,
          percent: this.productData.rating * 20,
          description: this.productData.description as string,
        },
      });

      return {
        success: true,
        message: "Review added successfully!",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while adding review!",
        data: null,
      };
    }
  }

  async deleteProductFromCart(): Promise<RequestResponse<Cart | null>> {
    try {
      if (!this.productData.externalProductId) {
        return {
          success: false,
          message: "Product ID is required!",
          data: null,
        };
      }

      const user = await userRepository.getUserByEmail(
        this.productData.email as string
      );

      if (!user) {
        return {
          success: false,
          message: "User doesn't exist!",
          data: null,
        };
      }

      let userCart = await getUserCart(user.id);

      if (!userCart) {
        return {
          success: false,
          message: "Cart doesn't exist!",
          data: null,
        };
      }

      const productInCart = await postgres.product.findFirst({
        where: {
          cartId: userCart.id,
          externalProductId: this.productData.externalProductId,
        },
      });

      if (!productInCart) {
        return {
          success: false,
          message: "Product not found in cart!",
          data: null,
        };
      }

      await postgres.product.delete({
        where: { id: productInCart.id },
      });

      const updatedUserCart = await postgres.cart.findUnique({
        where: { id: userCart.id },
        include: { products: { include: { productsInformations: true } } },
      });

      return {
        success: true,
        message: "Product added to cart successfully!",
        data: updatedUserCart,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while removing product from cart!",
        data: null,
      };
    }
  }

  async deleteProductFromWishList(): Promise<RequestResponse<WishList | null>> {
    try {
      if (!this.productData.externalProductId) {
        return {
          success: false,
          message: "Product ID is required!",
          data: null,
        };
      }

      const user = await userRepository.getUserByEmail(
        this.productData.email as string
      );

      if (!user) {
        return {
          success: false,
          message: "User doesn't exist!",
          data: null,
        };
      }

      let userWishList = await this._productRepository.getUserWishlist(user.id);

      if (!userWishList) {
        return {
          success: false,
          message: "Wishlist doesn't exist!",
          data: null,
        };
      }

      const productInWishList = await postgres.product.findFirst({
        where: {
          wishListId: userWishList.id,
          externalProductId: this.productData.externalProductId,
        },
      });

      if (!productInWishList) {
        return {
          success: false,
          message: "Product not found in wishlist!",
          data: null,
        };
      }

      await postgres.product.delete({
        where: { id: productInWishlist.id },
      });

      const updatedUserWishList = await postgres.wishList.findUnique({
        where: { id: userWishlist.id },
        include: { products: { include: { productsInformations: true } } },
      });

      if (!updatedUserWishList) {
        return {
          success: false,
          message: "Error retrieving updated wishlist!",
          data: null,
        };
      }

      return {
        success: true,
        message: "Product removed from wishlist successfully!",
        data: updatedUserWishList,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while removing product from wishlist!",
        data: null,
      };
    }
  }

  async increaseProductQuantity(): Promise<RequestResponse<Cart | null>> {
    try {
      const user = await userRepository.getUserByEmail(
        this.productData.email as string
      );

      if (!user) {
        return {
          success: false,
          message: "User doesn't exist!",
          data: null,
        };
      }

      let userCart = await getUserCart(user?.id);

      if (!userCart) {
        return {
          success: false,
          message: "Cart not found!",
          data: null,
        };
      }

      const productInCart = await postgres.product.findFirst({
        where: {
          cartId: userCart.id,
          externalProductId: this.productData.externalProductId,
        },
      });

      if (!productInCart) {
        return {
          success: false,
          message: "Product not found in cart!",
          data: null,
        };
      }

      await postgres.product.update({
        where: { id: productInCart.id },
        data: { quantity: (productInCart.quantity ?? 0) + 1 },
      });

      const updatedUserCart = await postgres.cart.findUnique({
        where: { id: userCart.id },
        include: { products: { include: { productsInformations: true } } },
      });

      return {
        success: true,
        message: "Product added to cart successfully!",
        data: updatedUserCart,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong!",
        data: null,
      };
    }
  }

  async decreaseProductQuantity(): Promise<RequestResponse<Cart | null>> {
    try {
      const user = await userRepository.getUserByEmail(
        this.productData.email as string
      );

      if (!user) {
        return {
          success: false,
          message: "User doesn't exist!",
          data: null,
        };
      }

      let userCart = await this._productRepository.getUserCart(user?.id);

      if (!userCart) {
        return {
          success: false,
          message: "Cart not found!",
          data: null,
        };
      }

      const productInCart = await postgres.product.findFirst({
        where: {
          cartId: userCart.id,
          externalProductId: this.productData.externalProductId,
        },
      });

      if (!productInCart) {
        return {
          success: false,
          message: "Product not found in cart!",
          data: null,
        };
      }

      const updatedProduct = await postgres.product.update({
        where: { id: productInCart.id },
        data: { quantity: (productInCart.quantity as number) - 1 },
      });

      if ((updatedProduct.quantity as number) <= 0) {
        await postgres.product.delete({
          where: { id: productInCart.id },
        });
      }

      const updatedUserCart = await postgres.cart.findUnique({
        where: { id: userCart.id },
        include: { products: { include: { productsInformations: true } } },
      });

      return {
        success: true,
        message: "Product added to cart successfully!",
        data: updatedUserCart,
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
