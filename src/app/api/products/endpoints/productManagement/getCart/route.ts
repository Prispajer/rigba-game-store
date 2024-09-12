import { NextRequest, NextResponse } from "next/server";
import ProductService from "@/utils/services/ProductService";
import IProductService from "@/utils/interfaces/IProductsService";
import { RequestResponse } from "@/utils/helpers/types";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const productService: IProductService = new ProductService({ email });

  const getCartResponse = await productService.getCart();

  return NextResponse.json<RequestResponse<LoggedUserCart | null>>({
    success: getCartResponse.success,
    message: getCartResponse.message,
    data: getCartResponse.data,
  });
}
