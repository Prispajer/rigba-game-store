import { injectable, inject } from "inversify";
import { postgres } from "@/data/database/publicSQL/postgres";
import type ICartRepository from "@/interfaces/ICartRepository";
import type IProductUtils from "@/interfaces/IProductUtils";
import { User, Cart, Product } from "@prisma/client";
import { CLASSTYPES } from "@/utils/helpers/types";
import {
  GetUserCartDTO,
  CreateUserCartProductDTO,
  DeleteUserProductFromCartDTO,
  UserProductQuantityDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class CartRepository implements ICartRepository {
  private readonly _productUtils: IProductUtils;

  constructor(@inject(CLASSTYPES.IProductUtils) productUtils: IProductUtils) {
    this._productUtils = productUtils;
  }

  async getUserCart(getUserCartDTO: GetUserCartDTO): Promise<Cart | null> {
    try {
      return await this._productUtils.executeOperation(
        (getUserCartDTO) =>
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
        getUserCartDTO
      );
    } catch {
      return null;
    }
  }

  async createUserCart(user: User): Promise<Cart | null> {
    return await this._productUtils.executeOperation(() =>
      postgres.cart.create({
        data: { userId: user.id, products: {} },
        include: { products: true },
      })
    );
  }

  async createUserCartProduct(
    createUserCartProductDTO: CreateUserCartProductDTO
  ): Promise<Product | null> {
    return await this._productUtils.executeOperation(() =>
      postgres.product.create({
        data: {
          cartId: createUserCartProductDTO.cartId,
          userId: createUserCartProductDTO.userId,
          externalProductId: createUserCartProductDTO.externalProductId,
          quantity: 1,
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
    return await this._productUtils.executeOperation(
      (userProductQuantityDTO) =>
        postgres.product.update({
          where: {
            id: userProductQuantityDTO?.id,
            userId: userProductQuantityDTO?.userId,
          },
          data: { quantity: (userProductQuantityDTO?.quantity ?? 0) + 1 },
        }),
      userProductQuantityDTO
    );
  }

  async decreaseUserProductQuantity(
    userProductQuantityDTO: UserProductQuantityDTO
  ): Promise<Product | null> {
    return await this._productUtils.executeOperation(
      (userProductQuantityDTO) =>
        postgres.product.update({
          where: {
            id: userProductQuantityDTO?.id,
            userId: userProductQuantityDTO?.userId,
          },
          data: { quantity: (userProductQuantityDTO?.quantity ?? 0) - 1 },
        }),
      userProductQuantityDTO
    );
  }
}
