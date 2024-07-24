import { NextRequest, NextResponse } from "next/server";
import ProductService from "@/utils/classes/productService";
import IProductService from "@/utils/interfaces/iProductsService";
import { RequestResponse, LoggedUserProduct } from "@/utils/helpers/types";

export async function POST(request: NextRequest) {
  const { externalProductId, name, description, price, imageUrl, email } =
    await request.json();

  const productService: IProductService = new ProductService(
    email,
    externalProductId,
    name,
    description,
    price,
    imageUrl
  );
  const addProductToWishlistResponse =
    await productService.addProductToWishlist();

  return NextResponse.json<RequestResponse<LoggedUserProduct>>({
    success: addProductToWishlistResponse?.success,
    message: addProductToWishlistResponse?.message,
    data: addProductToWishlistResponse?.data,
  });
}
