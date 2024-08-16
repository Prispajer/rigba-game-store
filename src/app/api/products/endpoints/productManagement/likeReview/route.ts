import { NextRequest, NextResponse } from "next/server";
import ProductService from "@/utils/classes/ProductService";
import IProductService from "@/utils/interfaces/IProductsService";
import { RequestResponse } from "@/utils/helpers/types";

export async function PATCH(request: NextRequest) {
  const { email, externalProductId } = await request.json();

  const productService: IProductService = new ProductService();
  const likeReviewResponse = await productService.likeReview();

  return NextResponse.json<RequestResponse<LoggedUserUpdatedProduct>>({
    success: likeReviewResponse.success,
    message: likeReviewResponse.message,
    data: likeReviewResponse.data,
  });
}
