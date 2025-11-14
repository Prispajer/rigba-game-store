import { Key } from "@prisma/client";
import Product from "@/features/products/types/product";

type PurchasedProductRecord = {
    id: string;
    externalProductId: number;
    cartId: string;
    userId: string;
    quantity: number;
    keys: Key[];
    productsInformations: Product;
}

export default PurchasedProductRecord;