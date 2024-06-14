import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, getUserCart } from "@/data/database/publicSQL/queries";
import { postgres } from "@/data/database/publicSQL/postgres";

export async function DELETE(request: NextRequest) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required!" });
    }

    const userEmail = "duzykox123@gmail.com";
    const existingUser = await getUserByEmail(userEmail);

    if (!existingUser) {
      return NextResponse.json({ error: "User not found!" });
    }

    let userCart = await getUserCart(existingUser.id);

    if (!userCart) {
      return NextResponse.json({ error: "Cart not found!" });
    }

    const existingProductInCart = await postgres.product.findFirst({
      where: {
        cartId: userCart.id,
        externalProductId: productId,
      },
    });

    if (!existingProductInCart) {
      return NextResponse.json({ error: "Product not found in cart!" });
    }

    if (existingProductInCart.quantity > 1) {
      await postgres.product.update({
        where: { id: existingProductInCart.id },
        data: { quantity: existingProductInCart.quantity - 1 },
      });
    } else {
      await postgres.product.delete({
        where: { id: existingProductInCart.id },
      });
    }

    userCart = await postgres.cart.findUnique({
      where: { id: userCart.id },
      include: { products: true },
    });

    return NextResponse.json({
      success: "Product removed from cart successfully!",
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        cart: userCart,
      },
    });
  } catch (error) {
    console.error("Error while removing product from cart:", error);
    return NextResponse.json({
      error: "Error while removing product from cart",
    });
  }
}
