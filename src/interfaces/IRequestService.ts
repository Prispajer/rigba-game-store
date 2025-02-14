import { RequestResponse } from "@/utils/helpers/types";

export default interface IRequestService {
  request<T>(
    endpoint: string,
    method: string,
    body?: unknown
  ): Promise<RequestResponse<T>>;
  getMethod<T>(endpoint: string): Promise<RequestResponse<T>>;
  postMethod<T>(endpoint: string, body: unknown): Promise<RequestResponse<T>>;
  deleteMethod<T>(endpoint: string, body: unknown): Promise<RequestResponse<T>>;
  patchMethod<T>(endpoint: string, body: unknown): Promise<RequestResponse<T>>;
}
