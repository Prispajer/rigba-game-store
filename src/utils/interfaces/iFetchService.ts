import { ProductDetails } from "../helpers/types";
export interface IFetchService {
  getProduct(productId: string): Promise<ProductDetails>;
  getGameScreenshots(productId: string): Promise<string[]>;
  getGameGenres(): Promise<string[]>;
  getGameTags(productId: string): Promise<string[]>;
}
