import { NextRequest, NextResponse } from "next/server";
import { wishListService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";
import { WishList } from "@prisma/client";

export async function POST(request: NextRequest) {
  const getWishListClientData = await request.json();

  const getUserWishListResponse = await wishListService.getUserWishList(
    getWishListClientData
  );

  return NextResponse.json<RequestResponse<WishList>>({
    success: getUserWishListResponse.success,
    message: getUserWishListResponse.message,
    data: getUserWishListResponse.data,
  });
}
