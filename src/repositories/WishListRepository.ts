import { injectable, inject } from "inversify";
import { postgres } from "@/lib/db";
import type IProductUtils from "@/interfaces/IProductUtils";
import type IWishListRepository from "@/interfaces/IWishListRepository";
import { User, WishList, Product } from "@prisma/client";
import { CLASSTYPES } from "@/utils/helpers/types";
import {
  GetUserWishListDTO,
  CreateUserProductWishListDTO,
  DeleteUserProductFromWishListDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class WishListRepository implements IWishListRepository {
  private readonly _productUtils: IProductUtils;

  constructor(@inject(CLASSTYPES.IProductUtils) productUtils: IProductUtils) {
    this._productUtils = productUtils;
  }

  async getUserWishList(
    getUserWishListDTO: GetUserWishListDTO
  ): Promise<WishList | null> {
    try {
      return await this._productUtils.executeOperation(
        (getUserWishListDTO) =>
          postgres.wishList.findUnique({
            where: { userId: getUserWishListDTO?.id },
            include: {
              products: {
                include: {
                  productsInformations: true,
                },
              },
            },
          }),
        getUserWishListDTO
      );
    } catch {
      return null;
    }
  }

  async createUserWishList(user: User): Promise<WishList | null> {
    return await this._productUtils.executeOperation(() =>
      postgres.wishList.create({
        data: { userId: user.id, products: {} },
        include: { products: true },
      })
    );
  }

  async createUserProductWishList(
    createUserProductWishListDTO: CreateUserProductWishListDTO
  ): Promise<Product | null> {
    return await this._productUtils.executeOperation(() =>
      postgres.product.create({
        data: {
          wishListId: createUserProductWishListDTO.wishListId,
          userId: createUserProductWishListDTO.userId,
          externalProductId: createUserProductWishListDTO.externalProductId,
          productsInformations: {
            create: {
              name: createUserProductWishListDTO.name,
              description: createUserProductWishListDTO.description,
              price: createUserProductWishListDTO.price,
              background_image: createUserProductWishListDTO.background_image,
              rating: createUserProductWishListDTO.rating,
              slug: createUserProductWishListDTO.slug,
              released: createUserProductWishListDTO.released,
              added: createUserProductWishListDTO.added,
            },
          },
        },
      })
    );
  }

  async deleteUserProductFromWishList(
    deleteUserProductFromWishListDTO: DeleteUserProductFromWishListDTO
  ): Promise<Product | null> {
    return await postgres.product.update({
      where: { id: deleteUserProductFromWishListDTO.id },
      data: {
        wishListId: null,
      },
    });
  }
}
