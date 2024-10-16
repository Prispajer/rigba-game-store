import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { Cart } from "@prisma/client";

export async function DELETE(request: NextRequest) {
  const deleteProductFromCartClientData = await request.json();

  const deleteProductFromCartResponse =
    await productService.deleteProductFromCart(deleteProductFromCartClientData);

  return NextResponse.json<RequestResponse<Cart>>({
    success: deleteProductFromCartResponse.success,
    message: deleteProductFromCartResponse.message,
    data: deleteProductFromCartResponse.data,
  });
}
