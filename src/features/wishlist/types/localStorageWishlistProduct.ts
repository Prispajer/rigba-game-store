import { ProductInformations } from "@/types/types";

export default interface LocalStorageWishlistProduct
  extends ProductInformations {
  externalProductId: number;
}
