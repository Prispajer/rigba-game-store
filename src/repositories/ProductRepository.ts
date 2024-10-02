import { injectable, inject } from "inversify";
import { postgres } from "@/data/database/publicSQL/postgres";
import IProductRepository from "@/interfaces/IProductRepository";
import IProductUtils from "@/interfaces/IProductUtils";
import { Wishlist, Product } from "@prisma/client";
import {
  User,
  RequestResponse,
  EmailVerificationToken,
  ResetPasswordToken,
  TwoFactorToken,
  CLASSTYPES,
} from "@/utils/helpers/types";
import { CreateUserCartProductDTO } from "@/utils/helpers/typesDTO";

@injectable()
export default class ProductRepository implements IProductRepository {
  private readonly _productUtils: IProductUtils;

  constructor(@inject(CLASSTYPES.IProductUtils) productUtils: IProductUtils) {
    this._productUtils = productUtils;
  }

  async getUserCart(userId: string): Promise<Cart | null> {
    try {
      return await this._productUtils.getDataByProperty(
        (userId) =>
          postgres.cart.findUnique({
            where: { userId },
            include: {
              products: {
                include: {
                  productsInformations: true,
                },
              },
            },
          }),
        userId
      );
    } catch {
      return null;
    }
  }

  async getUserWishList(userId: string): Promise<Wishlist | null> {
    try {
      return await this._productUtils.getDataByProperty(
        (userId) =>
          postgres.wishlist.findUnique({
            where: { userId },
            include: {
              products: {
                include: {
                  productsInformations: true,
                },
              },
            },
          }),
        userId
      );
    } catch {
      return null;
    }
  }

  async getProductReviews(externalProductId: number): Promise<any | null> {
    try {
      return await this._productUtils.getDataByProperty(
        (_, externalProductId) =>
          postgres.product.findFirst({
            where: { externalProductId },
            include: {
              reviews: {
                include: {
                  rating: true,
                  user: true,
                },
              },
            },
          }),
        undefined,
        externalProductId
      );
    } catch {
      return null;
    }
  }

  async getProductByExternalProductId(
    externalProductId: number
  ): Promise<Product | null> {
    try {
      return await this._productUtils.getDataByProperty(
        (_, externalProductId) =>
          postgres.product.findFirst({
            where: { externalProductId },
          }),
        undefined,
        externalProductId
      );
    } catch {
      return null;
    }
  }

  async createUserCart(user: User): Promise<Cart> {
    return await this._productUtils.createDataByProperty(() =>
      postgres.cart.create({
        data: { userId: user.id, products: {} },
        include: { products: true },
      })
    );
  }

  async createUserWishList(user: User): Promise<Wishlist> {
    return await this._productUtils.createDataByProperty(() =>
      postgres.wishlist.create({
        data: { userId: user.id, products: {} },
        include: { products: true },
      })
    );
  }

  async createUserProduct(
    createUserCartProductDTO: CreateUserCartProductDTO
  ): Promise<Product> {
    return await this._productUtils.createDataByProperty(() =>
      postgres.product.create({
        data: {
          cartId: createUserCartProductDTO.id,
          externalProductId: createUserCartProductDTO.externalProductId,
          quantity: 1,
          productsInformations: {
            create: {
              name: createUserCartProductDTO.name,
              description: createUserCartProductDTO.description,
              price: createUserCartProductDTO.price,
              background_image: createUserCartProductDTO.background_image,
              slug: createUserCartProductDTO.slug,
              released: createUserCartProductDTO.released,
              added: createUserCartProductDTO.added,
            },
          },
        },
      })
    );
  }
}
