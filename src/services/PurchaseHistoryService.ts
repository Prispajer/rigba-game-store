import { injectable, inject } from "inversify";
import type ICheckerService from "@/interfaces/ICheckerService";
import type IPurchaseHistoryService from "@/interfaces/IPurchaseHistoryService";
import { User, ProductHistory, OrderHistory } from "@prisma/client";
import { RequestResponse, CLASSTYPES } from "@/types/types";
import {
  GetUserProductHistoryDTO,
  GetUserOrderHistoryDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class PurchaseHistoryService implements IPurchaseHistoryService {
  private readonly _checkerService: ICheckerService;

  constructor(
    @inject(CLASSTYPES.ICheckerService) checkerService: ICheckerService
  ) {
    this._checkerService = checkerService;
  }

  async getUserProductHistory(
    getUserProductHistoryDTO: GetUserProductHistoryDTO
  ): Promise<RequestResponse<User | ProductHistory[] | null>> {
    const getUserByEmailResponse =
      await this._checkerService.checkDataExistsAndReturnUser(
        getUserProductHistoryDTO
      );

    if (
      (getUserByEmailResponse && !getUserByEmailResponse.success) ||
      !getUserByEmailResponse.data
    )
      return getUserByEmailResponse;

    const getUserProductHistoryResponse =
      await this._checkerService.checkDataExistsAndReturnUserProductHistory({
        email: getUserProductHistoryDTO.email,
        userId: getUserByEmailResponse.data.id,
      });

    if (
      (getUserProductHistoryResponse &&
        !getUserProductHistoryResponse.success) ||
      !getUserProductHistoryResponse.data
    )
      return getUserProductHistoryResponse;

    return this._checkerService.handleSuccess(
      "User product history found!",
      getUserProductHistoryResponse.data || null
    );
  }

  async getUserOrderHistory(
    getUserOrderHistoryDTO: GetUserOrderHistoryDTO
  ): Promise<RequestResponse<User | OrderHistory[] | null>> {
    const getUserByEmailResponse =
      await this._checkerService.checkDataExistsAndReturnUser(
        getUserOrderHistoryDTO
      );

    if (
      (getUserByEmailResponse && !getUserByEmailResponse.success) ||
      !getUserByEmailResponse.data
    ) {
      return getUserByEmailResponse;
    }

    const getUserOrderHistoryResponse =
      await this._checkerService.checkDataExistsAndReturnUserOrderHistory({
        email: getUserOrderHistoryDTO.email,
        userId: getUserByEmailResponse.data.id,
      });

    if (
      (getUserOrderHistoryResponse && !getUserOrderHistoryResponse.success) ||
      !getUserOrderHistoryResponse.data
    ) {
      return getUserOrderHistoryResponse;
    }

    return this._checkerService.handleSuccess(
      "User order history found!",
      getUserOrderHistoryResponse.data || null
    );
  }
}
