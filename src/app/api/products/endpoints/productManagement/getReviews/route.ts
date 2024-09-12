import { NextRequest, NextResponse } from "next/server";
import ProductService from "@/utils/services/ProductService";
import IProductService from "@/utils/interfaces/IProductsService";
import { RequestResponse } from "@/utils/helpers/types";

export async function POST(request: NextRequest) {
  const { externalProductId } = await request.json();

  const productService: IProductService = new ProductService({
    externalProductId,
  });

  const getReviewsResponse = await productService.getReviews();

  return NextResponse.json<RequestResponse<LoggedUserCart>>({
    success: getReviewsResponse.success,
    message: getReviewsResponse.message,
    data: getReviewsResponse.data,
  });
}
