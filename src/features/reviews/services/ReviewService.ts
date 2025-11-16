import { injectable, inject } from "inversify";
import type ICheckerService from "@/interfaces/ICheckerService";
import type IReviewRepository from "@/features/reviews/interfaces/IReviewRepository";
import type IReviewService from "@/features/reviews/interfaces/IReviewService";
import { User, Review, Product, ReviewLikers } from "@prisma/client";
import RequestResponse from "@/shared/types/requestResponse";
import CLASSTYPES from "@/shared/constants/classTypes";
import {
  GetProductReviewsDTO,
  AddReviewToProductDTO,
  LikeReviewDTO,
  UnLikeReviewDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class ReviewService implements IReviewService {
  private readonly _checkerService: ICheckerService;
  private readonly _reviewRepository: IReviewRepository;
  constructor(
    @inject(CLASSTYPES.ICheckerService) checkerService: ICheckerService,
    @inject(CLASSTYPES.IReviewRepository)
    reviewRepository: IReviewRepository
  ) {
    this._checkerService = checkerService;
    this._reviewRepository = reviewRepository;
  }

  async getProductReviews(
    getProductReviewsDTO: GetProductReviewsDTO
  ): Promise<RequestResponse<Product | Review | null>> {
    try {
      const getUserProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct(
          getProductReviewsDTO
        );

      if (
        (getUserProductResponse && !getUserProductResponse.success) ||
        !getUserProductResponse.data
      ) {
        return getUserProductResponse;
      }

      const getProductReviewsResponse =
        await this._checkerService.checkDataExistsAndReturnProductReviews({
          externalProductId: getUserProductResponse.data.externalProductId,
          userId: null,
        });

      if (
        (getProductReviewsResponse && !getProductReviewsResponse.success) ||
        !getProductReviewsResponse.data
      ) {
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

  async addReviewToProduct(
    addReviewToProductDTO: AddReviewToProductDTO
  ): Promise<RequestResponse<User | Review | null>> {
    try {
      const { externalProductId } = addReviewToProductDTO;

      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          addReviewToProductDTO
        );

      if (
        (getUserByEmailResponse && !getUserByEmailResponse.success) ||
        !getUserByEmailResponse.data
      ) {
        return getUserByEmailResponse;
      }

      const getReviewProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId,
          userId: null,
        });

      let productId!: string;

      if (
        (getReviewProductResponse && !getReviewProductResponse.success) ||
        !getReviewProductResponse.data
      ) {
        const createdProduct =
          await this._reviewRepository.createProductToReview(
            addReviewToProductDTO
          );

        if (createdProduct) {
          productId = createdProduct.id;
        }
      } else {
        productId = getReviewProductResponse.data.id;
      }

      const checkIsSameReviewResponse =
        getReviewProductResponse.data &&
        (await this._checkerService.checkIsSameReview(
          getUserByEmailResponse.data,
          { ...getReviewProductResponse.data, id: productId }
        ));

      if (checkIsSameReviewResponse && !checkIsSameReviewResponse.success) {
        return checkIsSameReviewResponse;
      }

      const createdReview = await this._reviewRepository.createReview({
        productId,
        ...addReviewToProductDTO,
        userId: getUserByEmailResponse.data.id,
      });

      if (createdReview)
        await this._reviewRepository.createRating({
          ...addReviewToProductDTO,
          reviewId: createdReview.id,
        });

      return this._checkerService.handleSuccess(
        "Review was added successfully to product!",
        null
      );
    } catch (error) {
      console.error("Error while adding review:", error);
      return this._checkerService.handleError("Error while adding review!");
    }
  }

  async likeReview(
    likeReviewDTO: LikeReviewDTO
  ): Promise<RequestResponse<User | Product | Review | ReviewLikers | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(likeReviewDTO);

      if (
        (getUserByEmailResponse && !getUserByEmailResponse.success) ||
        !getUserByEmailResponse.data
      )
        return getUserByEmailResponse;

      const getProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId: likeReviewDTO.externalProductId,
          userId: null,
        });

      if (
        (getProductResponse && !getProductResponse.success) ||
        !getProductResponse.data
      )
        return getProductResponse;

      const getReviewResponse =
        await this._checkerService.checkDataExistsAndReturnReview({
          reviewId: likeReviewDTO.reviewId,
          productId: getProductResponse.data.id,
        });

      if (
        (getReviewResponse && !getReviewResponse.success) ||
        !getReviewResponse.data
      ) {
        return getReviewResponse;
      }

      const getReviewLikersResponse =
        await this._checkerService.checkDataExistsAndReturnReviewLikers({
          userId: getUserByEmailResponse.data.id,
          productId: getProductResponse.data.id,
          reviewId: getReviewResponse.data.id,
        });

      if (
        getReviewLikersResponse &&
        getReviewLikersResponse.data &&
        getReviewLikersResponse.data.isLiked
      ) {
        return this._checkerService.handleError(
          "You have already liked this review!"
        );
      }

      if (getReviewLikersResponse && !getReviewLikersResponse.success) {
        await this._reviewRepository.createReviewLiker({
          userId: getUserByEmailResponse.data.id,
          productId: getProductResponse.data.id,
          reviewId: getReviewResponse.data.id,
        });

        await this._reviewRepository.updateReviewLike({
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
  ): Promise<RequestResponse<User | Product | Review | ReviewLikers | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          unLikeReviewDTO
        );

      if (
        (getUserByEmailResponse && !getUserByEmailResponse.success) ||
        !getUserByEmailResponse.data
      )
        return getUserByEmailResponse;

      const getProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId: unLikeReviewDTO.externalProductId,
          userId: null,
        });

      if (
        (getProductResponse && !getProductResponse.success) ||
        !getProductResponse.data
      )
        return getProductResponse;

      const getReviewResponse =
        await this._checkerService.checkDataExistsAndReturnReview({
          reviewId: unLikeReviewDTO.reviewId,
          productId: getProductResponse.data.id,
        });

      if (
        (getReviewResponse && !getReviewResponse.success) ||
        !getReviewResponse.data
      ) {
        return getReviewResponse;
      }

      const getReviewLikersResponse =
        await this._checkerService.checkDataExistsAndReturnReviewLikers({
          userId: getUserByEmailResponse.data.id,
          productId: getProductResponse.data.id,
          reviewId: getReviewResponse.data.id,
        });

      if (getReviewLikersResponse && getReviewLikersResponse.data?.isLiked) {
        await this._reviewRepository.deleteReviewLiker(
          getReviewLikersResponse.data
        );

        await this._reviewRepository.updateReviewUnLike({
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
