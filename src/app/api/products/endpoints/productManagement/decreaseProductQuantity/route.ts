import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/utils/injector";
import { RequestResponse } from "@/utils/helpers/types";

export async function PATCH(request: NextRequest) {
  const { email, externalProductId } = await request.json();

  const decreaseProductQuantityResponse =
    await productService.decreaseProductQuantity({ email, externalProductId });

  return NextResponse.json<RequestResponse<LoggedUserUpdatedProduct>>({
    success: decreaseProductQuantityResponse.success,
    message: decreaseProductQuantityResponse.message,
    data: decreaseProductQuantityResponse.data,
  });
}
