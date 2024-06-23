import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, getUserCart } from "@/data/database/publicSQL/queries";
import { postgres } from "@/data/database/publicSQL/postgres";

export async function POST(request: NextRequest) {
  try {
    const { email, externalProductId } = await request.json();

    if (!externalProductId) {
      return NextResponse.json({ error: "Product ID is required!" });
    }

    const existingUser = await getUserByEmail(email);

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
        externalProductId: externalProductId,
      },
    });

    if (!existingProductInCart) {
      return NextResponse.json({ error: "Product not found in cart!" });
    }

    await postgres.product.delete({
      where: { id: existingProductInCart.id },
    });

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
