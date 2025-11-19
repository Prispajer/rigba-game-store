import { NextRequest, NextResponse } from "next/server";
import { reviewService } from "@/utils/injector";
import RequestResponse from "@/shared/types/requestResponse";
import { Review } from "@prisma/client";

export async function PATCH(request: NextRequest) {
  const unLikeReviewClientData = await request.json();

  const unlikeReviewResponse = await reviewService.unLikeReview(
    unLikeReviewClientData
  );

  return NextResponse.json<RequestResponse<Review | null>>({
    success: unlikeReviewResponse.success,
    message: unlikeReviewResponse.message,
    data: (unlikeReviewResponse.data as Review) || null,
  });
}
