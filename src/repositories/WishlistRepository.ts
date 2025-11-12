import { injectable, inject } from "inversify";
import { postgres } from "@/lib/db";
import type IProductUtils from "@/interfaces/IProductUtils";
import type IWishlistRepository from "@/interfaces/IWishlistRepository";
import { User, Wishlist, Product } from "@prisma/client";
import { CLASSTYPES } from "@/types/types";
import {
  GetUserWishlistDTO,
  CreateUserProductWishlistDTO,
  DeleteUserProductFromWishlistDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class WishlistRepository implements IWishlistRepository {
  private readonly _productUtils: IProductUtils;

  constructor(@inject(CLASSTYPES.IProductUtils) productUtils: IProductUtils) {
    this._productUtils = productUtils;
  }

  async getUserWishlist(
    getUserWishlistDTO: GetUserWishlistDTO
  ): Promise<Wishlist | null> {
    try {
      return await this._productUtils.executeOperation(
        (getUserWishlistDTO) =>
          postgres.wishlist.findUnique({
            where: { userId: getUserWishlistDTO?.id },
            include: {
              products: {
                include: {
                  productsInformations: true,
                },
              },
            },
          }),
        getUserWishlistDTO
      );
    } catch {
      return null;
    }
  }

  async createUserWishlist(user: User): Promise<Wishlist | null> {
    return await this._productUtils.executeOperation(() =>
      postgres.wishlist.create({
        data: { userId: user.id, products: {} },
        include: { products: true },
      })
    );
  }

  async createUserProductWishlist(
    createUserProductWishlistDTO: CreateUserProductWishlistDTO
  ): Promise<Product | null> {
    return await this._productUtils.executeOperation(() =>
      postgres.product.create({
        data: {
          wishListId: createUserProductWishlistDTO.wishListId,
          userId: createUserProductWishlistDTO.userId,
          externalProductId: createUserProductWishlistDTO.externalProductId,
          productsInformations: {
            create: {
              name: createUserProductWishlistDTO.name,
              description: createUserProductWishlistDTO.description,
              price: createUserProductWishlistDTO.price,
              background_image: createUserProductWishlistDTO.background_image,
              rating: createUserProductWishlistDTO.rating,
              slug: createUserProductWishlistDTO.slug,
              released: createUserProductWishlistDTO.released,
              added: createUserProductWishlistDTO.added,
            },
          },
        },
      })
    );
  }

  async deleteUserProductFromWishlist(
    deleteUserProductFromWishlistDTO: DeleteUserProductFromWishlistDTO
  ): Promise<Product | null> {
    return await postgres.product.update({
      where: { id: deleteUserProductFromWishlistDTO.id },
      data: {
        wishListId: null,
      },
    });
  }
}
