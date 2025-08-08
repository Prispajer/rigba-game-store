import { injectable, inject } from "inversify";
import { postgres } from "@/lib/db";
import type IProductRepository from "@/interfaces/IProductRepository";
import type IProductUtils from "@/interfaces/IProductUtils";
import { Product } from "@prisma/client";
import { CLASSTYPES } from "@/utils/helpers/types";
import {
  GetProductByExternalProductIdDTO,
  DeleteUserProductDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class ProductRepository implements IProductRepository {
  private readonly _productUtils: IProductUtils;

  constructor(@inject(CLASSTYPES.IProductUtils) productUtils: IProductUtils) {
    this._productUtils = productUtils;
  }

  async getProductByExternalProductId(
    getProductByExternalProductIdDTO: GetProductByExternalProductIdDTO
  ): Promise<Product | null> {
    if (!getProductByExternalProductIdDTO.externalProductId) {
      return null;
    }
    try {
      return await this._productUtils.executeOperation(
        (getProductByExternalProductIdDTO) =>
          postgres.product.findFirst({
            where: {
              externalProductId:
                getProductByExternalProductIdDTO?.externalProductId,
              userId: getProductByExternalProductIdDTO?.userId,
            },
          }),
        getProductByExternalProductIdDTO
      );
    } catch {
      return null;
    }
  }

  async deleteUserProduct(
    deleteUserProductDTO: DeleteUserProductDTO
  ): Promise<Product | null> {
    return await postgres.product.delete({
      where: { id: deleteUserProductDTO.id },
    });
  }
}
