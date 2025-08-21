import { UserReview } from "@/types/types";

export type ReviewsState = {
  reviews: UserReview[];
  status: string;
  error: string | null;
  success: string | null;
  message: string | null;
};
