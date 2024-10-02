export default interface IProductUtils {
  getDataByProperty<T>(
    findDataByProperty: (
      userId: string | undefined,
      externalProductId: number | undefined
    ) => Promise<T | null>,
    userId?: string,
    externalProductId?: number
  ): Promise<T | null>;
  createDataByProperty<T>(createDataByProperty: () => Promise<T>): Promise<T>;
}
