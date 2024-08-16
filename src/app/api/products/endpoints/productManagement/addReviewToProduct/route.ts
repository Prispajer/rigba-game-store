import { NextRequest, NextResponse } from "next/server";
import ProductService from "@/utils/classes/ProductService";
import { RequestResponse } from "@/utils/helpers/types";

export async function POST(request: NextRequest) {
  const {
    email,
    externalProductId,
    name,
    price,
    background_image,
    rating,
    description,
    slug,
    released,
    added,
    title,
    likes,
  } = await request.json();

  if (!email || !externalProductId || !rating) {
    return NextResponse.json<RequestResponse<any | null>>({
      success: false,
      message: "Email, Product ID, and rating are required!",
      data: null,
    });
  }

  const productService = new ProductService(
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
    title,
    likes
  );

  const response = await productService.addReviewToProduct();

  return NextResponse.json<RequestResponse<any | null>>({
    success: response.success,
    message: response.message,
    data: response.data,
  });
}
