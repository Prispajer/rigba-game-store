import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, getUserCart } from "@/data/database/publicSQL/queries";
import { postgres } from "@/data/database/publicSQL/postgres";

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();
    const { id } = productData;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required!" });
    }

    const userEmail = "duzykox123@gmail.com";
    const existingUser = await getUserByEmail(userEmail);

    if (!existingUser) {
      return NextResponse.json({ error: "User not found!" });
    }

    let userCart = await getUserCart(existingUser.id);

    if (!userCart) {
      userCart = await postgres.cart.create({
        data: {
          userId: existingUser.id,
          products: {
            create: {
              productId: id,
              quantity: 1,
            },
          },
        },
      });
      // } else {
      //   const existingProductInCart = await postgres.productInCart.findFirst({
      //     where: {
      //       cartId: userCart.id,
      //       productId: id,
      //     },
      //   });

      //   if (existingProductInCart) {
      //     await postgres.productInCart.update({
      //       where: { id: existingProductInCart.id },
      //       data: { quantity: existingProductInCart.quantity + 1 },
      //     });
      //   } else {
      //     await postgres.productInCart.create({
      //       data: {
      //         cartId: userCart.id,
      //         productId: id,
      //         quantity: 1,
      //       },
      //     });
      //   }

      //   userCart = await postgres.cart.findUnique({
      //     where: { id: userCart.id },
      //     include: { products: true },
      //   });
      // }
    }
    return NextResponse.json({
      success: "Product added to cart successfully!",
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        cart: userCart,
      },
    });
  } catch (error) {
    console.error("Error while adding product to cart:", error);
    return NextResponse.json({ error: "Error while adding product to cart" });
  }
}
