import { generateRandomPrice } from "@/utils/prices";
import { GameAPIProduct } from "@/types/types";
import AddReviewToProductDTO from "../dto/AddReviewToProductDTO";

export default function mapReviewToProductDTO(
  product: GameAPIProduct,
  email: string,
  reviewDescription: string,
  title: string
): AddReviewToProductDTO {
  return {
    email,
    externalProductId: product.id,
    name: product.name,
    description: reviewDescription,
    background_image: product.background_image,
    price: generateRandomPrice(),
    rating: product.rating,
    title,
    slug: product.slug,
    released: product.released,
    added: product.added,
    likes: 0,
  };
}
