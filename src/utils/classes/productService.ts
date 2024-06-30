import { postgres } from "@/data/database/publicSQL/postgres";
import IProductService from "../interfaces/iProductsService";
import { getUserByEmail, getUserCart } from "@/data/database/publicSQL/queries";
import {
  RequestResponse,
  LoggedUserProduct,
  LoggedUserUpdatedProduct,
  LoggedUserCart,
} from "../helpers/types";

export default class ProductService implements IProductService {
  private email?: string;
  private externalProductId?: number;
  private name?: string;
  private description?: string;
  private price?: number;
  private imageUrl?: string;

  constructor(
    email: string,
    externalProductId: number,
    name?: string,
    description?: string,
    price?: number,
    imageUrl?: string
  ) {
    this.email = email;
    this.externalProductId = externalProductId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  async addProductToCart(): Promise<RequestResponse<LoggedUserCart>> {
    try {
      if (!this.externalProductId) {
        return {
          success: false,
          message: "Product ID is required!",
          data: undefined,
        };
      }

      const user = await getUserByEmail(this.email as string);

      if (!user) {
        return {
          success: false,
          message: "User doesn't exsist!",
          data: undefined,
        };
      }

      let userCart = await getUserCart(user.id);
      if (!userCart) {
        userCart = await postgres.cart.create({
          data: {
            userId: user.id,
            products: {
              create: {
                externalProductId: this.externalProductId as number,
                quantity: 1,
                productsInformations: {
                  create: {
                    name: this.name as string,
                    description: this.description as string,
                    price: this.price as number,
                    imageUrl: this.imageUrl as string,
                  },
                },
              },
            },
          },
        });
      } else {
        const productInCart = await postgres.product.findFirst({
          where: {
            cartId: userCart.id,
            externalProductId: this.externalProductId,
          },
        });

        if (productInCart) {
          await postgres.product.update({
            where: { id: productInCart.id },
            data: { quantity: productInCart.quantity + 1 },
          });
        } else {
          await postgres.product.create({
            data: {
              cartId: userCart.id as string,
              externalProductId: this.externalProductId as number,
              quantity: 1,
              productsInformations: {
                create: {
                  name: this.name as string,
                  description: this.description as string,
                  price: this.price as number,
                  imageUrl: this.imageUrl as string,
                },
              },
            },
          });
        }

        userCart = await postgres.cart.findUnique({
          where: { id: userCart.id },
          include: { products: true },
        });
      }
      return {
        success: true,
        message: "Product added to cart successfully!",
        data: userCart,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while adding product to the cart!",
        data: undefined,
      };
    }
  }

  async deleteProductFromCart(): Promise<RequestResponse<LoggedUserCart>> {
    try {
      if (!this.externalProductId) {
        return {
          success: false,
          message: "Product ID is required!",
          data: undefined,
        };
      }

      const user = await getUserByEmail(this.email as string);

      if (!user) {
        return {
          success: false,
          message: "User doesn't exsist!",
          data: undefined,
        };
      }

      let userCart = await getUserCart(user.id);

      if (!userCart) {
        return {
          success: false,
          message: "Cart doesn't exsist!",
          data: undefined,
        };
      }

      const productInCart = await postgres.product.findFirst({
        where: {
          cartId: userCart.id,
          externalProductId: this.externalProductId,
        },
      });

      if (!productInCart) {
        return {
          success: false,
          message: "Product not found in cart!",
          data: undefined,
        };
      }

      await postgres.product.delete({
        where: { id: productInCart.id },
      });

      userCart = await postgres.cart.findUnique({
        where: { id: userCart.id },
        include: { products: true },
      });

      return {
        success: true,
        message: "Product removed from cart successfully!",
        data: userCart,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while removing product from cart!",
        data: undefined,
      };
    }
  }

  async decreaseProductQuantity(): Promise<
    RequestResponse<LoggedUserUpdatedProduct>
  > {
    try {
      const user = await getUserByEmail(this.email as string);

      if (!user) {
        return {
          success: false,
          message: "User doesn't exsist!",
          data: undefined,
        };
      }

      let userCart = await getUserCart(user?.id);

      if (!userCart) {
        return {
          success: false,
          message: "Cart not found!",
          data: undefined,
        };
      }

      const productInCart = await postgres.product.findFirst({
        where: {
          cartId: userCart.id,
          externalProductId: this.externalProductId,
        },
      });

      if (!productInCart) {
        return {
          success: false,
          message: "Product not found in cart!",
          data: undefined,
        };
      }

      const updatedProduct = await postgres.product.update({
        where: { id: productInCart.id },
        data: { quantity: productInCart.quantity - 1 },
      });

      if (updatedProduct.quantity <= 0) {
        await postgres.product.delete({
          where: { id: productInCart.id },
        });
      }

      return {
        success: true,
        message: "Product quantity updated successfully!",
        data: updatedProduct,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong!",
        data: undefined,
      };
    }
  }

  async increaseProductQuantity(): Promise<
    RequestResponse<LoggedUserUpdatedProduct>
  > {
    try {
      const user = await getUserByEmail(this.email as string);

      if (!user) {
        return {
          success: false,
          message: "User doesn't exsist!",
          data: undefined,
        };
      }

      let userCart = await getUserCart(user?.id);

      if (!userCart) {
        return {
          success: false,
          message: "Cart not found!",
          data: undefined,
        };
      }

      const productInCart = await postgres.product.findFirst({
        where: {
          cartId: userCart.id,
          externalProductId: this.externalProductId,
        },
      });

      if (!productInCart) {
        return {
          success: false,
          message: "Product not found in cart!",
          data: undefined,
        };
      }

      const updatedProduct = await postgres.product.update({
        where: { id: productInCart.id },
        data: { quantity: productInCart.quantity + 1 },
      });

      return {
        success: true,
        message: "Product quantity updated successfully!",
        data: updatedProduct,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong!",
        data: undefined,
      };
    }
  }
}
