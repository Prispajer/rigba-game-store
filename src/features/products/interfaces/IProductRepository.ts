import {
  GetProductByExternalProductIdDTO,
  DeleteUserProductDTO,
} from "@/utils/helpers/backendDTO";
import { Product } from "@prisma/client";

export default interface IProductRepository {
  getProductByExternalProductId(
    getProductByExternalProductIdDTO: GetProductByExternalProductIdDTO
  ): Promise<Product | null>;
  deleteUserProduct(
    deleteUserProductDTO: DeleteUserProductDTO
  ): Promise<Product | null>;
}
