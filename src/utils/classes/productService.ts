import { postgres } from "@/data/database/publicSQL/postgres";
import IProductService from "../interfaces/iProductsService";
import {
  getUserByEmail,
  getUserCart,
  getUserWishList,
} from "@/data/database/publicSQL/queries";
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
          message: "User doesn't exist!",
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
          message: "User doesn't exist!",
          data: undefined,
        };
      }

      let userCart = await getUserCart(user.id);

      if (!userCart) {
        return {
          success: false,
          message: "Cart doesn't exist!",
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
          message: "User doesn't exist!",
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
        data: { quantity: (productInCart.quantity as number) - 1 },
      });

      if ((updatedProduct.quantity as number) <= 0) {
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
          message: "User doesn't exist!",
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

  async addProductToWishlist(): Promise<RequestResponse<LoggedUserWishlist>> {
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
          message: "User doesn't exist!",
          data: undefined,
        };
      }

      let userWishList = await getUserWishList(user.id);
      if (!userWishList) {
        userWishList = await postgres.wishlist.create({
          data: {
            userId: user.id,
            products: {
              create: {
                externalProductId: this.externalProductId as number,
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
        const productInWishlist = await postgres.product.findFirst({
          where: {
            wishListId: userWishList.id,
            externalProductId: this.externalProductId,
          },
        });

        if (productInWishlist) {
          return {
            success: false,
            message: "Product already in wishlist!",
            data: undefined,
          };
        } else {
          await postgres.product.create({
            data: {
              wishListId: userWishList.id as string,
              externalProductId: this.externalProductId as number,
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

        userWishList = await postgres.wishlist.findUnique({
          where: { id: userWishList.id },
          include: { products: true },
        });
      }
      return {
        success: true,
        message: "Product added to wishlist successfully!",
        data: userWishList,
      };
    } catch (error) {
      console.error("Error in addProductToWishlist:", error);
      return {
        success: false,
        message: "Error while adding product to the wishlist!",
        data: undefined,
      };
    }
  }

  async deleteProductFromWishList(): Promise<RequestResponse<LoggedUserCart>> {
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
          message: "User doesn't exist!",
          data: undefined,
        };
      }

      let userWishList = await getUserWishList(user.id);

      if (!userWishList) {
        return {
          success: false,
          message: "Wishlist doesn't exist!",
          data: undefined,
        };
      }

      const productInWishlist = await postgres.product.findFirst({
        where: {
          wishListId: userWishList.id,
          externalProductId: this.externalProductId,
        },
      });

      if (!productInWishlist) {
        return {
          success: false,
          message: "Product not found in wishlist!",
          data: undefined,
        };
      }

      await postgres.product.delete({
        where: { id: productInWishlist.id },
      });

      userWishList = await postgres.cart.findUnique({
        where: { id: userWishList.id },
        include: { products: true },
      });

      return {
        success: true,
        message: "Product removed from wishlist successfully!",
        data: userWishList,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while removing product from wishlist!",
        data: undefined,
      };
    }
  }
}
