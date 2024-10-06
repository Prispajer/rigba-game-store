export default interface IProductUtils {
  executeOperation<T, R>(
    findDataByProperty: (property?: R) => Promise<T | null>,
    property?: R
  ): Promise<T | null>;
}
