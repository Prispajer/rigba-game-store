import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const getCartResponse = await productService.getUserCart({ email });

  return NextResponse.json<RequestResponse<LoggedUserCart | null>>({
    success: getCartResponse.success,
    message: getCartResponse.message,
    data: getCartResponse.data,
  });
}
