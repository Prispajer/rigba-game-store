import { NextRequest, NextResponse } from "next/server";
import { wishlistService } from "@/utils/injector";
import RequestResponse from "@/shared/types/requestResponse"
import { Wishlist } from "@prisma/client";

export async function POST(request: NextRequest) {
  const addProductToWishlistClientData = await request.json();

  const addProductToWishlistResponse =
    await wishlistService.addProductToWishlist(addProductToWishlistClientData);


  return NextResponse.json<RequestResponse<Wishlist | null>>({
    success: addProductToWishlistResponse.success,
    message: addProductToWishlistResponse.message,
    data: (addProductToWishlistResponse.data as Wishlist) || null,
  });
}
