import { injectable, inject } from "inversify";
import { postgres } from "@/data/database/publicSQL/postgres";
import type IProductUtils from "@/interfaces/IProductUtils";
import type IPurchaseHistoryRepository from "@/interfaces/IPurchaseHistoryRepository";
import { ProductHistory, OrderHistory } from "@prisma/client";
import { CLASSTYPES } from "@/utils/helpers/types";
import {
  GetUserProductHistoryDTO,
  GetUserOrderHistoryDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class PurchaseHistoryRepository
  implements IPurchaseHistoryRepository
{
  private readonly _productUtils: IProductUtils;

  constructor(@inject(CLASSTYPES.IProductUtils) productUtils: IProductUtils) {
    this._productUtils = productUtils;
  }

  async getUserProductHistory(
    getUserProductHistoryDTO: GetUserProductHistoryDTO
  ): Promise<ProductHistory[] | null> {
    try {
      console.log("Product history response:", getUserProductHistoryDTO);

      return await this._productUtils.executeOperation(
        (getUserProductHistoryDTO) =>
          postgres.productHistory.findMany({
            where: { userId: getUserProductHistoryDTO?.userId },
            include: {
              keys: true,
            },
          }),
        getUserProductHistoryDTO
      );
    } catch (error) {
      return null;
    }
  }

  async getUserOrderHistory(
    getUserOrderHistoryDTO: GetUserOrderHistoryDTO
  ): Promise<OrderHistory[] | null> {
    try {
      return await this._productUtils.executeOperation(
        (getUserOrderHistoryDTO) =>
          postgres.orderHistory.findMany({
            where: { userId: getUserOrderHistoryDTO?.userId },
          }),
        getUserOrderHistoryDTO
      );
    } catch (error) {
      return null;
    }
  }
}
