import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { Review } from "@prisma/client";

export async function PATCH(request: NextRequest) {
  const likeReviewClientData = await request.json();

  const likeReviewResponse = await productService.likeReview(
    likeReviewClientData
  );

  return NextResponse.json<RequestResponse<Review | null>>({
    success: likeReviewResponse.success,
    message: likeReviewResponse.message,
    data: likeReviewResponse.data,
  });
}
