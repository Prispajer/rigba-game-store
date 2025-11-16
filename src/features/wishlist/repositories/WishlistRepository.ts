import { injectable, inject } from "inversify";
import { postgres } from "@/lib/db";
import type IProductService from "@/features/products/interfaces/IProductService";
import type IWishlistRepository from "@/features/wishlist/interfaces/IWishlistRepository";
import { User, Wishlist, Product } from "@prisma/client";
import CLASSTYPES from "@/shared/constants/classTypes";
import {
  GetUserWishlistDTO,
  CreateUserProductWishlistDTO,
  DeleteUserProductFromWishlistDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class WishlistRepository implements IWishlistRepository {
  private readonly _productService: IProductService;

  constructor(@inject(CLASSTYPES.IProductService) productService: IProductService) {
    this._productService = productService;
  }

  async getUserWishlist(
    getUserWishlistDTO: GetUserWishlistDTO
  ): Promise<Wishlist | null> {
    try {
      return await this._productService.findByProperty(
        () =>
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
      );
    } catch {
      return null;
    }
  }

  async createUserWishlist(user: User): Promise<Wishlist | null> {
    return await this._productService.findByProperty(() =>
      postgres.wishlist.create({
        data: { userId: user.id, products: {} },
        include: { products: true },
      })
    );
  }

  async createUserProductWishlist(
    createUserProductWishlistDTO: CreateUserProductWishlistDTO
  ): Promise<Product | null> {
    return await this._productService.findByProperty(() =>
      postgres.product.create({
        data: {
          wishlistId: createUserProductWishlistDTO.wishlistId,
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
          wishlistId: null,
      },
    });
  }
}
