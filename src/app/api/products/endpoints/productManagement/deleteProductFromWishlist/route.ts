import { NextRequest, NextResponse } from "next/server";
import { wishlistService } from "@/utils/injector";
import RequestResponse from "@/shared/types/requestResponse";
import { Wishlist } from "@prisma/client";

export async function DELETE(request: NextRequest) {
  const deleteProductFromWishlistClientData = await request.json();

  const deleteProductFromWishlistResponse =
    await wishlistService.deleteProductFromWishlist(
      deleteProductFromWishlistClientData
    );

  return NextResponse.json<RequestResponse<Wishlist | null>>({
    success: deleteProductFromWishlistResponse.success,
    message: deleteProductFromWishlistResponse.message,
    data: (deleteProductFromWishlistResponse.data as Wishlist) || null,
  });
}
