import IFetchService from "../interfaces/IFetchService";
import ApiProductDetails from "@/features/products/types/api/apiProductDetails";
import ApiPagination from "@/features/products/types/api/apiPagination";

export class FetchService implements IFetchService {
  public apiKey: string = process.env.NEXT_PUBLIC_RAWG_API_KEY || "";
  public baseUrl: string = process.env.NEXT_PUBLIC_RAWG_BASE_URL || "";

  async fetchData<T>(url: string): Promise<T> {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
        return await res.json();
    } catch (error) {
      console.error("An error occurred while fetching data from API!", error);
      throw error;
    }
  }

  async getProduct(productSlug: string): Promise<ApiProductDetails> {
    const url = `${this.baseUrl}/games/${productSlug}?key=${this.apiKey}`;
    return this.fetchData(url);
  }

  async getProducts(searchQuery?: string): Promise<ApiProductDetails[]> {
    const url = `${this.baseUrl}/games?key=${this.apiKey}${
      searchQuery ? `&search=${searchQuery}` : ""
    }&page_size=${10}`;
    const data = await this.fetchData<{ results: ApiProductDetails[] }>(url);
    return searchQuery && data.results ? data.results : [];
  }

  async getScreenshotsForProduct(
    productId: string
  ): Promise<ApiProductDetails["screenshots"]> {
    const url = `${this.baseUrl}/games/${productId}/screenshots?key=${this.apiKey}`;
    const data = await this.fetchData<{
      results: ApiProductDetails["screenshots"];
    }>(url);
    return data.results || [];
  }

  async getProductsByOrdering(
    ordering: string,
    quantity: number = 4
  ): Promise<ApiProductDetails[]> {
    const url = `${this.baseUrl}/games?key=${
      this.apiKey
    }&ordering=${ordering}&page_size=${5 * quantity}`;
    const data = await this.fetchData<{ results: ApiProductDetails[] }>(url);
    return data.results || [];
  }

  async getGenresForProducts(quantity: number = 1): Promise<ApiProductDetails[]> {
    const url = `${this.baseUrl}/genres?key=${this.apiKey}&page_size=${
      7 * quantity
    }`;
    const data = await this.fetchData<{ results: ApiProductDetails[] }>(url);
    return data.results || [];
  }

  async getPublishersForProducts(
    quantity: number = 1
  ): Promise<ApiProductDetails[]> {
    const url = `${this.baseUrl}/publishers?key=${this.apiKey}&page_size=${
      7 * quantity
    }`;
    const data = await this.fetchData<{ results: ApiProductDetails[] }>(url);
    return data.results || [];
  }

  async getPlatformsForProducts(
    quantity: number = 1
  ): Promise<ApiProductDetails[]> {
    const url = `${this.baseUrl}/platforms?key=${this.apiKey}&page_size=${
      7 * quantity
    }`;
    const data = await this.fetchData<{ results: ApiProductDetails[] }>(url);
    return data.results || [];
  }

  async getStoresForProducts(quantity: number = 1): Promise<ApiProductDetails[]> {
    const url = `${this.baseUrl}/stores?key=${this.apiKey}&page_size=${
      7 * quantity
    }`;
    const data = await this.fetchData<{ results: ApiProductDetails[] }>(url);
    return data.results || [];
  }

  async getProductsWithFilters(
    genresId: number[],
    page: number,
    platformsId?: number[],
    storesId?: number[],
    publishersId?: number[],
    ordering?: string
  ): Promise<ApiPagination> {
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
    const data = await this.fetchData<ApiPagination>(url);
    return data || {};
  }
}

const fetchService: IFetchService = new FetchService();
export default fetchService;
