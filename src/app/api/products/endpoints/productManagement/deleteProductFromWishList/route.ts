import { NextRequest, NextResponse } from "next/server";
import { wishListService } from "@/utils/injector";
import { RequestResponse } from "@/types/types";
import { WishList } from "@prisma/client";

export async function DELETE(request: NextRequest) {
  const deleteProductFromWishListClientData = await request.json();

  const deleteProductFromWishListResponse =
    await wishListService.deleteProductFromWishList(
      deleteProductFromWishListClientData
    );

  return NextResponse.json<RequestResponse<WishList | null>>({
    success: deleteProductFromWishListResponse.success,
    message: deleteProductFromWishListResponse.message,
    data: (deleteProductFromWishListResponse.data as WishList) || null,
  });
}
