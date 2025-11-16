import { injectable, inject } from "inversify";
import { postgres } from "@/lib/db";
import type IProductService from "@/features/products/interfaces/IProductService";
import type IPurchaseHistoryRepository from "@/features/history/interfaces/IPurchaseHistoryRepository";
import { ProductHistory, OrderHistory } from "@prisma/client";
import CLASSTYPES from "@/shared/constants/classTypes";import {
  GetUserProductHistoryDTO,
  GetUserOrderHistoryDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class PurchaseHistoryRepository
  implements IPurchaseHistoryRepository
{
  private readonly _productService: IProductService;

  constructor(@inject(CLASSTYPES.IProductService) productService: IProductService) {
    this._productService = productService;
  }

  async getUserProductHistory(
    getUserProductHistoryDTO: GetUserProductHistoryDTO
  ): Promise<ProductHistory[] | null> {
    try {
      return await this._productService.findByProperty(
        () =>
          postgres.productHistory.findMany({
            where: { userId: getUserProductHistoryDTO?.userId },
            include: { keys: true, productsInformations: true },
          }),
      );
    } catch (error) {
      return null;
    }
  }

  async getUserOrderHistory(
    getUserOrderHistoryDTO: GetUserOrderHistoryDTO
  ): Promise<OrderHistory[] | null> {
    try {
        return await this._productService.findByProperty(
        () =>
          postgres.orderHistory.findMany({
            where: { userId: getUserOrderHistoryDTO?.userId },
            include: { keys: true },
          }),

      );
    } catch (error) {
      return null;
    }
  }
}
