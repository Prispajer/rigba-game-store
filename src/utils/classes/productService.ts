import { postgres } from "@/data/database/publicSQL/postgres";
import IProductService from "../interfaces/IProductsService";
import {
  getUserByEmail,
  getUserCart,
  getUserWishList,
  getProductReviews,
} from "@/data/database/publicSQL/queries";
import {
  RequestResponse,
  LoggedUserCart,
  LoggedUserWishList,
} from "../helpers/types";
import { RatingTitle } from "@prisma/client";

export default class ProductService implements IProductService {
  private email?: string;
  private externalProductId?: number;
  private name?: string;
  private description?: string;
  private price?: number;
  private background_image?: string;
  private rating?: number;
  private slug?: string;
  private released?: string;
  private added?: number;
  private title?: string;
  private likes?: number;

  constructor(
    email?: string,
    externalProductId?: number,
    name?: string,
    description?: string,
    price?: number,
    background_image?: string,
    rating?: number,
    slug?: string,
    released?: string,
    added?: number,
    title?: string,
    likes?: number
  ) {
    this.email = email;
    this.externalProductId = externalProductId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.background_image = background_image;
    this.rating = rating;
    this.slug = slug;
    this.released = released;
    this.added = added;
    this.title = title;
    this.likes = likes;
  }

