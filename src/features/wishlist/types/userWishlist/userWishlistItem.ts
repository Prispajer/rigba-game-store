import Product from "@/features/products/types/product";

type UserWishlistItem  = {
    id: string;
    externalProductId: number;
    cartId: string | null;
    userId: string | null;
    quantity: number | null;
    wishListId: string | null;
    productsInformations: Product;
}

export default UserWishlistItem ;