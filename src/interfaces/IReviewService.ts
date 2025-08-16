import { User, Review, Product, ReviewLikers } from "@prisma/client";
import { RequestResponse } from "@/types/types";
import {
  GetProductReviewsDTO,
  AddReviewToProductDTO,
  LikeReviewDTO,
  UnLikeReviewDTO,
} from "@/utils/helpers/backendDTO";

export default interface IReviewService {
  getProductReviews(
    getProductReviewsDTO: GetProductReviewsDTO
  ): Promise<RequestResponse<Product | Review | null>>;
  addReviewToProduct(
    addReviewToProductDTO: AddReviewToProductDTO
  ): Promise<RequestResponse<User | Review | null>>;
  likeReview(
    likeReviewDTO: LikeReviewDTO
  ): Promise<RequestResponse<User | Product | Review | ReviewLikers | null>>;
  unLikeReview(
    unLikeReviewDTO: UnLikeReviewDTO
  ): Promise<RequestResponse<User | Product | Review | ReviewLikers | null>>;
}
