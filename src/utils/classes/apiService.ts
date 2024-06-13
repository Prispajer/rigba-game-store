export class ApiService implements IApiService {
  private apiKey: string = "b3c85b14e19f4d618df8debc3d5b01b6";
  private baseUrl: string = "https://api.rawg.io/api";

  async getProduct(productId: string): Promise<ProductInformations> {
    const res = await fetch(
      `${this.baseUrl}/games/${productId}?key=b3c85b14e19f4d618df8debc3d5b01b6`
    );
    const data = await res.json();
    return data;
  }

  async getGameScreenshots(productId: string): Promise<string[]> {
    const res = await fetch(
      `${this.baseUrl}/games/${productId}/screenshots?key=b3c85b14e19f4d618df8debc3d5b01b6`
    );
    const data = await res.json();
    return data.results;
  }

  async getGameGenres(): Promise<string[]> {
    const res = await fetch(
      `${this.baseUrl}/genres?key=b3c85b14e19f4d618df8debc3d5b01b6`
    );
    const data = await res.json();
    return data.results;
  }

  async getGameTags(productId: string): Promise<string[]> {
    const res = await fetch(
      `${this.baseUrl}/tags/${productId}?key=b3c85b14e19f4d618df8debc3d5b01b6`
    );
    const data = await res.json();
    return data.results;
  }
}
