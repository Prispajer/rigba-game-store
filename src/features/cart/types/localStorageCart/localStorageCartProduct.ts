import type Product from "@/features/products/types/product";

type LocalStorageCartItem = Omit<Pick<Product, "name" | "slug" | "description" | "rating" | "released" | "added" | "price" | "background_image">, "id"> & {
    externalProductId: number;
    quantity: number;
}

export default LocalStorageCartItem;
