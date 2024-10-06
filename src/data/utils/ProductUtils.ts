import { postgres } from "../database/publicSQL/postgres";
import { injectable } from "inversify";
import IProductUtils from "@/interfaces/IProductUtils";
import { User } from "@/utils/helpers/types";

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
      console.error("Error during database operation:", error);
      return null;
    }
  }
}
