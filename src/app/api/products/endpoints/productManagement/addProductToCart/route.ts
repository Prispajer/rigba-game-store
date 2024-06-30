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
  const addProductToCartResponse = await productService.addProductToCart();

  return NextResponse.json<RequestResponse<LoggedUserProduct>>({
    success: addProductToCartResponse?.success,
    message: addProductToCartResponse?.message,
    data: addProductToCartResponse?.data,
  });
}
