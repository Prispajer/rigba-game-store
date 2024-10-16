import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { Cart } from "@prisma/client";

export async function PATCH(request: NextRequest) {
  const decreaseProductQuantityClientData = await request.json();

  const decreaseProductQuantityResponse =
    await productService.decreaseProductQuantity(
      decreaseProductQuantityClientData
    );

  return NextResponse.json<RequestResponse<Cart>>({
    success: decreaseProductQuantityResponse.success,
    message: decreaseProductQuantityResponse.message,
    data: decreaseProductQuantityResponse.data,
  });
}
