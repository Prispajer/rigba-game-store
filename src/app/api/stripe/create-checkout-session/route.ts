import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { cart } = await request.json();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cart.map((product: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.productsInformations.name,
          },
          unit_amount: product.productsInformations.price * 100,
        },
        quantity: product.quantity,
      })),
      mode: "payment",
      success_url: `${request.nextUrl.origin}/checkout/redeem`,
      cancel_url: `${request.nextUrl.origin}/checkout`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error("Error creating Stripe checkout session:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
