import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";

export async function PATCH(request: NextRequest) {
  const { email, externalProductId, reviewId } = await request.json();

  const unlikeReviewResponse = await productService.unLikeReview({
    email,
    externalProductId,
    reviewId,
  });

  return NextResponse.json<RequestResponse<any | null>>({
    success: unlikeReviewResponse.success,
    message: unlikeReviewResponse.message,
    data: unlikeReviewResponse.data,
  });
}
