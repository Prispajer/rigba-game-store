import { NextRequest, NextResponse } from "next/server";
import { wishListService } from "@/utils/injector";
import { RequestResponse } from "@/types/types";
import { WishList, User } from "@prisma/client";

export async function POST(request: NextRequest) {
  const addProductToWishListClientData = await request.json();

  const addProductToWishlistResponse =
    await wishListService.addProductToWishList(addProductToWishListClientData);

  return NextResponse.json<RequestResponse<WishList | null>>({
    success: addProductToWishlistResponse.success,
    message: addProductToWishlistResponse.message,
    data: (addProductToWishlistResponse.data as WishList) || null,
  });
}
