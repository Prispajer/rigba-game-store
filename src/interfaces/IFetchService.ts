import { GameAPIPagination, GameAPIResponse } from "@/utils/helpers/types";

export default interface IFetchService {
  fetchData(url: string): Promise<any>;
  getProduct(productSlug: string): Promise<GameAPIResponse>;
  getScreenshotsForProduct(productId: string): Promise<GameAPIResponse[]>;
  getProducts(searchQuery?: string): Promise<GameAPIResponse[]>;
  getProductsByOrdering(
    ordering: string,
    quantity?: number
  ): Promise<GameAPIResponse[]>;
  getGenresForProducts(quantity: number): Promise<GameAPIResponse[]>;
  getPublishersForProducts(quantity: number): Promise<GameAPIResponse[]>;
  getPlatformsForProducts(quantity: number): Promise<GameAPIResponse[]>;
  getStoresForProducts(quantity: number): Promise<GameAPIResponse[]>;
  getProductsWithFilters(
    genresId: number[],
    page: number,
    platformsId?: number[],
    storesId?: number[],
    publishersId?: number[],
    ordering?: string
  ): Promise<GameAPIPagination>;
}
