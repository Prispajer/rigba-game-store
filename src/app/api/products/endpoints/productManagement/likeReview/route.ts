import { NextRequest, NextResponse } from "next/server";
import ProductService from "@/utils/services/ProductService";
import { RequestResponse } from "@/utils/helpers/types";

export async function PATCH(request: NextRequest) {
  const { email, externalProductId, reviewId } = await request.json();

  const productService = new ProductService({
    email,
    externalProductId,
    reviewId,
  });

  const likeReviewResponse = await productService.likeReview();

  return NextResponse.json<RequestResponse<any | null>>({
    success: likeReviewResponse.success,
    message: likeReviewResponse.message,
    data: likeReviewResponse.data,
  });
}
