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
      const result = await this._productUtils.executeOperation(
        (getUserProductHistoryDTO) =>
          postgres.productHistory.findMany({
            where: { userId: getUserProductHistoryDTO?.userId },
            include: { keys: true, productsInformations: true },
          }),
        getUserProductHistoryDTO
      );
      return result;
    } catch (error) {
      return null;
    }
  }

  async getUserOrderHistory(
    getUserOrderHistoryDTO: GetUserOrderHistoryDTO
  ): Promise<OrderHistory[] | null> {
    try {
      console.log(getUserOrderHistoryDTO);
      const result = await this._productUtils.executeOperation(
        (getUserProductHistoryDTO) =>
          postgres.orderHistory.findMany({
            where: { userId: getUserProductHistoryDTO?.userId },
            include: { keys: true },
          }),
        getUserOrderHistoryDTO
      );
      return result;
    } catch (error) {
      return null;
    }
  }
}
