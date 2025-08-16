import { NextRequest, NextResponse } from "next/server";
import { reviewService } from "@/utils/injector";
import { RequestResponse } from "@/types/types";
import { Review } from "@prisma/client";

export async function POST(request: NextRequest) {
  const addReviewToProductClientData = await request.json();

  const addReviewToProductResponse = await reviewService.addReviewToProduct(
    addReviewToProductClientData
  );

  return NextResponse.json<RequestResponse<Review | null>>({
    success: addReviewToProductResponse.success,
    message: addReviewToProductResponse.message,
    data: (addReviewToProductResponse.data as Review) || null,
  });
}
