import { RequestResponse } from "@/utils/helpers/types";
import {
  CreateUserCartProductDTO,
  GetUserCartDTO,
  GetUserWishListDTO,
  GetProductReviewsDTO,
  GetProductByExternalProductIdDTO,
  UserProductQuantityDTO,
  CreateProductToReviewDTO,
  CreateReviewDTO,
  CreateRatingDTO,
  DeleteUserProductFromCartDTO,
  DeleteUserProductDTO,
  GetReviewDTO,
  GetReviewLikerDTO,
  CreateReviewLikerDTO,
  UpdateReviewLikeDTO,
  UpdateReviewUnLikeDTO,
  DeleteReviewLikerDTO,
} from "@/utils/helpers/backendDTO";
import { User, Product, Cart, Review, WishList } from "@prisma/client";

export default interface IProductRepository {
  getProductReviews(
    getProductReviewsDTO: GetProductReviewsDTO
  ): Promise<Product | null>;
  getReview(getReviewDTO: GetReviewDTO): Promise<Review | null>;
  getReviewLikers(
    getReviewLikerDTO: GetReviewLikerDTO
  ): Promise<ReviewLikers | null>;
  getProductByExternalProductId(
    getProductByExternalProductIdDTO: GetProductByExternalProductIdDTO
  ): Promise<Product | null>;
  createReview(createReviewDTO: CreateReviewDTO): Promise<Review | null>;
  createRating(createRatingDTO: CreateRatingDTO): Promise<Rating | null>;
  createProductToReview(
    createProductToReviewDTO: CreateProductToReviewDTO
  ): Promise<Product | null>;
  createReviewLiker(
    createReviewLikerDTO: CreateReviewLikerDTO
  ): Promise<ReviewLikers | null>;
  deleteUserProduct(
    deleteUserProductDTO: DeleteUserProductDTO
  ): Promise<Product | null>;
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
