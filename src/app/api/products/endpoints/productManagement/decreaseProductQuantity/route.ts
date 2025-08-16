import { NextRequest, NextResponse } from "next/server";
import { cartService } from "@/utils/injector";
import { RequestResponse } from "@/types/types";
import { Cart } from "@prisma/client";

export async function PATCH(request: NextRequest) {
  const decreaseProductQuantityClientData = await request.json();

  const decreaseProductQuantityResponse =
    await cartService.decreaseProductQuantity(
      decreaseProductQuantityClientData
    );

  return NextResponse.json<RequestResponse<Cart | null>>({
    success: decreaseProductQuantityResponse.success,
    message: decreaseProductQuantityResponse.message,
    data: (decreaseProductQuantityResponse.data as Cart) || null,
  });
}
