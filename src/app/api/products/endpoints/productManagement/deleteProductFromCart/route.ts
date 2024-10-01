import { NextRequest, NextResponse } from "next/server";
import ProductService from "@/services/ProductService";
import IProductService from "@/interfaces/IProductsService";
import { RequestResponse } from "@/utils/helpers/types";

export async function DELETE(request: NextRequest) {
  const { email, externalProductId } = await request.json();

  const productService: IProductService = new ProductService({
    email,
    externalProductId,
  });

  const deleteProductFromCartResponse =
    await productService.deleteProductFromCart();

  return NextResponse.json<RequestResponse<LoggedUserUpdatedProduct>>({
    success: deleteProductFromCartResponse.success,
    message: deleteProductFromCartResponse.message,
    data: deleteProductFromCartResponse.data,
  });
}
