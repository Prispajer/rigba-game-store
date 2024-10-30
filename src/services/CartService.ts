import { injectable, inject } from "inversify";
import type ICartService from "@/interfaces/ICartService";
import type ICheckerService from "@/interfaces/ICheckerService";
import type ICartRepository from "@/interfaces/ICartRepository";
import type IProductRepository from "@/interfaces/IProductRepository";
import { User, Cart, Product } from "@prisma/client";
import { RequestResponse, CLASSTYPES } from "@/utils/helpers/types";
import {
  GetUserCartDTO,
  AddProductToCartDTO,
  DeleteProductFromCartDTO,
  IncreaseProductQuantityDTO,
  DecreaseProductQuantityDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class CartService implements ICartService {
  private readonly _checkerService: ICheckerService;
  private readonly _cartRepository: ICartRepository;
  private readonly _productRepository: IProductRepository;

  constructor(
    @inject(CLASSTYPES.ICheckerService) checkerService: ICheckerService,
    @inject(CLASSTYPES.ICartRepository)
    cartRepository: ICartRepository,
    @inject(CLASSTYPES.IProductRepository)
    productRepository: IProductRepository
  ) {
    this._checkerService = checkerService;
    this._cartRepository = cartRepository;
    this._productRepository = productRepository;
  }

  async getUserCart(
    getUserCartDTO: GetUserCartDTO
  ): Promise<RequestResponse<Cart | null>> {
    return await this._checkerService.getUserEntity(
      getUserCartDTO,
      this._checkerService.checkDataExistsAndReturnUserCart.bind(
        this._checkerService
      ),
      this._cartRepository.createUserCart.bind(this._cartRepository),
      "Cart"
    );
  }

  async addProductToCart(
    addProductToCartDTO: AddProductToCartDTO
  ): Promise<RequestResponse<User | Cart | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          addProductToCartDTO
        );

      if (
        (getUserByEmailResponse && !getUserByEmailResponse.success) ||
        !getUserByEmailResponse.data
      ) {
        return getUserByEmailResponse;
      }

      const getUserCartResponse =
        await this._checkerService.checkDataExistsAndReturnUserCart(
          getUserByEmailResponse.data
        );

      if (
        (getUserCartResponse && !getUserCartResponse.success) ||
        !getUserCartResponse.data
      )
        return getUserCartResponse;

      const getUserProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId: addProductToCartDTO.externalProductId,
          userId: getUserByEmailResponse.data.id,
        });

      if (getUserProductResponse && getUserProductResponse.success) {
        if (
          getUserProductResponse.data &&
          getUserProductResponse.data.cartId === null
        ) {
          await prisma?.product.update({
            where: {
              id: getUserProductResponse.data.id,
            },
            data: {
              cartId: getUserCartResponse.data.id,
            },
          });
        }
        getUserProductResponse.data &&
          (await this._cartRepository.increaseUserProductQuantity({
            id: getUserProductResponse.data.id,
            userId: getUserByEmailResponse.data.id,
            quantity: getUserProductResponse.data.quantity,
          }));
      } else {
        await this._cartRepository.createUserCartProduct({
          ...addProductToCartDTO,
          cartId: getUserCartResponse.data.id,
          userId: getUserByEmailResponse.data.id,
        });
      }

      return this._checkerService.handleSuccess(
        "Product added to cart successfully!",
        getUserCartResponse.data || null
      );
    } catch (error) {
      return this._checkerService.handleError(
        "Error while adding product to the cart!"
      );
    }
  }

  async deleteProductFromCart(
    deleteProductFromCartDTO: DeleteProductFromCartDTO
  ): Promise<RequestResponse<User | Product | Cart | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          deleteProductFromCartDTO
        );

      if (
        (getUserByEmailResponse && !getUserByEmailResponse.success) ||
        !getUserByEmailResponse.data
      )
        return getUserByEmailResponse;

      const getUserCartResponse =
        await this._checkerService.checkDataExistsAndReturnUserCart(
          getUserByEmailResponse.data
        );

      if (
        (getUserCartResponse && !getUserCartResponse.success) ||
        !getUserCartResponse.data
      )
        return getUserCartResponse;

      const getUserProductResponse =
        await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId: deleteProductFromCartDTO.externalProductId,
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
        await this._cartRepository.deleteUserProductFromCart(
          getUserProductResponse.data
        );
      }

      return this._checkerService.handleSuccess(
        "Product added to cart successfully!",
        getUserCartResponse.data
      );
    } catch (error) {
      return this._checkerService.handleError(
        "Error while removing product from cart!"
      );
    }
  }

  async increaseProductQuantity(
    increaseProductQuantityDTO: IncreaseProductQuantityDTO
  ): Promise<RequestResponse<User | Product | Cart | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          increaseProductQuantityDTO
        );

      if (
        (getUserByEmailResponse && !getUserByEmailResponse.success) ||
        !getUserByEmailResponse.data
      )
        return getUserByEmailResponse;

      const getUserCartResponse =
        getUserByEmailResponse.data &&
        (await this._checkerService.checkDataExistsAndReturnUserCart(
          getUserByEmailResponse.data
        ));

      if (
        (getUserCartResponse && !getUserCartResponse.success) ||
        !getUserCartResponse.data
      )
        return getUserCartResponse;

      const getUserProductResponse =
        getUserByEmailResponse.data &&
        (await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId: increaseProductQuantityDTO.externalProductId,
          userId: getUserByEmailResponse.data.id,
        }));

      if (getUserProductResponse && !getUserProductResponse.success) {
        return getUserProductResponse;
      }

      getUserByEmailResponse.data &&
        getUserProductResponse.data &&
        (await this._cartRepository.increaseUserProductQuantity({
          id: getUserProductResponse.data.id,
          userId: getUserByEmailResponse.data.id,
          quantity: getUserProductResponse.data.quantity,
        }));

      return this._checkerService.handleSuccess(
        "Product quantity increased successfully!",
        getUserCartResponse.data
      );
    } catch (error) {
      return this._checkerService.handleError(
        "There was problem in increasing product quantity!"
      );
    }
  }

  async decreaseProductQuantity(
    decreaseProductQuantityDTO: DecreaseProductQuantityDTO
  ): Promise<RequestResponse<User | Product | Cart | null>> {
    try {
      const getUserByEmailResponse =
        await this._checkerService.checkDataExistsAndReturnUser(
          decreaseProductQuantityDTO
        );

      if (
        (getUserByEmailResponse && !getUserByEmailResponse.success) ||
        !getUserByEmailResponse.data
      )
        return getUserByEmailResponse;

      const getUserCartResponse =
        await this._checkerService.checkDataExistsAndReturnUserCart(
          getUserByEmailResponse.data
        );

      if (
        (getUserCartResponse && !getUserCartResponse.success) ||
        !getUserCartResponse.data
      )
        return getUserCartResponse;

      const getUserProductResponse =
        getUserByEmailResponse.data &&
        (await this._checkerService.checkDataExistsAndReturnProduct({
          externalProductId: decreaseProductQuantityDTO.externalProductId,
          userId: getUserByEmailResponse.data.id,
        }));

      if (
        (getUserProductResponse && !getUserProductResponse.success) ||
        !getUserProductResponse.data
      ) {
        return getUserProductResponse;
      } else if (
        getUserProductResponse &&
        getUserProductResponse.data.quantity! > 1
      ) {
        await this._cartRepository.decreaseUserProductQuantity({
          id: getUserProductResponse.data.id,
          userId: getUserByEmailResponse.data.id,
          quantity: getUserProductResponse.data.quantity,
        });
      } else {
        await this._cartRepository.deleteUserProductFromCart(
          getUserProductResponse.data
        );
      }

      return this._checkerService.handleSuccess(
        "Product quantity decreased successfully!",
        getUserCartResponse.data
      );
    } catch (error) {
      return this._checkerService.handleError(
        "There was problem in decreasing product quantity!"
      );
    }
  }
}