  async getCart(): Promise<RequestResponse<LoggedUserCart | null>> {
    try {
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
          data: { userId: user.id, products: {} },
          include: { products: true },
        });
      }

      return {
        success: true,
        message: "Cart retrieved successfully!",
        data: userCart,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while retrieving cart!",
        data: null,
      };
    }
  }

  async getWishList(): Promise<RequestResponse<LoggedUserWishList | null>> {
    try {
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
        userWishList = await postgres.cart.create({
          data: { userId: user.id, products: {} },
          include: { products: true },
        });
      }

      return {
        success: true,
        message: "Wishlist retrieved successfully!",
        data: userWishList,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while retrieving wishlist!",
        data: null,
      };
    }
  }

  async getReviews(): Promise<RequestResponse<any | null>> {
    try {
      const existingProduct = await postgres.product.findFirst({
        where: { externalProductId: this.externalProductId },
      });

      if (!existingProduct) {
        return {
          success: false,
          message: "Product not found!",
          data: null,
        };
      }

      const productReviews = await getProductReviews(
        existingProduct.externalProductId
      );

      if (!productReviews) {
        return {
          success: false,
          message: "This product doesn't have any reviews!",
          data: null,
        };
      }

      return {
        success: true,
        message: "Reviews retrieved successfully!",
        data: productReviews,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while retrieving reviews!",
        data: null,
      };
    }
  }

  async addProduct(): Promise<RequestResponse<Product | null>> {
    try {
      if (!this.externalProductId || !this.name || !this.price) {
        return {
          success: false,
          message: "Product ID, name, and price are required!",
          data: null,
        };
      }

      const existingProduct = await postgres.product.findFirst({
        where: { externalProductId: this.externalProductId },
      });

      if (existingProduct) {
        return {
          success: false,
          message: "Product already exists in the database!",
          data: existingProduct,
        };
      }

      const newProduct = await postgres.product.create({
        data: {
          externalProductId: this.externalProductId,
          quantity: 1,
          productsInformations: {
            create: {
              name: this.name as string,
              description: this.description as string,
              price: this.price as number,
              background_image: this.background_image as string,
              slug: this.slug as string,
              released: this.released as string,
              added: this.added as number,
            },
          },
        },
      });

      return {
        success: true,
        message: "Product added to database successfully!",
        data: newProduct,
      };
    } catch (error) {
      console.error("Error while adding product to database:", error);
      return {
        success: false,
        message: "Error while adding product to database!",
        data: null,
      };
    }
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
                    released: this.released as string,
                    added: this.added as number,
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
                  released: this.released as string,
                  added: this.added as number,
                },
              },
            },
          });
        }
      }

      const updatedUserCart = await postgres.cart.findUnique({
        where: { id: userCart.id },
        include: { products: { include: { productsInformations: true } } },
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
                    released: this.released as string,
                    added: this.added as number,
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
                  released: this.released as string,
                  added: this.added as number,
                },
              },
            },
          });
        }
      }

      const updatedUserWishList = await postgres.wishlist.findUnique({
        where: { id: userWishList.id },
        include: { products: { include: { productsInformations: true } } },
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

  async addReviewToProduct(): Promise<RequestResponse<any | null>> {
    try {
      if (!this.externalProductId || !this.rating) {
        return {
          success: false,
          message: "Product ID and rating are required!",
          data: null,
        };
      }

      if (!this.email) {
        return {
          success: false,
          message: "User email is required!",
          data: null,
        };
      }

      const user = await getUserByEmail(this.email);
      if (!user) {
        return {
          success: false,
          message: "User doesn't exist!",
          data: null,
        };
      }

      let product = await postgres.product.findFirst({
        where: { externalProductId: this.externalProductId },
      });

      if (!product) {
        const addedProduct = await this.addProduct();
        if (!addedProduct.success) {
          return {
            success: false,
            message: "Error adding product to database!",
            data: null,
          };
        }
        product = addedProduct.data;
      }

      const sameReview = await postgres.review.findFirst({
        where: { productId: product?.id, userId: user.id },
      });

      if (sameReview) {
        return {
          success: false,
          message: "User has already written a review for this game!",
          data: null,
        };
      }

      const createdReview = await postgres.review.create({
        data: {
          userId: user.id,
          productId: product?.id as string,
          likes: this.likes,
        },
      });

      await postgres.rating.create({
        data: {
          rating: this.rating,
          reviewId: createdReview.id,
          title: this.title as RatingTitle,
          percent: this.rating * 20,
          description: this.description as string,
        },
      });

      return {
        success: true,
        message: "Review added successfully!",
        data: null,
      };
    } catch (error) {
      console.error("Error while adding review:", error);
      return {
        success: false,
        message: "Error while adding review!",
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
        include: { products: { include: { productsInformations: true } } },
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

      const updatedUserWishList = await postgres.wishlist.findUnique({
        where: { id: userWishList.id },
        include: { products: { include: { productsInformations: true } } },
      });

      if (!updatedUserWishList) {
        return {
          success: false,
          message: "Error retrieving updated wishlist!",
          data: null,
        };
      }

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
        include: { products: { include: { productsInformations: true } } },
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
        include: { products: { include: { productsInformations: true } } },
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

  async likeReview(): Promise<RequestResponse<any | null>> {
    try {
      if (!this.email || !this.externalProductId) {
        return {
          success: false,
          message: "Email and product ID are required!",
          data: null,
        };
      }

      const user = await postgres.user.findUnique({
        where: { email: this.email },
        include: { reviewsLikers: true, reviews: true },
      });

      if (!user) {
        return { success: false, message: "User not found!", data: null };
      }

      const product = await postgres.product.findFirst({
        where: { externalProductId: this.externalProductId },
      });

      if (!product) {
        return { success: false, message: "Product not found!", data: null };
      }

      console.log(this.externalProductId);
      console.log(product);

      const existingReview = await postgres.review.findFirst({
        where: {
          userId: user.id,
          productId: product.id,
        },
      });

      const existingLiker = await postgres.reviewLikers.findUnique({
        where: {
          userId_productId_reviewId: {
            userId: user.id,
            productId: product.id,
            reviewId: existingReview?.id as string,
          },
        },
      });

      if (existingLiker) {
        if (existingLiker.isLiked) {
          return {
            success: false,
            message: "You have already liked this review!",
            data: null,
          };
        } else {
          await postgres.reviewLikers.update({
            where: { id: existingLiker.id },
            data: { isLiked: true },
          });

          await postgres.review.update({
            where: { id: existingReview?.id },
            data: { likes: (existingReview?.likes ?? 0) + 1 },
          });

          return {
            success: true,
            message: "Review liked successfully!",
            data: null,
          };
        }
      }

      await postgres.reviewLikers.create({
        data: {
          userId: user.id,
          productId: product.id,
          reviewId: existingReview?.id as string,
          isLiked: true,
        },
      });

      await postgres.review.update({
        where: { id: existingReview?.id as string },
        data: { likes: (existingReview?.likes ?? 0) + 1 },
      });

      return {
        success: true,
        message: "Review liked successfully!",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while liking review!",
        data: null,
      };
    }
  }

  async unLikeReview(): Promise<RequestResponse<any | null>> {
    try {
      if (!this.email || !this.externalProductId) {
        return {
          success: false,
          message: "Email and product ID are required!",
          data: null,
        };
      }

      const user = await getUserByEmail(this.email);

      if (!user) {
        return { success: false, message: "User not found!", data: null };
      }

      const product = await postgres.product.findFirst({
        where: { externalProductId: this.externalProductId },
        include: {
          reviews: true,
        },
      });

      if (!product) {
        return { success: false, message: "Product not found!", data: null };
      }

      const existingReview = await postgres.review.findFirst({
        where: {
          userId: user.id,
          productId: product.id,
        },
      });

      const existingLiker = await postgres.reviewLikers.findUnique({
        where: {
          userId_productId_reviewId: {
            userId: user.id,
            productId: product.id,
            reviewId: existingReview?.id as string,
          },
        },
      });

      if (existingLiker) {
        if (!existingLiker.isLiked) {
          return {
            success: false,
            message: "You have already disliked this review!",
            data: null,
          };
        } else {
          await postgres.reviewLikers.update({
            where: { id: existingLiker.id },
            data: { isLiked: false },
          });

          await postgres.review.update({
            where: { id: existingReview?.id },
            data: { likes: (existingReview?.likes ?? 0) - 1 },
          });

          return {
            success: true,
            message: "Review dislike updated successfully!",
            data: null,
          };
        }
      }

      await postgres.reviewLikers.create({
        data: {
          userId: user.id,
          productId: product.id,
          reviewId: existingReview?.id as string,
          isLiked: false,
        },
      });

      await postgres.review.update({
        where: { id: existingReview?.id },
        data: { likes: (existingReview?.likes ?? 0) - 1 },
      });

      return {
        success: true,
        message: "Review disliked successfully!",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while disliking review!",
        data: null,
      };
    }
  }
}
