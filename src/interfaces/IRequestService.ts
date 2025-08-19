import { RequestResponse } from "@/types/types";

export default interface IRequestService {
  getMethod<T>(endpoint: string): Promise<RequestResponse<T>>;
  postMethod<T>(endpoint: string, body: unknown): Promise<RequestResponse<T>>;
  deleteMethod<T>(endpoint: string, body: unknown): Promise<RequestResponse<T>>;
  patchMethod<T>(endpoint: string, body: unknown): Promise<RequestResponse<T>>;
}
