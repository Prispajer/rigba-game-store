import { generateRandomPrice } from "@/features/products/utils/prices";
import AddUserCartItemDTO from "@/features/cart/dto/AddUserCartItemDTO";
import LocalStorageCartItem from "@/features/cart/types/localStorageCart/localStorageCartProduct";

export default function mapLocalCartItemToUserCartItemDTO(
  localStorageCartItem: LocalStorageCartItem,
  email: string
): AddUserCartItemDTO {
  return {
    email,
    externalProductId: localStorageCartItem.externalProductId,
    quantity: localStorageCartItem.quantity,
    name: localStorageCartItem.name,
    price: generateRandomPrice(),
    background_image: localStorageCartItem.background_image,
    description: localStorageCartItem.description,
    rating: localStorageCartItem.rating,
    slug: localStorageCartItem.slug,
    released: localStorageCartItem.released,
    added: localStorageCartItem.added,
  };
}
