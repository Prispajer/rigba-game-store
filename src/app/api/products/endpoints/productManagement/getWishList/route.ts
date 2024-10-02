import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const getUserWishListResponse = await productService.getUserWishList({
    email,
  });

  return NextResponse.json<RequestResponse<LoggedUserCart>>({
    success: getUserWishListResponse.success,
    message: getUserWishListResponse.message,
    data: getUserWishListResponse.data,
  });
}
