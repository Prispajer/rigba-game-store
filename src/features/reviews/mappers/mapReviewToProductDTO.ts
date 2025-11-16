import {generateRandomPrice} from "@/features/products/utils/prices";
import ApiProductDetails from "@/features/products/types/api/apiProductDetails";
import AddReviewToProductDTO from "../dto/AddReviewToProductDTO";

export default function mapReviewToProductDTO(
  product: ApiProductDetails,
  email: string,
  reviewDescription: string,
  title: string
): AddReviewToProductDTO {
  return {
    email,
    externalProductId: product.id as number,
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
