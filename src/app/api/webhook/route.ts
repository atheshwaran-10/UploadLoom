import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/server/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }
  try{
     const session = event.data.object as Stripe.Checkout.Session;
     const userId = session?.metadata?.userId;
     const userEmail = session?.metadata?.userEmail;
     const appId = session?.metadata?.appId;

     console.log("Session completed");

     if (event.type === "checkout.session.completed") {
       console.log("Session completed");
       if (!userId) {
         return new NextResponse(`Webhook Error: Missing metadata`, {
           status: 400,
         });
       }
       if (appId) 
       {
         await db.purchase.create({
           data: {
             appId: appId,
             userId: userId,
           },
         });
         await db.app.update({
           where: {
             id:Number(appId)
           },
           data: {
             appLimit: 5120,
           },
         });
       }
     } else {
       return new NextResponse(
         `Webhook Error: Unhandled event type ${event.type}`,
         { status: 200 },
       );
     }
  }catch(e:any){
    return new NextResponse(e, { status: 500 });
  }
 

  return new NextResponse(null, { status: 200 });
}
