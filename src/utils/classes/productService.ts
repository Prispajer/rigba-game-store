import { postgres } from "@/data/database/publicSQL/postgres";
import IProductService from "../interfaces/iProductsService";
import {
  getUserByEmail,
  getUserCart,
  getUserWishList,
} from "@/data/database/publicSQL/queries";
import {
  RequestResponse,
  LoggedUserCart,
  LoggedUserWishList,
} from "../helpers/types";

export default class ProductService implements IProductService {
  private email?: string;
  private externalProductId?: number;
  private name?: string;
  private description?: string;
  private price?: number;
  private background_image?: string;
  private rating?: number;
  private slug?: string;

  constructor(
    email: string,
    externalProductId: number,
    name?: string,
    description?: string,
    price?: number,
    background_image?: string,
    rating?: number,
    slug?: string
  ) {
    this.email = email;
    this.externalProductId = externalProductId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.background_image = background_image;
    this.rating = rating;
    this.slug = slug;
  }

  async addProductToCart(): Promise<RequestResponse<LoggedUserCart | null>> {
    try {
      if (!this.externalProductId) {
        return {
          success: false,
          message: "Product ID is required!",
          data: null,
        };
      }

      const user = await getUserByEmail(this.email as string);

      if (!user) {
        return {
          success: false,
          message: "User doesn't exist!",
          data: null,
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
                    background_image: this.background_image as string,
                    slug: this.slug as string,
                  },
                },
              },
            },
          },
          include: {
            products: true,
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
            data: { quantity: (productInCart.quantity ?? 0) + 1 },
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
                  background_image: this.background_image as string,
                  slug: this.slug as string,
                },
              },
            },
          });
        }
      }

      const updatedUserCart = await postgres.cart.findUnique({
        where: { id: userCart.id },
        include: { products: true },
      });

      return {
        success: true,
        message: "Product added to cart successfully!",
        data: updatedUserCart,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while adding product to the cart!",
        data: null,
      };
    }
  }

  async deleteProductFromCart(): Promise<
    RequestResponse<LoggedUserCart | null>
  > {
    try {
      if (!this.externalProductId) {
        return {
          success: false,
          message: "Product ID is required!",
          data: null,
        };
      }

      const user = await getUserByEmail(this.email as string);

      if (!user) {
        return {
          success: false,
          message: "User doesn't exist!",
          data: null,
        };
      }

      let userCart = await getUserCart(user.id);

      if (!userCart) {
        return {
          success: false,
          message: "Cart doesn't exist!",
          data: null,
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
          data: null,
        };
      }

      await postgres.product.delete({
        where: { id: productInCart.id },
      });

      const updatedUserCart = await postgres.cart.findUnique({
        where: { id: userCart.id },
        include: { products: true },
      });

      return {
        success: true,
        message: "Product added to cart successfully!",
        data: updatedUserCart,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while removing product from cart!",
        data: null,
      };
    }
  }

  async decreaseProductQuantity(): Promise<
    RequestResponse<LoggedUserCart | null>
  > {
    try {
      const user = await getUserByEmail(this.email as string);

      if (!user) {
        return {
          success: false,
          message: "User doesn't exist!",
          data: null,
        };
      }

      let userCart = await getUserCart(user?.id);

      if (!userCart) {
        return {
          success: false,
          message: "Cart not found!",
          data: null,
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
          data: null,
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

      const updatedUserCart = await postgres.cart.findUnique({
        where: { id: userCart.id },
        include: { products: true },
      });

      return {
        success: true,
        message: "Product added to cart successfully!",
        data: updatedUserCart,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong!",
        data: null,
      };
    }
  }

  async increaseProductQuantity(): Promise<
    RequestResponse<LoggedUserCart | null>
  > {
    try {
      const user = await getUserByEmail(this.email as string);

      if (!user) {
        return {
          success: false,
          message: "User doesn't exist!",
          data: null,
        };
      }

      let userCart = await getUserCart(user?.id);

      if (!userCart) {
        return {
          success: false,
          message: "Cart not found!",
          data: null,
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
          data: null,
        };
      }

      await postgres.product.update({
        where: { id: productInCart.id },
        data: { quantity: (productInCart.quantity ?? 0) + 1 },
      });

      const updatedUserCart = await postgres.cart.findUnique({
        where: { id: userCart.id },
        include: { products: true },
      });

      return {
        success: true,
        message: "Product added to cart successfully!",
        data: updatedUserCart,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong!",
        data: null,
      };
    }
  }

  async addProductToWishlist(): Promise<
    RequestResponse<LoggedUserWishList | null>
  > {
    try {
      if (!this.externalProductId) {
        return {
          success: false,
          message: "Product ID is required!",
          data: null,
        };
      }

      const user = await getUserByEmail(this.email as string);

      if (!user) {
        return {
          success: false,
          message: "User doesn't exist!",
          data: null,
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
                    background_image: this.background_image as string,
                    rating: this.rating as number,
                    slug: this.slug as string,
                  },
                },
              },
            },
          },
          include: {
            products: true,
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
            data: null,
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
                  background_image: this.background_image as string,
                  rating: this.rating as number,
                  slug: this.slug as string,
                },
              },
            },
          });
        }
      }

      const updatedUserWishList = await postgres.wishlist.findUnique({
        where: { id: userWishList.id },
        include: { products: true },
      });

      return {
        success: true,
        message: "Product added to wishlist successfully!",
        data: updatedUserWishList,
      };
    } catch (error) {
      console.error("Error in addProductToWishlist:", error);
      return {
        success: false,
        message: "Error while adding product to the wishlist!",
        data: null,
      };
    }
  }

  async deleteProductFromWishList(): Promise<
    RequestResponse<LoggedUserWishList | null>
  > {
    try {
      if (!this.externalProductId) {
        return {
          success: false,
          message: "Product ID is required!",
          data: null,
        };
      }

      const user = await getUserByEmail(this.email as string);

      if (!user) {
        return {
          success: false,
          message: "User doesn't exist!",
          data: null,
        };
      }

      let userWishList = await getUserWishList(user.id);

      if (!userWishList) {
        return {
          success: false,
          message: "Wishlist doesn't exist!",
          data: null,
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
          data: null,
        };
      }

      await postgres.product.delete({
        where: { id: productInWishlist.id },
      });

      const updatedUserWishList = await postgres.cart.findUnique({
        where: { id: userWishList.id },
        include: { products: true },
      });

      return {
        success: true,
        message: "Product removed from wishlist successfully!",
        data: updatedUserWishList,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while removing product from wishlist!",
        data: null,
      };
    }
  }
}
