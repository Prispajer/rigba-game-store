import { NextRequest, NextResponse } from "next/server";
import ProductService from "@/utils/services/ProductService";
import IProductService from "@/utils/interfaces/IProductsService";
import { RequestResponse } from "@/utils/helpers/types";

export async function DELETE(request: NextRequest) {
  const { email, externalProductId } = await request.json();

  const productService: IProductService = new ProductService({
    email,
    externalProductId,
  });

  const deleteProductFromWishListResponse =
    await productService.deleteProductFromWishList();

  return NextResponse.json<RequestResponse<LoggedUserUpdatedProduct>>({
    success: deleteProductFromWishListResponse.success,
    message: deleteProductFromWishListResponse.message,
    data: deleteProductFromWishListResponse.data,
  });
}
