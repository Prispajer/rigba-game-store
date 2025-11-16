import { NextRequest, NextResponse } from "next/server";
import { wishlistService } from "@/utils/injector";
import RequestResponse from "@/shared/types/requestResponse";
import { Wishlist } from "@prisma/client";

export async function POST(request: NextRequest) {
  const getWishlistClientData = await request.json();

  const getUserWishlistResponse = await wishlistService.getUserWishlist(
      getWishlistClientData
  );

  return NextResponse.json<RequestResponse<Wishlist | null>>({
    success: getUserWishlistResponse.success,
    message: getUserWishlistResponse.message,
    data: (getUserWishlistResponse.data as Wishlist) || null,
  });
}
