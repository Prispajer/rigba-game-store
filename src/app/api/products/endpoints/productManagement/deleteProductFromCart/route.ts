import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";

export async function DELETE(request: NextRequest) {
  const { email, externalProductId } = await request.json();

  const deleteProductFromCartResponse =
    await productService.deleteProductFromCart({ email, externalProductId });

  return NextResponse.json<RequestResponse<LoggedUserUpdatedProduct>>({
    success: deleteProductFromCartResponse.success,
    message: deleteProductFromCartResponse.message,
    data: deleteProductFromCartResponse.data,
  });
}
