import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/data/database/publicSQL/queries";
import { getUserCart } from "@/data/database/publicSQL/queries";
import { postgres } from "@/data/database/publicSQL/postgres";

export async function PATCH(request: NextRequest) {
  try {
    const { email, externalProductId } = await request.json();

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return NextResponse.json({
        error: "User doesn't exist!",
      });
    }

    let userCart = await getUserCart(existingUser?.id);

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

    const updatedProduct = await postgres.product.update({
      where: { id: existingProductInCart.id },
      data: { quantity: existingProductInCart.quantity - 1 },
    });

    if (updatedProduct.quantity <= 0) {
      await postgres.product.delete({
        where: { id: existingProductInCart.id },
      });
    }

    return NextResponse.json({
      success: "Product quantity updated successfully!",
      updatedProduct: updatedProduct,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Something went wrong!",
    });
  }
}
