import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { Review } from "@prisma/client";

export async function POST(request: NextRequest) {
  const getReviewsClientData = await request.json();

  const getReviewsResponse = await productService.getProductReviews(
    getReviewsClientData
  );

  return NextResponse.json<RequestResponse<Review>>({
    success: getReviewsResponse.success,
    message: getReviewsResponse.message,
    data: getReviewsResponse.data,
  });
}
