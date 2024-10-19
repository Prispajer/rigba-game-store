import { injectable } from "inversify";
import type IProductUtils from "@/interfaces/IProductUtils";

@injectable()
export default class ProductUtils implements IProductUtils {
  async executeOperation<T, R>(
    findDataByProperty: (property?: R) => Promise<T | null>,
    property?: R
  ): Promise<T | null> {
    try {
      const dataByProperty = await findDataByProperty(property);
      return dataByProperty;
    } catch (error) {
      return null;
    }
  }
}
