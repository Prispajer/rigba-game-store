import { User, ProductHistory, OrderHistory } from "@prisma/client";
import { RequestResponse } from "@/types/types";
import {
  GetUserProductHistoryDTO,
  GetUserOrderHistoryDTO,
} from "@/utils/helpers/backendDTO";

export default interface IPurchaseHistoryService {
  getUserProductHistory(
    getUserProductHistoryDTO: GetUserProductHistoryDTO
  ): Promise<RequestResponse<User | ProductHistory[] | null>>;
  getUserOrderHistory(
    getUserOrderHistoryDTO: GetUserOrderHistoryDTO
  ): Promise<RequestResponse<User | OrderHistory[] | null>>;
}
