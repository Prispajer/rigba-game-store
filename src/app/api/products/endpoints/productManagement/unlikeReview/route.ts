import { NextRequest, NextResponse } from "next/server";
import ProductService from "@/utils/classes/ProductService";
import { RequestResponse } from "@/utils/helpers/types";

export async function PATCH(request: NextRequest) {
  const { email, externalProductId } = await request.json();

  const productService = new ProductService(email, externalProductId);
  const unlikeReviewResponse = await productService.unLikeReview();

  return NextResponse.json<RequestResponse<any | null>>({
    success: unlikeReviewResponse.success,
    message: unlikeReviewResponse.message,
    data: unlikeReviewResponse.data,
  });
}
