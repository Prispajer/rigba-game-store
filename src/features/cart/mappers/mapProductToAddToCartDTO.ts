import { generateRandomPrice } from "@/utils/prices";
import { GameAPIProduct } from "@/types/types";
import AddUserProductToCartDTO from "../dto/AddUserProductToCartDTO";

export default function mapProductToAddToCartDTO(
  product: GameAPIProduct,
  email?: string
): AddUserProductToCartDTO {
  return {
    email,
    externalProductId: product.id as number,
    quantity: null,
    name: product.name,
    price: generateRandomPrice(),
    background_image: product.background_image,
    description: product.description_raw as string,
    rating: product.rating,
    slug: product.slug,
    released: product.released,
    added: product.added,
  };
}
