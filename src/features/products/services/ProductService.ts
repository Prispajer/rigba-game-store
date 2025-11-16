import { injectable } from "inversify";
import type IProductService from "@/features/products/interfaces/IProductService";

@injectable()
export default class ProductService implements IProductService {
    async findByProperty<T, R>(
        findDataByProperty: (property?: R) => Promise<T | null>,
        property?: R
    ): Promise<T | null> {
        try {
            return await findDataByProperty(property);
        } catch {
            return null;
        }
    }
}