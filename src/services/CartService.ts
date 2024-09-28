import { BaseService } from "./CheckerService";
import { ProductConstructor } from "../utils/helpers/types";

class CartService<D, R> {
  private baseService: BaseService<D, R>;

  constructor(data: D, status: R) {
    this.baseService = new BaseService(data, status);
  }
}
