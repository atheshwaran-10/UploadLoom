import Stripe from "stripe";
import { getCurrentUser } from "@/hooks/getCurrentUser";
import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { stripe } from "@/lib/stripe";

export async function POST(
  req: Request,
  { params }: { params: { appId: string } },
) {
  try {
    const user = await getCurrentUser();
    const app = await db.app.findFirst({
      where: {
        id: Number(params.appId),
      },
    });

    if (!user || !user.id || !user.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!app) {
      return new NextResponse("App Not Found", { status: 401 });
    }

    if (app.appLimit === 5120) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "INR",
          product_data: {
            name: "Upload Loom Pro Membership",
            description:
              "Geared towards more active users, the Pro tier provides a higher data limit of 5GB. ",
            images:["https://cdn.discordapp.com/attachments/1203013470300143616/1215671962349600768/Logo.png?ex=65fd99bd&is=65eb24bd&hm=d5759c91a11736f4aa2717f1d6aca51c39e1d49b50f0611aed44d0fb048cc508&"]
          },
          unit_amount: Math.round(200! * 100),
        },
      },
    ];

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.email,
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/${params.appId}/home?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/${params.appId}/home?canceled=1`,
      metadata: {
        appId: params.appId,
        userId: user.id,
        userEmail: user.email,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[APP_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
