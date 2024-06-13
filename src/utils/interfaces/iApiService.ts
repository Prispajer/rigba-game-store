export interface IApiService {
  getProduct(productId: string): Promise<ProductInformations>;
  getGameScreenshots(productId: string): Promise<string[]>;
  getGameGenres(): Promise<string[]>;
  getGameTags(productId: string): Promise<string[]>;
}
