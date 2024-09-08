import { NextRequest, NextResponse } from "next/server";
import ProductService from "@/utils/classes/ProductService";
import IProductService from "@/utils/interfaces/IProductsService";
import { RequestResponse } from "@/utils/helpers/types";
import { Product } from "@/utils/helpers/types";

export async function POST(request: NextRequest) {
  const {
    email,
    externalProductId,
    name,
    description,
    price,
    background_image,
    rating,
    slug,
    released,
    added,
  } = await request.json();

  const productService: IProductService = new ProductService({
    email,
    externalProductId,
    name,
    description,
    price,
    background_image,
    rating,
    slug,
    released,
    added,
  });

  const addProductToCartResponse = await productService.addProductToCart();

  return NextResponse.json<RequestResponse<LoggedUserProduct>>({
    success: addProductToCartResponse?.success,
    message: addProductToCartResponse?.message,
    data: addProductToCartResponse?.data,
  });
}
