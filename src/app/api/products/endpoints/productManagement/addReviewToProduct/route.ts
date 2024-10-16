import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { Review } from "@prisma/client";

export async function POST(request: NextRequest) {
  const addReviewToProductClientData = await request.json();

  const addReviewToProductResponse = await productService.addReviewToProduct(
    addReviewToProductClientData
  );

  return NextResponse.json<RequestResponse<Review | null>>({
    success: addReviewToProductResponse.success,
    message: addReviewToProductResponse.message,
    data: addReviewToProductResponse.data,
  });
}
