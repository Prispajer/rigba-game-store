import { NextRequest, NextResponse } from "next/server";
import { cartService } from "@/utils/injector";
import { RequestResponse } from "@/types/types";
import { Cart } from "@prisma/client";

export async function POST(request: NextRequest) {
  const getCartClientData = await request.json();

  const getCartResponse = await cartService.getUserCart(getCartClientData);

  return NextResponse.json<RequestResponse<Cart | null>>({
    success: getCartResponse.success,
    message: getCartResponse.message,
    data: (getCartResponse.data as Cart) || null,
  });
}
