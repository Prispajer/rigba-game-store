import { NextRequest, NextResponse } from "next/server";
import ProductService from "@/utils/classes/productService";
import IProductService from "@/utils/interfaces/iProductsService";
import {
  RequestResponse,
  LoggedUserUpdatedProduct,
} from "@/utils/helpers/types";

export async function PATCH(request: NextRequest) {
  const { email, externalProductId } = await request.json();

  const productService: IProductService = new ProductService(
    email,
    externalProductId
  );
  const decreaseProductQuantityResponse =
    await productService.decreaseProductQuantity();

  return NextResponse.json<RequestResponse<LoggedUserUpdatedProduct>>({
    success: decreaseProductQuantityResponse.success,
    message: decreaseProductQuantityResponse.message,
    data: decreaseProductQuantityResponse.data,
  });
}
