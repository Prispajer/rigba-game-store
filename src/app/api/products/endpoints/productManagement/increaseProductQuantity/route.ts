import { NextRequest, NextResponse } from "next/server";
import { productRepository } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { Product } from "@prisma/client";

export async function PATCH(request: NextRequest) {
  const { email, externalProductId } = await request.json();

  const increaseProductQuantityResponse =
    await productRepository.increaseUserProductQuantity({
      email,
      externalProductId,
    });

  return NextResponse.json<RequestResponse<Product>>({
    success: increaseProductQuantityResponse.success,
    message: increaseProductQuantityResponse.message,
    data: increaseProductQuantityResponse.data,
  });
}
