import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, getUserCart } from "@/data/database/publicSQL/queries";
import { postgres } from "@/data/database/publicSQL/postgres";

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();
    const { externalProductId, name, description, price, imageUrl, email } =
      productData;

    if (!externalProductId) {
      return NextResponse.json({ error: "Product ID is required!" });
    }

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return NextResponse.json({ error: "User doesn't exist!" });
    }

    let userCart = await getUserCart(existingUser.id);
    if (!userCart) {
      userCart = await postgres.cart.create({
        data: {
          userId: existingUser.id,
          products: {
            create: {
              externalProductId: externalProductId,
              quantity: 1,
              productsInformations: {
                create: {
                  name: name,
                  description: description,
                  price: price,
                  imageUrl: imageUrl,
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
          externalProductId: externalProductId,
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
            externalProductId: externalProductId,
            quantity: 1,
            productsInformations: {
              create: {
                name: name,
                description: description,
                price: price,
                imageUrl: imageUrl,
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
