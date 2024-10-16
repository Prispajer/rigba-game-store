import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { Cart } from "@prisma/client";

export async function POST(request: NextRequest) {
  const addProductToCartClientData = await request.json();

  const addProductToCartResponse = await productService.addProductToCart(
    addProductToCartClientData
  );

  return NextResponse.json<RequestResponse<Cart>>({
    success: addProductToCartResponse?.success,
    message: addProductToCartResponse?.message,
    data: addProductToCartResponse?.data,
  });
}
