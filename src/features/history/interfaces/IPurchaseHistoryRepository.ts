import { ProductHistory, OrderHistory } from "@prisma/client";
import {
  GetUserProductHistoryDTO,
  GetUserOrderHistoryDTO,
} from "@/utils/helpers/backendDTO";

export default interface IPurchaseHistoryRepository {
  getUserProductHistory(
    getUserProductHistoryDTO: GetUserProductHistoryDTO
  ): Promise<ProductHistory[] | null>;
  getUserOrderHistory(
    getUserOrderHistoryDTO: GetUserOrderHistoryDTO
  ): Promise<OrderHistory[] | null>;
}
