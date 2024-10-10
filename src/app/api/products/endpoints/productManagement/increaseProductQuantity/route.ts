import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { Product, Cart } from "@prisma/client";

export async function PATCH(request: NextRequest) {
  const { email, externalProductId } = await request.json();

  const increaseProductQuantityResponse =
    await productService.increaseProductQuantity({
      email,
      externalProductId,
    });

  return NextResponse.json<RequestResponse<Cart>>({
    success: increaseProductQuantityResponse.success,
    message: increaseProductQuantityResponse.message,
    data: increaseProductQuantityResponse.data,
  });
}
