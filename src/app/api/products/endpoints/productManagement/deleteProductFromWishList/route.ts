import { NextRequest, NextResponse } from "next/server";
import { wishListService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";

export async function DELETE(request: NextRequest) {
  const deleteProductFromWishListClientData = await request.json();

  const deleteProductFromWishListResponse =
    await wishListService.deleteProductFromWishList(
      deleteProductFromWishListClientData
    );

  return NextResponse.json<RequestResponse<LoggedUserUpdatedProduct>>({
    success: deleteProductFromWishListResponse.success,
    message: deleteProductFromWishListResponse.message,
    data: deleteProductFromWishListResponse.data,
  });
}
