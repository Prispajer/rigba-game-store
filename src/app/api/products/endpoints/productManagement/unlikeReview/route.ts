import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { Review } from "@prisma/client";

export async function PATCH(request: NextRequest) {
  const unLikeReviewClientData = await request.json();

  const unlikeReviewResponse = await productService.unLikeReview(
    unLikeReviewClientData
  );

  return NextResponse.json<RequestResponse<Review | null>>({
    success: unlikeReviewResponse.success,
    message: unlikeReviewResponse.message,
    data: unlikeReviewResponse.data,
  });
}
