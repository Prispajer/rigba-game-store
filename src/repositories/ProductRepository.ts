import { injectable, inject } from "inversify";
import { postgres } from "@/data/database/publicSQL/postgres";
import IProductRepository from "@/interfaces/IProductRepository";
import IProductUtils from "@/interfaces/IProductUtils";
import { WishList, Product } from "@prisma/client";
import { User, CLASSTYPES } from "@/utils/helpers/types";
import {
  CreateUserCartProductDTO,
  GetUserCartDTO,
  GetUserWishListDTO,
  GetUserCartProductDTO,
  GetProductReviewsDTO,
  GetProductByExternalProductIdDTO,
  CreateUserWishListProductDTO,
  GetUserWishListProductDTO,
} from "@/utils/helpers/backendDTO";

@injectable()
export default class ProductRepository implements IProductRepository {
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

  async getUserWishList(
    getUserWishListDTO: GetUserWishListDTO
  ): Promise<Wishlist | null> {
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

  async getProductReviews(
    getProductReviewsDTO: GetProductReviewsDTO
  ): Promise<Product | null> {
    try {
      return await this._productUtils.executeOperation(
        (getProductReviewsDTO) =>
          postgres.product.findFirst({
            where: {
              externalProductId: getProductReviewsDTO?.externalProductId,
            },
            include: {
              reviews: {
                include: {
                  rating: true,
                  user: true,
                },
              },
            },
          }),
        getProductReviewsDTO
      );
    } catch {
      return null;
    }
  }

  async getProductByExternalProductId(
    getProductByExternalProductIdDTO: GetProductByExternalProductIdDTO
  ): Promise<Product | null> {
    try {
      return await this._productUtils.executeOperation(
        (getProductByExternalProductIdDTO) =>
          postgres.product.findFirst({
            where: {
              externalProductId:
                getProductByExternalProductIdDTO?.externalProductId,
            },
          }),
        getProductByExternalProductIdDTO
      );
    } catch {
      return null;
    }
  }

  async getUserCartProduct(
    getUserCartProductDTO: GetUserCartProductDTO
  ): Promise<Product | null> {
    try {
      return await this._productUtils.executeOperation(
        (getUserCartProductDTO) =>
          postgres.product.findFirst({
            where: {
              cartId: getUserCartProductDTO?.id,
              externalProductId: getUserCartProductDTO?.externalProductId,
            },
          }),
        getUserCartProductDTO
      );
    } catch {
      return null;
    }
  }

  async getUserWishListProduct(
    getUserWishListProductDTO: GetUserWishListProductDTO
  ): Promise<Product | null> {
    try {
      return await this._productUtils.executeOperation(
        (getUserWishListProductDTO) =>
          postgres.product.findFirst({
            where: {
              cartId: getUserWishListProductDTO?.id,
              externalProductId: getUserWishListProductDTO?.externalProductId,
            },
          }),
        getUserWishListProductDTO
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

  async createUserWishList(user: User): Promise<WishList | null> {
    return await this._productUtils.executeOperation(() =>
      postgres.wishList.create({
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

  async createUserWishListProduct(
    createUserWishListProductDTO: CreateUserWishListProductDTO
  ): Promise<Product | null> {
    return await this._productUtils.executeOperation(() =>
      postgres.product.create({
        data: {
          wishListId: createUserWishListProductDTO.wishListId,
          externalProductId: createUserWishListProductDTO.externalProductId,
          productsInformations: {
            create: {
              name: createUserWishListProductDTO.name,
              description: createUserWishListProductDTO.description,
              price: createUserWishListProductDTO.price,
              background_image: createUserWishListProductDTO.background_image,
              rating: createUserWishListProductDTO.rating,
              slug: createUserWishListProductDTO.slug,
              released: createUserWishListProductDTO.released,
              added: createUserWishListProductDTO.added,
            },
          },
        },
      })
    );
  }

  async increaseUserProductQuantity(
    userProductQuantityDTO: UserProductQuantityDTO
  ): Promise<UserProductQuantity | null> {
    await this._productUtils.executeOperation(
      (userProductQuantityDTO) =>
        postgres.product.update({
          where: { id: userProductQuantityDTO.id },
          data: { quantity: (userProductQuantityDTO.quantity ?? 0) + 1 },
        }),
      userProductQuantityDTO
    );
  }

  async decreaseUserProductQuantity(
    userProductQuantityDTO: UserProductQuantityDTO
  ): Promise<UserProductQuantity | null> {
    await this._productUtils.executeOperation(
      (userProductQuantityDTO) =>
        postgres.product.update({
          where: { id: userProductQuantityDTO.id },
          data: { quantity: userProductQuantityDTO.quantity - 1 },
        }),
      userProductQuantityDTO
    );
  }
}
