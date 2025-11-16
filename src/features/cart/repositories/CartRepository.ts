import { injectable, inject } from "inversify";
import { postgres } from "@/lib/db";
import type ICartRepository from "@/features/cart/interfaces/ICartRepository";
import type IProductService from "@/features/products/interfaces/IProductService";
import { User, Cart, Product } from "@prisma/client";
import CLASSTYPES from "@/shared/constants/classTypes";
import {
  GetUserCartDTO,
  CreateUserCartProductDTO,
  DeleteUserProductFromCartDTO,
  UserProductQuantityDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class CartRepository implements ICartRepository {
  private readonly _productService: IProductService;

  constructor(@inject(CLASSTYPES.IProductService) productService: IProductService) {
    this._productService = productService;
  }

  async getUserCart(getUserCartDTO: GetUserCartDTO): Promise<Cart | null> {
    try {
      return await this._productService.findByProperty(
        () =>
          postgres.cart.findUnique({
            where: { userId: getUserCartDTO?.id },
            include: {
              products: {
                include: {
                  productsInformations: true,
                },
              },
            },
          }),
      );
    } catch {
      return null;
    }
  }

  async createUserCart(user: User): Promise<Cart | null> {
    return await this._productService.findByProperty(() =>
      postgres.cart.create({
        data: { userId: user.id, products: {} },
        include: { products: true },
      })
    );
  }

  async createUserCartProduct(
    createUserCartProductDTO: CreateUserCartProductDTO
  ): Promise<Product | null> {
    return await this._productService.findByProperty(() =>
      postgres.product.create({
        data: {
          cartId: createUserCartProductDTO.cartId,
          userId: createUserCartProductDTO.userId,
          externalProductId: createUserCartProductDTO.externalProductId,
          quantity: createUserCartProductDTO.quantity ?? 1,
          productsInformations: {
            create: {
              name: createUserCartProductDTO.name,
              description: createUserCartProductDTO.description,
              price: createUserCartProductDTO.price,
              background_image: createUserCartProductDTO.background_image,
              rating: createUserCartProductDTO.rating,
              slug: createUserCartProductDTO.slug,
              released: createUserCartProductDTO.released,
              added: createUserCartProductDTO.added,
            },
          },
        },
      })
    );
  }

  async deleteUserProductFromCart(
    deleteUserProductFromCartDTO: DeleteUserProductFromCartDTO
  ): Promise<Product | null> {
    return await postgres.product.update({
      where: { id: deleteUserProductFromCartDTO.id },
      data: {
        cartId: null,
        quantity: null,
      },
    });
  }

  async increaseUserProductQuantity(
    userProductQuantityDTO: UserProductQuantityDTO
  ): Promise<Product | null> {
    return await this._productService.findByProperty(
      () =>
        postgres.product.update({
          where: {
            id: userProductQuantityDTO?.id,
            userId: userProductQuantityDTO?.userId,
          },
          data: { quantity: (userProductQuantityDTO?.quantity ?? 0) + 1 },
        }),
    );
  }

  async decreaseUserProductQuantity(
    userProductQuantityDTO: UserProductQuantityDTO
  ): Promise<Product | null> {
    return await this._productService.findByProperty(
      () =>
        postgres.product.update({
          where: {
            id: userProductQuantityDTO?.id,
            userId: userProductQuantityDTO?.userId,
          },
          data: { quantity: (userProductQuantityDTO?.quantity ?? 0) - 1 },
        }),
    );
  }
}
