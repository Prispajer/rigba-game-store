import { Review } from "@/types/types";

export type ReviewsState = {
  reviews: Review[];
  status: string;
  error: string | null;
  success: string | null;
  message: string | null;
};
