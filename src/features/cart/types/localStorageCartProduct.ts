import { ProductInformations } from "@/types/types";

export default interface LocalStorageCartProduct extends ProductInformations {
  externalProductId: number;
  quantity: number;
}
