import { injectable, inject } from "inversify";
import { postgres } from "@/data/database/publicSQL/postgres";
import type IProductRepository from "@/interfaces/IProductRepository";
import type IProductUtils from "@/interfaces/IProductUtils";
import {
  User,
  Cart,
  WishList,
  Product,
  Review,
  Rating,
  RatingTitle,
  ReviewLikers,
} from "@prisma/client";
import { CLASSTYPES } from "@/utils/helpers/types";
import {
  CreateUserCartProductDTO,
  GetUserCartDTO,
  GetUserWishListDTO,
  GetProductReviewsDTO,
  GetProductByExternalProductIdDTO,
  CreateUserWishListProductDTO,
  UserProductQuantityDTO,
  CreateProductToReviewDTO,
  CreateReviewDTO,
  CreateRatingDTO,
  DeleteUserProductFromCartDTO,
  DeleteUserProductFromWishListDTO,
  DeleteUserProductDTO,
  GetReviewDTO,
  GetReviewLikerDTO,
  CreateReviewLikerDTO,
  UpdateReviewLikeDTO,
  UpdateReviewUnLikeDTO,
  DeleteReviewLikerDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class ProductRepository implements IProductRepository {
  private readonly _productUtils: IProductUtils;

  constructor(@inject(CLASSTYPES.IProductUtils) productUtils: IProductUtils) {
    this._productUtils = productUtils;
  }

  async getUserCart(getUserCartDTO: GetUserCartDTO): Promise<Cart | null> {
    try {
      return await this._productUtils.executeOperation(
        (getUserCartDTO) =>
          postgres.cart.findUnique({
            where: { userId: getUserCartDTO?.id },
            include: {
              products: {
                include: {
                  productsInformations: true,
                },
              },
            },
          }),
        getUserCartDTO
      );
    } catch {
      return null;
    }
  }

  async getUserWishList(
    getUserWishListDTO: GetUserWishListDTO
  ): Promise<WishList | null> {
    try {
      return await this._productUtils.executeOperation(
        (getUserWishListDTO) =>
          postgres.wishList.findUnique({
            where: { userId: getUserWishListDTO?.id },
            include: {
              products: {
                include: {
                  productsInformations: true,
                },
              },
            },
          }),
        getUserWishListDTO
      );
    } catch {
      return null;
    }
  }

  async getProductReviews(
    getProductReviewsDTO: GetProductReviewsDTO
  ): Promise<Product | null> {
    try {
      return await this._productUtils.executeOperation(
        (getProductReviewsDTO) =>
          postgres.product.findFirst({
            where: {
              externalProductId: getProductReviewsDTO?.externalProductId,
              userId: null,
            },
            include: {
              reviews: {
                include: {
                  rating: true,
                  user: true,
                },
              },
            },
          }),
        getProductReviewsDTO
      );
    } catch {
      return null;
    }
  }

  async getReview(getReviewDTO: GetReviewDTO): Promise<Review | null> {
    try {
      return await this._productUtils.executeOperation(
        (getReviewDTO) =>
          postgres.review.findFirst({
            where: {
              id: getReviewDTO?.reviewId,
              productId: getReviewDTO?.productId,
            },
          }),
        getReviewDTO
      );
    } catch {
      return null;
    }
  }

  async getReviewLikers(
    getReviewLikerDTO: GetReviewLikerDTO
  ): Promise<ReviewLikers | null> {
    try {
      return await this._productUtils.executeOperation(
        (getReviewLikerDTO) =>
          postgres.reviewLikers.findFirst({
            where: {
              userId: getReviewLikerDTO?.userId,
              productId: getReviewLikerDTO?.productId,
              reviewId: getReviewLikerDTO?.reviewId,
            },
          }),
        getReviewLikerDTO
      );
    } catch {
      return null;
    }
  }

  async getProductByExternalProductId(
    getProductByExternalProductIdDTO: GetProductByExternalProductIdDTO
  ): Promise<Product | null> {
    try {
      if (!getProductByExternalProductIdDTO.externalProductId) {
        return null;
      }
      return await this._productUtils.executeOperation(
        (getProductByExternalProductIdDTO) =>
          postgres.product.findFirst({
            where: {
              externalProductId:
                getProductByExternalProductIdDTO?.externalProductId,
              userId: getProductByExternalProductIdDTO?.userId,
            },
          }),
        getProductByExternalProductIdDTO
      );
    } catch {
      return null;
    }
  }

  async createUserCart(user: User): Promise<Cart | null> {
    return await this._productUtils.executeOperation(() =>
      postgres.cart.create({
        data: { userId: user.id, products: {} },
        include: { products: true },
      })
    );
  }

  async createUserWishList(user: User): Promise<WishList | null> {
    return await this._productUtils.executeOperation(() =>
      postgres.wishList.create({
        data: { userId: user.id, products: {} },
        include: { products: true },
      })
    );
  }

  async createReview(createReviewDTO: CreateReviewDTO): Promise<Review | null> {
    return await postgres.review.create({
      data: {
        userId: createReviewDTO.userId,
        productId: createReviewDTO.productId,
        likes: createReviewDTO.likes,
      },
    });
  }

  async createRating(createRatingDTO: CreateRatingDTO): Promise<Rating | null> {
    return await postgres.rating.create({
      data: {
        rating: createRatingDTO.rating,
        reviewId: createRatingDTO.reviewId,
        title: createRatingDTO.title as RatingTitle,
        percent: createRatingDTO.rating * 20,
        description: createRatingDTO.description,
      },
    });
  }

  async createUserCartProduct(
    createUserCartProductDTO: CreateUserCartProductDTO
  ): Promise<Product | null> {
    return await this._productUtils.executeOperation(() =>
      postgres.product.create({
        data: {
          cartId: createUserCartProductDTO.cartId,
          userId: createUserCartProductDTO.userId,
          externalProductId: createUserCartProductDTO.externalProductId,
          quantity: 1,
          productsInformations: {
            create: {
              name: createUserCartProductDTO.name,
              description: createUserCartProductDTO.description,
              price: createUserCartProductDTO.price,
              background_image: createUserCartProductDTO.background_image,
              rating: createUserCartProductDTO.rating,
              slug: createUserCartProductDTO.slug,
              released: createUserCartProductDTO.released,
              added: createUserCartProductDTO.added,
            },
          },
        },
      })
    );
  }

  async createUserWishListProduct(
    createUserWishListProductDTO: CreateUserWishListProductDTO
  ): Promise<Product | null> {
    return await this._productUtils.executeOperation(() =>
      postgres.product.create({
        data: {
          wishListId: createUserWishListProductDTO.wishListId,
          userId: createUserWishListProductDTO.userId,
          externalProductId: createUserWishListProductDTO.externalProductId,
          productsInformations: {
            create: {
              name: createUserWishListProductDTO.name,
              description: createUserWishListProductDTO.description,
              price: createUserWishListProductDTO.price,
              background_image: createUserWishListProductDTO.background_image,
              rating: createUserWishListProductDTO.rating,
              slug: createUserWishListProductDTO.slug,
              released: createUserWishListProductDTO.released,
              added: createUserWishListProductDTO.added,
            },
          },
        },
      })
    );
  }

  async createUserProductFromWishList(
    createProductToReviewDTO: CreateProductToReviewDTO
  ): Promise<Product | null> {
    return await this._productUtils.executeOperation(() =>
      postgres.product.create({
        data: {
          externalProductId: createProductToReviewDTO.externalProductId,
          productsInformations: {
            create: {
              name: createProductToReviewDTO.name,
              description: createProductToReviewDTO.description,
              price: createProductToReviewDTO.price,
              background_image: createProductToReviewDTO.background_image,
              rating: createProductToReviewDTO.rating,
              slug: createProductToReviewDTO.slug,
              released: createProductToReviewDTO.released,
              added: createProductToReviewDTO.added,
            },
          },
        },
      })
    );
  }

  async createProductToReview(
    createProductToReviewDTO: CreateProductToReviewDTO
  ): Promise<Product | null> {
    return await this._productUtils.executeOperation(() =>
      postgres.product.create({
        data: {
          externalProductId: createProductToReviewDTO.externalProductId,
          productsInformations: {
            create: {
              name: createProductToReviewDTO.name,
              description: createProductToReviewDTO.description,
              price: createProductToReviewDTO.price,
              background_image: createProductToReviewDTO.background_image,
              rating: createProductToReviewDTO.rating,
              slug: createProductToReviewDTO.slug,
              released: createProductToReviewDTO.released,
              added: createProductToReviewDTO.added,
            },
          },
        },
      })
    );
  }

  async createReviewLiker(
    createReviewLikerDTO: CreateReviewLikerDTO
  ): Promise<ReviewLikers | null> {
    return await postgres.reviewLikers.create({
      data: {
        userId: createReviewLikerDTO.userId,
        productId: createReviewLikerDTO.productId,
        reviewId: createReviewLikerDTO?.reviewId as string,
        isLiked: true,
      },
    });
  }

  async deleteUserProductFromCart(
    deleteUserProductFromCartDTO: DeleteUserProductFromCartDTO
  ): Promise<Product | null> {
    return await postgres.product.update({
      where: { id: deleteUserProductFromCartDTO.id },
      data: {
        cartId: null,
        quantity: null,
      },
    });
  }

  async deleteUserProductFromWishList(
    deleteUserProductFromWishListDTO: DeleteUserProductFromWishListDTO
  ): Promise<Product | null> {
    return await postgres.product.update({
      where: { id: deleteUserProductFromWishListDTO.id },
      data: {
        wishListId: null,
      },
    });
  }

  async deleteUserProduct(
    deleteUserProductDTO: DeleteUserProductDTO
  ): Promise<Product | null> {
    return await postgres.product.delete({
      where: { id: deleteUserProductDTO.id },
    });
  }

  async deleteReviewLiker(
    deleteReviewLikerDTO: DeleteReviewLikerDTO
  ): Promise<ReviewLikers | null> {
    return await postgres.reviewLikers.delete({
      where: {
        userId_productId_reviewId: {
          userId: deleteReviewLikerDTO.userId,
          productId: deleteReviewLikerDTO.productId,
          reviewId: deleteReviewLikerDTO.reviewId,
        },
      },
    });
  }

  async increaseUserProductQuantity(
    userProductQuantityDTO: UserProductQuantityDTO
  ): Promise<Product | null> {
    return await this._productUtils.executeOperation(
      (userProductQuantityDTO) =>
        postgres.product.update({
          where: {
            id: userProductQuantityDTO?.id,
            userId: userProductQuantityDTO?.userId,
          },
          data: { quantity: (userProductQuantityDTO?.quantity ?? 0) + 1 },
        }),
      userProductQuantityDTO
    );
  }

  async decreaseUserProductQuantity(
    userProductQuantityDTO: UserProductQuantityDTO
  ): Promise<Product | null> {
    return await this._productUtils.executeOperation(
      (userProductQuantityDTO) =>
        postgres.product.update({
          where: {
            id: userProductQuantityDTO?.id,
            userId: userProductQuantityDTO?.userId,
          },
          data: { quantity: (userProductQuantityDTO?.quantity ?? 0) - 1 },
        }),
      userProductQuantityDTO
    );
  }

  async updateReviewLike(
    updateReviewLikeDTO: UpdateReviewLikeDTO
  ): Promise<Review | null> {
    console.log("UPDATEREVIEWLIKE", updateReviewLikeDTO);
    return await this._productUtils.executeOperation(
      (updateReviewLikeDTO) =>
        postgres.review.update({
          where: { id: updateReviewLikeDTO?.id },
          data: { likes: (updateReviewLikeDTO?.likes ?? 0) + 1 },
        }),
      updateReviewLikeDTO
    );
  }

  async updateReviewUnLike(
    updateReviewUnLikeDTO: UpdateReviewUnLikeDTO
  ): Promise<Review | null> {
    console.log("UPDATEREVIEWUNLINE", updateReviewUnLikeDTO);
    return await this._productUtils.executeOperation(
      (updateReviewUnLikeDTO) =>
        postgres.review.update({
          where: { id: updateReviewUnLikeDTO?.id },
          data: { likes: (updateReviewUnLikeDTO?.likes ?? 0) - 1 },
        }),
      updateReviewUnLikeDTO
    );
  }
}
