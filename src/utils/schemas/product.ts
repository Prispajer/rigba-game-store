import { z } from "zod";

export const ReviewSchema = z.object({
  review: z
    .string()
    .min(150, { message: "Review must be at least 150 characters long!" })
    .max(300, { message: "Review must be at most 500 characters long!" }),
  rating: z
    .string()
    .min(1, { message: "Rating must be at least 1!" })
    .max(5, { message: "Rating must be at most 5!" }),
});
