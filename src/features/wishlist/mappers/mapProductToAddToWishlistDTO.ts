import { generateRandomPrice } from "@/utils/prices";
import { GameAPIProduct } from "@/types/types";
import AddUserProductToWishListDTO from "../dto/AddUserProductToWishListDTO";

export default function mapProductToAddToWishlistDTO(
  product: GameAPIProduct,
  email?: string
): AddUserProductToWishListDTO {
  return {
    email,
    externalProductId: product.id,
    name: product.name,
    description: product.description_raw,
    background_image: product.background_image,
    price: generateRandomPrice(),
    rating: product.rating,
    slug: product.slug,
    released: product.released,
    added: product.added,
  };
}
