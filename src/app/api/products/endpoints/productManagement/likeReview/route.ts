import { NextRequest, NextResponse } from "next/server";
import ProductService from "@/utils/classes/ProductService";
import { RequestResponse } from "@/utils/helpers/types";

export async function PATCH(request: NextRequest) {
  const { email, externalProductId } = await request.json();

  const productService = new ProductService(email, externalProductId);
  const likeReviewResponse = await productService.likeReview();

  return NextResponse.json<RequestResponse<any | null>>({
    success: likeReviewResponse.success,
    message: likeReviewResponse.message,
    data: likeReviewResponse.data,
  });
}
