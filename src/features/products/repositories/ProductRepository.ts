import { injectable, inject } from "inversify";
import { postgres } from "@/lib/db";
import type IProductRepository from "@/features/products/interfaces/IProductRepository";
import type IProductService from "@/features/products/interfaces/IProductService";
import { Product } from "@prisma/client";
import CLASSTYPES from "@/shared/constants/classTypes";
import {
    DeleteUserProductDTO, GetProductByExternalProductIdDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class ProductRepository implements IProductRepository {
  private readonly _productService: IProductService;

  constructor(@inject(CLASSTYPES.IProductService) productService: IProductService) {
    this._productService = productService;
  }

    async getProductByExternalProductId(
        getProductByExternalProductIdDTO: GetProductByExternalProductIdDTO
    ): Promise<Product | null> {
        if (!getProductByExternalProductIdDTO.externalProductId) {
            return null;
        }
        try {
            return await this._productService.findByProperty(
                () =>
                    postgres.product.findFirst({
                        where: {
                            externalProductId: getProductByExternalProductIdDTO.externalProductId,
                            userId: getProductByExternalProductIdDTO.userId,
                        },
                    }),
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
