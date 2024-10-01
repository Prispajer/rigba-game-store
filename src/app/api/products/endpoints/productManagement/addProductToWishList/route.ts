import { NextRequest, NextResponse } from "next/server";
import ProductService from "@/services/ProductService";
import IProductService from "@/interfaces/IProductsService";
import { RequestResponse } from "@/utils/helpers/types";

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

  const addProductToWishlistResponse =
    await productService.addProductToWishlist();

  return NextResponse.json<RequestResponse<LoggedUserProduct>>({
    success: addProductToWishlistResponse?.success,
    message: addProductToWishlistResponse?.message,
    data: addProductToWishlistResponse?.data,
  });
}
