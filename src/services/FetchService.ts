import IFetchService from "../interfaces/IFetchService";
import { GameAPIPagination, GameAPIResponse } from "../utils/helpers/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export class FetchService implements IFetchService {
  public apiKey: string = process.env.NEXT_PUBLIC_RAWG_API_KEY || "";
  public baseUrl: string = process.env.NEXT_PUBLIC_RAWG_BASE_URL || "";

  async fetchData<T>(url: string): Promise<T> {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data: T = await res.json();
      return data;
    } catch (error) {
      console.error("An error occurred while fetching data from API!", error);
      throw error;
    }
  }

  async getProduct(productSlug: string): Promise<GameAPIResponse> {
    const url = `${this.baseUrl}/games/${productSlug}?key=${this.apiKey}`;
    return this.fetchData(url);
  }

  async getProducts(searchQuery?: string): Promise<GameAPIResponse[]> {
    const url = `${this.baseUrl}/games?key=${this.apiKey}${
      searchQuery ? `&search=${searchQuery}` : ""
    }&page_size=${10}`;
    const data = await this.fetchData<{ results: GameAPIResponse[] }>(url);
    return searchQuery && data.results ? data.results : [];
  }

  async getProductsByOrdering(
    ordering: string,
    quantity: number = 4
  ): Promise<GameAPIResponse[]> {
    const url = `${this.baseUrl}/games?key=${
      this.apiKey
    }&ordering=${ordering}&page_size=${5 * quantity}`;
    const data = await this.fetchData<{ results: GameAPIResponse[] }>(url);
    return data.results || [];
  }

  async getGenresForProducts(quantity: number = 1): Promise<GameAPIResponse[]> {
    const url = `${this.baseUrl}/genres?key=${this.apiKey}&page_size=${
      7 * quantity
    }`;
    const data = await this.fetchData<{ results: GameAPIResponse[] }>(url);
    return data.results || [];
  }

  async getPublishersForProducts(
    quantity: number = 1
  ): Promise<GameAPIResponse[]> {
    const url = `${this.baseUrl}/publishers?key=${this.apiKey}&page_size=${
      7 * quantity
    }`;
    const data = await this.fetchData<{ results: GameAPIResponse[] }>(url);
    return data.results || [];
  }

  async getPlatformsForProducts(
    quantity: number = 1
  ): Promise<GameAPIResponse[]> {
    const url = `${this.baseUrl}/platforms?key=${this.apiKey}&page_size=${
      7 * quantity
    }`;
    const data = await this.fetchData<{ results: GameAPIResponse[] }>(url);
    return data.results || [];
  }

  async getStoresForProducts(quantity: number = 1): Promise<GameAPIResponse[]> {
    const url = `${this.baseUrl}/stores?key=${this.apiKey}&page_size=${
      7 * quantity
    }`;
    const data = await this.fetchData<{ results: GameAPIResponse[] }>(url);
    return data.results || [];
  }

  async getProductsWithFilters(
    genresId: number[],
    page: number,
    platformsId?: number[],
    storesId?: number[],
    publishersId?: number[],
    ordering?: string
  ): Promise<GameAPIPagination> {
    const genresQuery = genresId.join(",");
    const platformsQuery = platformsId?.join(",");
    const storesQuery = storesId?.join(",");
    const publishersQuery = publishersId?.join(",");
    const url = `${this.baseUrl}/games?key=${this.apiKey}&${
      genresQuery ? `&genres=${genresQuery}` : ""
    }&page=${page}${platformsQuery ? `&platforms=${platformsQuery}` : ""}${
      storesQuery ? `&stores=${storesQuery}` : ""
    }${
      publishersQuery ? `&publishers=${publishersQuery}` : ""
    }&ordering=${ordering}`;
    const data = await this.fetchData<GameAPIPagination>(url);
    return data || {};
  }
}

const fetchService: IFetchService = new FetchService();
export default fetchService;
