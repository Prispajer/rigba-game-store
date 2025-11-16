import ProductReviewRecord from "@/features/reviews/types/productReviewRecord";

export type UserReviewsState = {
  reviews: ProductReviewRecord[];
  status: string;
  error: string | null;
  success: string | null;
  message: string | null;
};
