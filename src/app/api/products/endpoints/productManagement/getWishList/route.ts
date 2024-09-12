import { NextRequest, NextResponse } from "next/server";
import ProductService from "@/utils/services/ProductService";
import IProductService from "@/utils/interfaces/IProductsService";
import { RequestResponse } from "@/utils/helpers/types";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const productService: IProductService = new ProductService({ email });

  const getUserWishListResponse = await productService.getWishList();

  return NextResponse.json<RequestResponse<LoggedUserCart>>({
    success: getUserWishListResponse.success,
    message: getUserWishListResponse.message,
    data: getUserWishListResponse.data,
  });
}
