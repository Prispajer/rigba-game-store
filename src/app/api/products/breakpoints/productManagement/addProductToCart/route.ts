import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/data/database/publicSQL/queries";
import { postgres } from "@/data/database/publicSQL/postgres";

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();
    const { id, quantity } = productData;

    if (!id || !quantity) {
      return NextResponse.json({
        error: "Product ID and quantity are required!",
      });
    }

    const userEmail = "koziel.adrian98@gmail.com";
    const existingUser = await getUserByEmail(userEmail);

    if (!existingUser) {
      return NextResponse.json({ error: "User not found!" });
    }

    let user = await postgres.user.findUnique({
      where: { id: existingUser.id },
      include: { cart: true },
    });

    if (!user.cart) {
      user = await postgres.user.update({
        where: { id: existingUser.id },
        data: {
          cart: {
            create: {
              products: {
                create: {
                  id,
                  quantity,
                },
              },
            },
          },
        },
        include: { cart: true },
      });
    } else {
      user = await postgres.cart.update({
        where: { id: user.cart.id },
        data: {
          products: {
            create: {
              id,
              quantity,
            },
          },
        },
        include: { products: true },
      });
    }

    return NextResponse.json({
      success: "Product added to cart successfully!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        cart: user.cart,
      },
    });
  } catch (error) {
    console.error("Error while adding product to cart:", error);
    return NextResponse.json({
      error: "An error occurred while adding product to cart.",
      details: error.message,
    });
  }
}
