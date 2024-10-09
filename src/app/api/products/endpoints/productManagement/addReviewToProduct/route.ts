import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";

export async function POST(request: NextRequest) {
  const {
    email,
    externalProductId,
    name,
    price,
    background_image,
    rating,
    description,
    slug,
    released,
    added,
    title,
    likes,
  } = await request.json();

  const addReviewToProductResponse = await productService.addReviewToProduct({
    email,
    externalProductId,
    name,
    price,
    background_image,
    rating,
    description,
    slug,
    released,
    added,
    title,
    likes,
  });

  return NextResponse.json<RequestResponse<any | null>>({
    success: addReviewToProductResponse.success,
    message: addReviewToProductResponse.message,
    data: addReviewToProductResponse.data,
  });
}
