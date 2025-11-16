import type Product from "@/features/products/types/product";

type localStorageWishlistItem = Omit<Pick<Product, "name" | "slug" | "rating" | "released" | "added" | "price" | "background_image" >, "id"> & {
    externalProductId: number;
}

export default localStorageWishlistItem;