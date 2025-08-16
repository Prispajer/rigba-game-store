import { NextRequest, NextResponse } from "next/server";
import { cartService } from "@/utils/injector";
import { RequestResponse } from "@/types/types";
import { Cart } from "@prisma/client";

export async function PATCH(request: NextRequest) {
  const increaseProductQuantityClientData = await request.json();

  const increaseProductQuantityResponse =
    await cartService.increaseProductQuantity(
      increaseProductQuantityClientData
    );

  return NextResponse.json<RequestResponse<Cart | null>>({
    success: increaseProductQuantityResponse.success,
    message: increaseProductQuantityResponse.message,
    data: (increaseProductQuantityResponse.data as Cart) || null,
  });
}
