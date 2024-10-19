import { NextRequest, NextResponse } from "next/server";
import { wishListService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { WishList } from "@prisma/client";

export async function POST(request: NextRequest) {
  const addProductToWishListClientData = await request.json();

  const addProductToWishlistResponse =
    await wishListService.addProductToWishList(addProductToWishListClientData);

  return NextResponse.json<RequestResponse<WishList | User>>({
    success: addProductToWishlistResponse?.success,
    message: addProductToWishlistResponse?.message,
    data: addProductToWishlistResponse?.data,
  });
}
