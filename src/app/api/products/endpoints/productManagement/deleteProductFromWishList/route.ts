import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";

export async function DELETE(request: NextRequest) {
  const { email, externalProductId } = await request.json();

  const deleteProductFromWishListResponse =
    await productService.deleteProductFromWishList({
      email,
      externalProductId,
    });

  return NextResponse.json<RequestResponse<LoggedUserUpdatedProduct>>({
    success: deleteProductFromWishListResponse.success,
    message: deleteProductFromWishListResponse.message,
    data: deleteProductFromWishListResponse.data,
  });
}
