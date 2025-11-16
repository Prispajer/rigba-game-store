import ApiProductDetails from "@/features/products/types/api/apiProductDetails";
import ApiPagination from "@/features/products/types/api/apiPagination";

export default interface IFetchService {
  fetchData(url: string): Promise<any>;
  getProduct(productSlug: string): Promise<ApiProductDetails>;
  getProducts(searchQuery?: string): Promise<ApiProductDetails[]>;
  getScreenshotsForProduct(
    productId: string
  ): Promise<ApiProductDetails["screenshots"]>;
  getProductsByOrdering(
    ordering: string,
    quantity?: number
  ): Promise<ApiProductDetails[]>;
  getGenresForProducts(quantity: number): Promise<ApiProductDetails[]>;
  getPublishersForProducts(quantity: number): Promise<ApiProductDetails[]>;
  getPlatformsForProducts(quantity: number): Promise<ApiProductDetails[]>;
  getStoresForProducts(quantity: number): Promise<ApiProductDetails[]>;
  getProductsWithFilters(
    genresId: number[],
    page: number,
    platformsId?: number[],
    storesId?: number[],
    publishersId?: number[],
    ordering?: string
  ): Promise<ApiPagination>;
}
