import { NextRequest, NextResponse } from "next/server";
import { reviewService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { Review } from "@prisma/client";

export async function POST(request: NextRequest) {
  const getReviewsClientData = await request.json();

  const getReviewsResponse = await reviewService.getProductReviews(
    getReviewsClientData
  );

  return NextResponse.json<RequestResponse<Review | null>>({
    success: getReviewsResponse.success,
    message: getReviewsResponse.message,
    data: (getReviewsResponse.data as Review) || null,
  });
}
