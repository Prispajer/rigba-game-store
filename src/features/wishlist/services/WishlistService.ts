import { injectable, inject } from "inversify";
import { postgres } from "@/lib/db";
import type IWishlistService from "@/features/wishlist/interfaces/IWishlistService";
import type ICheckerService from "@/interfaces/ICheckerService";
import type IWishlistRepository from "@/features/wishlist/interfaces/IWishlistRepository";
import type IProductRepository from "@/features/products/interfaces/IProductRepository";
import { User, Wishlist, Product } from "@prisma/client";
import RequestResponse from "@/shared/types/requestResponse";
import CLASSTYPES from "@/shared/constants/classTypes";
import {
  GetUserWishlistDTO,
  AddProductToWishlistDTO,
  DeleteProductFromWishlistDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class WishlistService implements IWishlistService {
  private readonly _checkerService: ICheckerService;
  private readonly _wishListRepository: IWishlistRepository;
  private readonly _productRepository: IProductRepository;

  constructor(
    @inject(CLASSTYPES.ICheckerService) checkerService: ICheckerService,
    @inject(CLASSTYPES.IWishlistRepository)
    wishListRepository: IWishlistRepository,
    @inject(CLASSTYPES.IProductRepository)
    productRepository: IProductRepository
  ) {
    this._checkerService = checkerService;
    this._wishListRepository = wishListRepository;
    this._productRepository = productRepository;
  }

  async getUserWishlist(
    getUserWishlistDTO: GetUserWishlistDTO
  ): Promise<RequestResponse<Wishlist | null>> {
    return await this._checkerService.getUserEntity(
      getUserWishlistDTO,
      this._checkerService.checkDataExistsAndReturnUserWishlist.bind(
        this._checkerService
      ),
      this._wishListRepository.createUserWishlist.bind(
        this._wishListRepository
      ),
      "Wishlist"
    );
  }

  async addProductToWishlist(
    addProductToWishlistDTO: AddProductToWishlistDTO
  ): Promise<RequestResponse<User | Wishlist | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          addProductToWishlistDTO
        );

      if (
        (getUserByEmailResponse && !getUserByEmailResponse.success) ||
        !getUserByEmailResponse.data
      ) {
        return getUserByEmailResponse;
      }

      const getUserWishlistResponse =
        await this._checkerService.checkDataExistsAndReturnUserWishlist(
          getUserByEmailResponse.data
        );

      if (
        (getUserWishlistResponse && !getUserWishlistResponse.success) ||
        !getUserWishlistResponse.data
      ) {
        return getUserWishlistResponse;
      }

      const getUserProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId: addProductToWishlistDTO.externalProductId,
          userId: getUserByEmailResponse.data.id,
        });

      if (getUserProductResponse && getUserProductResponse.success) {
        if (
          getUserProductResponse.data &&
          getUserProductResponse.data.wishlistId === null
        ) {
          await postgres.product.update({
            where: { id: getUserProductResponse.data.id },
            data: { wishlistId: getUserWishlistResponse.data.id },
          });
        }
        return this._checkerService.handleError(
          "User wishlist product already exists!"
        );
      } else {
        await this._wishListRepository.createUserProductWishlist({
          ...addProductToWishlistDTO,
          wishlistId: getUserWishlistResponse.data.id,
          userId: getUserByEmailResponse.data.id,
        });
      }

      return this._checkerService.handleSuccess(
        "Product added to wishlist successfully!",
        getUserWishlistResponse.data || null
      );
    } catch (error) {
      console.error("Error while adding product to the wishlist:", error);
      return this._checkerService.handleError(
        "Error while adding product to the wishlist!"
      );
    }
  }

  async deleteProductFromWishlist(
    deleteProductFromWishlistDTO: DeleteProductFromWishlistDTO
  ): Promise<RequestResponse<User | Product | Wishlist | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          deleteProductFromWishlistDTO
        );

      if (
        (getUserByEmailResponse && !getUserByEmailResponse.success) ||
        !getUserByEmailResponse.data
      )
        return getUserByEmailResponse;

      const getUserWishlistResponse =
        await this._checkerService.checkDataExistsAndReturnUserWishlist(
          getUserByEmailResponse.data
        );

      if (
        (getUserWishlistResponse && !getUserWishlistResponse.success) ||
        !getUserWishlistResponse.data
      )
        return getUserWishlistResponse;

      const getUserProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId: deleteProductFromWishlistDTO.externalProductId,
          userId: getUserByEmailResponse.data.id,
        });

      if (
        (getUserProductResponse && !getUserProductResponse.success) ||
        !getUserProductResponse.data
      ) {
        return getUserProductResponse;
      } else if (
        !getUserProductResponse.data.cartId &&
        !getUserProductResponse.data.wishlistId
      ) {
        await this._productRepository.deleteUserProduct(
          getUserProductResponse.data
        );
      } else {
        await this._wishListRepository.deleteUserProductFromWishlist(
          getUserProductResponse.data
        );
      }

      return this._checkerService.handleSuccess(
        "Product deleted from wishlist successfully!",
        getUserWishlistResponse.data
      );
    } catch (error) {
      return this._checkerService.handleError(
        "Error while removing product from wishlist!"
      );
    }
  }
}
