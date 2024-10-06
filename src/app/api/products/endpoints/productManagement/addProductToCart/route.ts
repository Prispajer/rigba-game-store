import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { Product } from "@/utils/helpers/types";
export async function POST(request: NextRequest) {
  const {
    email,
    externalProductId,
    name,
    description,
    price,
    background_image,
    rating,
    slug,
    released,
    added,
  } = await request.json();

  const addProductToCartResponse = await productService.addProductToCart({
    email,
    externalProductId,
    name,
    description,
    price,
    background_image,
    rating,
    slug,
    released,
    added,
  });

  return NextResponse.json<RequestResponse<Product>>({
    success: addProductToCartResponse?.success,
    message: addProductToCartResponse?.message,
    data: addProductToCartResponse?.data,
  });
}
