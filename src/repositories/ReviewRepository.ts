import { injectable, inject } from "inversify";
import { postgres } from "@/data/database/publicSQL/postgres";
import IReviewRepository from "@/interfaces/IReviewRepository";
import type IProductUtils from "@/interfaces/IProductUtils";
import {
  Review,
  ReviewLikers,
  Rating,
  RatingTitle,
  Product,
} from "@prisma/client";
import { CLASSTYPES } from "@/utils/helpers/types";
import {
  GetProductReviewsDTO,
  GetReviewDTO,
  GetReviewLikerDTO,
  CreateReviewDTO,
  CreateRatingDTO,
  CreateProductToReviewDTO,
  CreateReviewLikerDTO,
  DeleteReviewLikerDTO,
  UpdateReviewLikeDTO,
  UpdateReviewUnLikeDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class ReviewRepository implements IReviewRepository {
  private readonly _productUtils: IProductUtils;

  constructor(@inject(CLASSTYPES.IProductUtils) productUtils: IProductUtils) {
    this._productUtils = productUtils;
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
                  reviewLikers: true,
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

  async updateReviewLike(
    updateReviewLikeDTO: UpdateReviewLikeDTO
  ): Promise<Review | null> {
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
