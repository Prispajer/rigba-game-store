import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { postgres } from "@/data/database/publicSQL/postgres";
import { getUserByEmail } from "@/data/database/publicSQL/queries";
import { generateGameKey } from "@/utils/prices";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

export async function POST(request: NextRequest, response: NextResponse) {
  const { email, amount, cart } = await request.json();

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      console.error("User not found");
      throw new Error("User not found");
    }
    console.log("User found:", user.email);

    let order = await postgres.order.findFirst({
      where: {
        userId: user.id,
        status: "Pending",
      },
    });

    if (!order) {
      console.log("Creating a new order...");
      order = await postgres.order.create({
        data: {
          userId: user.id,
          status: "Pending",
          title: cart[0]?.productsInformations?.name || "Order",
          paymentMethod: "Card",
          total: amount,
        },
      });
    } else {
      console.log("Updating existing order...");
      order = await postgres.order.update({
        where: { id: order.id },
        data: {
          total: amount,
        },
      });
    }

    console.log("Order processed:", order);

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "USD",
        amount: Math.round(amount),
        metadata: {
          cartId: cart[0].cartId,
          orderId: order.id,
        },
      });

      console.log("Payment intent created:", paymentIntent);

      if (!paymentIntent.client_secret) {
        throw new Error("Stripe failed to create payment intent");
      }

      if (paymentIntent.status === "succeeded") {
        console.log("Payment succeeded, generating keys...");

        for (const product of cart.products) {
          for (let i = 0; i < product.quantity; i++) {
            const existingKey = await postgres.key.findFirst({
              where: {
                orderId: order.id,
                productId: product.id,
              },
            });

            if (!existingKey) {
              await postgres.key.create({
                data: {
                  orderId: order.id,
                  productId: product.id,
                  key: generateGameKey(),
                },
              });
              console.log(`Generated key for product ${product.id}`);
            }
          }
        }

        // Aktualizacja statusu zamówienia
        await postgres.order.update({
          where: { id: order.id },
          data: {
            status: "Completed",
          },
        });
        console.log("Order status updated to Completed");
      }

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        order,
      });
    } catch (err: any) {
      console.error("Error creating Stripe payment intent:", err);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  } catch (err: any) {
    console.error("Error processing request:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
