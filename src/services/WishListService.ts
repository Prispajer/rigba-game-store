import { injectable, inject } from "inversify";
import { postgres } from "@/lib/db";
import type IWishListService from "@/interfaces/IWishListService";
import type ICheckerService from "@/interfaces/ICheckerService";
import type IWishListRepository from "@/interfaces/IWishListRepository";
import type IProductRepository from "@/interfaces/IProductRepository";
import { User, WishList, Product } from "@prisma/client";
import { RequestResponse, CLASSTYPES } from "@/types/types";
import {
  GetUserWishListDTO,
  AddProductToWishListDTO,
  DeleteProductFromWishListDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class WishListService implements IWishListService {
  private readonly _checkerService: ICheckerService;
  private readonly _wishListRepository: IWishListRepository;
  private readonly _productRepository: IProductRepository;

  constructor(
    @inject(CLASSTYPES.ICheckerService) checkerService: ICheckerService,
    @inject(CLASSTYPES.IWishListRepository)
    wishListRepository: IWishListRepository,
    @inject(CLASSTYPES.IProductRepository)
    productRepository: IProductRepository
  ) {
    this._checkerService = checkerService;
    this._wishListRepository = wishListRepository;
    this._productRepository = productRepository;
  }

  async getUserWishList(
    getUserWishListDTO: GetUserWishListDTO
  ): Promise<RequestResponse<WishList | null>> {
    return await this._checkerService.getUserEntity(
      getUserWishListDTO,
      this._checkerService.checkDataExistsAndReturnUserWishList.bind(
        this._checkerService
      ),
      this._wishListRepository.createUserWishList.bind(
        this._wishListRepository
      ),
      "WishList"
    );
  }

  async addProductToWishList(
    addProductToWishListDTO: AddProductToWishListDTO
  ): Promise<RequestResponse<User | WishList | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          addProductToWishListDTO
        );

      if (
        (getUserByEmailResponse && !getUserByEmailResponse.success) ||
        !getUserByEmailResponse.data
      ) {
        return getUserByEmailResponse;
      }

      const getUserWishListResponse =
        await this._checkerService.checkDataExistsAndReturnUserWishList(
          getUserByEmailResponse.data
        );

      if (
        (getUserWishListResponse && !getUserWishListResponse.success) ||
        !getUserWishListResponse.data
      ) {
        return getUserWishListResponse;
      }

      const getUserProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId: addProductToWishListDTO.externalProductId,
          userId: getUserByEmailResponse.data.id,
        });

      if (getUserProductResponse && getUserProductResponse.success) {
        if (
          getUserProductResponse.data &&
          getUserProductResponse.data.wishListId === null
        ) {
          await postgres.product.update({
            where: { id: getUserProductResponse.data.id },
            data: { wishListId: getUserWishListResponse.data.id },
          });
        }
        return this._checkerService.handleError(
          "User wishlist product already exists!"
        );
      } else {
        await this._wishListRepository.createUserProductWishList({
          ...addProductToWishListDTO,
          wishListId: getUserWishListResponse.data.id,
          userId: getUserByEmailResponse.data.id,
        });
      }

      return this._checkerService.handleSuccess(
        "Product added to wishlist successfully!",
        getUserWishListResponse.data || null
      );
    } catch (error) {
      console.error("Error while adding product to the wishlist:", error);
      return this._checkerService.handleError(
        "Error while adding product to the wishlist!"
      );
    }
  }

  async deleteProductFromWishList(
    deleteProductFromWishListDTO: DeleteProductFromWishListDTO
  ): Promise<RequestResponse<User | Product | WishList | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          deleteProductFromWishListDTO
        );

      if (
        (getUserByEmailResponse && !getUserByEmailResponse.success) ||
        !getUserByEmailResponse.data
      )
        return getUserByEmailResponse;

      const getUserWishListResponse =
        await this._checkerService.checkDataExistsAndReturnUserWishList(
          getUserByEmailResponse.data
        );

      if (
        (getUserWishListResponse && !getUserWishListResponse.success) ||
        !getUserWishListResponse.data
      )
        return getUserWishListResponse;

      const getUserProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId: deleteProductFromWishListDTO.externalProductId,
          userId: getUserByEmailResponse.data.id,
        });

      if (
        (getUserProductResponse && !getUserProductResponse.success) ||
        !getUserProductResponse.data
      ) {
        return getUserProductResponse;
      } else if (
        !getUserProductResponse.data.cartId &&
        !getUserProductResponse.data.wishListId
      ) {
        await this._productRepository.deleteUserProduct(
          getUserProductResponse.data
        );
      } else {
        await this._wishListRepository.deleteUserProductFromWishList(
          getUserProductResponse.data
        );
      }

      return this._checkerService.handleSuccess(
        "Product deleted from wishlist successfully!",
        getUserWishListResponse.data
      );
    } catch (error) {
      return this._checkerService.handleError(
        "Error while removing product from wishlist!"
      );
    }
  }
}
