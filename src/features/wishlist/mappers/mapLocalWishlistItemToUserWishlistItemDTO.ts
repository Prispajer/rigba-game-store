import { generateRandomPrice } from "@/features/products/utils/prices";
import AddUserWishlistItemDTO from "../dto/AddUserWishlistItemDTO";
import LocalStorageWishlistItem from "@/features/wishlist/types/localStorageWishlist/localStorageWishlistItem";

export default function mapLocalWishlistItemToUserWishlistItemDTO(
  localStorageWishlistItem: LocalStorageWishlistItem,
  email: string
): AddUserWishlistItemDTO {
  return {
    email,
    externalProductId: localStorageWishlistItem.externalProductId,
    name: localStorageWishlistItem.name,
    background_image: localStorageWishlistItem.background_image,
    price: generateRandomPrice(),
    rating: localStorageWishlistItem.rating,
    slug: localStorageWishlistItem.slug,
    released: localStorageWishlistItem.released,
    added: localStorageWishlistItem.added,
  };
}
