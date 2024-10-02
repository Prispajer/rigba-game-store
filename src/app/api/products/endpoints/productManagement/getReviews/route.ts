import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";

export async function POST(request: NextRequest) {
  const { externalProductId } = await request.json();

  const getReviewsResponse = await productService.getProductReviews({
    externalProductId,
  });

  return NextResponse.json<RequestResponse<LoggedUserCart>>({
    success: getReviewsResponse.success,
    message: getReviewsResponse.message,
    data: getReviewsResponse.data,
  });
}
