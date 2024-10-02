import { postgres } from "../database/publicSQL/postgres";
import { injectable } from "inversify";
import IProductUtils from "@/interfaces/IProductUtils";
import { User } from "@/utils/helpers/types";

@injectable()
export default class ProductUtils implements IProductUtils {
  async getDataByProperty<T>(
    findDataByProperty: (
      userId: string | undefined,
      externalProductId: number | undefined
    ) => Promise<T | null>,
    userId?: string,
    externalProductId?: number
  ): Promise<T | null> {
    try {
      const dataByProperty = await findDataByProperty(
        userId,
        externalProductId
      );
      return dataByProperty;
    } catch {
      return null;
    }
  }

  async createDataByProperty<T>(
    createDataByProperty: () => Promise<T>
  ): Promise<T> {
    return await createDataByProperty();
  }
}
