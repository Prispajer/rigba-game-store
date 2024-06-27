import { IFetchService } from "../interfaces/iFetchService";

export class FetchService implements IFetchService {
  private apiKey: string = "b3c85b14e19f4d618df8debc3d5b01b6";
  private baseUrl: string = "https://api.rawg.io/api";

  async getProduct(productId: string): Promise<ProductInformations> {
    const res = await fetch(
      `${this.baseUrl}/games/${productId}?key=${this.apiKey}`
    );
    const data = await res.json();
    return data;
  }

  async getProductByOrdering(ordering: string): Promise<string[]> {
    const res = await fetch(
      `${this.baseUrl}/games?ordering=${ordering}&key=${this.apiKey}`
    );
    const data = await res.json();
    return data.results;
  }

  async getGameScreenshots(productId: string): Promise<string[]> {
    const res = await fetch(
      `${this.baseUrl}/games/${productId}/screenshots?key=${this.apiKey}`
    );
    const data = await res.json();
    return data.results;
  }

  async getGameGenres(): Promise<string[]> {
    const res = await fetch(`${this.baseUrl}/genres?key=${this.apiKey}`);
    const data = await res.json();
    return data.results;
  }

  async getGameTags(productId: string): Promise<string[]> {
    const res = await fetch(
      `${this.baseUrl}/tags/${productId}?key=${this.apiKey}`
    );
    const data = await res.json();
    return data.results;
  }
}
