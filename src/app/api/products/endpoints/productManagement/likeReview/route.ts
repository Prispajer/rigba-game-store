import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";

export async function PATCH(request: NextRequest) {
  const { email, externalProductId, reviewId } = await request.json();

  const likeReviewResponse = await productService.likeReview({
    email,
    externalProductId,
    reviewId,
  });

  return NextResponse.json<RequestResponse<Review | null>>({
    success: likeReviewResponse.success,
    message: likeReviewResponse.message,
    data: likeReviewResponse.data,
  });
}
