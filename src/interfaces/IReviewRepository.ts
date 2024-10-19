import { Review, ReviewLikers, Rating, Product } from "@prisma/client";
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

export default interface IReviewRepository {
  getProductReviews(
    getProductReviewsDTO: GetProductReviewsDTO
  ): Promise<Product | null>;
  getReview(getReviewDTO: GetReviewDTO): Promise<Review | null>;
  getReviewLikers(
    getReviewLikerDTO: GetReviewLikerDTO
  ): Promise<ReviewLikers | null>;
  createReview(createReviewDTO: CreateReviewDTO): Promise<Review | null>;
  createRating(createRatingDTO: CreateRatingDTO): Promise<Rating | null>;
  createProductToReview(
    createProductToReviewDTO: CreateProductToReviewDTO
  ): Promise<Product | null>;
  createReviewLiker(
    createReviewLikerDTO: CreateReviewLikerDTO
  ): Promise<ReviewLikers | null>;
  deleteReviewLiker(
    deleteReviewLikerDTO: DeleteReviewLikerDTO
  ): Promise<ReviewLikers | null>;
  updateReviewLike(
    updateReviewLikeDTO: UpdateReviewLikeDTO
  ): Promise<Review | null>;
  updateReviewUnLike(
    updateReviewUnLikeDTO: UpdateReviewUnLikeDTO
  ): Promise<Review | null>;
}
