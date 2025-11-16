export default interface IProductService {
    findByProperty<T>(findDataByProperty: () => Promise<T | null>): Promise<T | null>;
}