import { auth } from "@/lib/utils/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// initialize Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2026-05-27.dahlia",
});

export async function POST(request: Request) {
    try {
        const UserSession = await auth.api.getSession({
            headers: await headers()
        });
        
        const userId = UserSession?.user.id;

        // 1. IMPORTANT: Prevent the crash if the user isn't logged in!
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            client_reference_id: userId,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Lifetime premium access.",
                            description: "Unlimited daily questions forever."
                        },
                        unit_amount: 500
                    },
                    quantity: 1
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
        });

        return NextResponse.json({ url: session.url });

    } catch (error: unknown) {
        const message=error instanceof Error?error.message:"Unknown error";
        // 2. IMPORTANT: This will print the exact Stripe error in your VS Code terminal!
        console.error("STRIPE CHECKOUT ERROR:", error);
        
        return NextResponse.json(
            { error: message || "Internal Server Error" }, 
            { status: 500 }
        );
    }
}