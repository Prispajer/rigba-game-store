import { NextRequest, NextResponse } from "next/server";
import { reviewService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { Review } from "@prisma/client";

export async function PATCH(request: NextRequest) {
  const likeReviewClientData = await request.json();

  const likeReviewResponse = await reviewService.likeReview(
    likeReviewClientData
  );

  return NextResponse.json<RequestResponse<Review | null>>({
    success: likeReviewResponse.success,
    message: likeReviewResponse.message,
    data: likeReviewResponse.data,
  });
}
