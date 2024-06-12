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
              externalProductId: id,
              quantity: 1,
              productsInformations: {
                create: {
                  name: "xd",
                  description: "xd",
                  price: 1.11,
                  imageUrl: "xd",
                },
              },
            },
          },
        },
      });
    } else {
      const existingProductInCart = await postgres.product.findFirst({
        where: {
          cartId: userCart.id,
          externalProductId: id,
        },
      });

      if (existingProductInCart) {
        await postgres.product.update({
          where: { id: existingProductInCart.id },
          data: { quantity: existingProductInCart.quantity + 1 },
        });
      } else {
        await postgres.product.create({
          data: {
            cartId: userCart.id,
            externalProductId: id,
            quantity: 1,
            productsInformations: {
              create: {
                name: "haha",
                description: "hahaha",
                price: 9.11,
                imageUrl: "hahahahah",
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
