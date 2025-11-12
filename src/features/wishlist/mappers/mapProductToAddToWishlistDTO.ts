import { generateRandomPrice } from "@/utils/prices";
import { GameAPIProduct } from "@/types/types";
import AddUserProductToWishlistDTO from "../dto/AddUserProductToWishlistDTO";

export default function mapProductToAddToWishlistDTO(
  product: GameAPIProduct,
  email?: string
): AddUserProductToWishlistDTO {
  return {
    email,
    externalProductId: product.id as number,
    name: product.name,
    description: product.description_raw as string,
    background_image: product.background_image,
    price: generateRandomPrice(),
    rating: product.rating,
    slug: product.slug,
    released: product.released,
    added: product.added,
  };
}
