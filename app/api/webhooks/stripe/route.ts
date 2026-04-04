import { stripe } from "@/app/lib/stripe";
import { sql } from "@/app/lib/db";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return new Response("Webhook signature verification failed", {
      status: 400,
    });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      if (session.metadata?.order_type !== "preorder") break;

      const customerId = session.customer as string;
      const batch = session.metadata?.batch || "";
      const depositCents = parseInt(session.metadata?.deposit_cents || "0");
      const remainingCents = parseInt(
        session.metadata?.remaining_cents || "0"
      );
      const totalCents = parseInt(session.metadata?.total_cents || "0");

      // Update Stripe Customer metadata
      if (customerId) {
        await stripe.customers.update(customerId, {
          metadata: {
            preorder_status: "deposit_paid",
            batch,
            remaining_cents: String(remainingCents),
            deposit_session_id: session.id,
          },
        });
      }

      // Insert into database (idempotent)
      const shippingAddress =
        session.collected_information?.shipping_details?.address ||
        session.customer_details?.address ||
        null;

      await sql`
        INSERT INTO preorders (
          stripe_session_id,
          stripe_customer_id,
          stripe_payment_intent,
          customer_email,
          customer_name,
          phone,
          batch,
          deposit_cents,
          remaining_cents,
          total_cents,
          deposit_status,
          remaining_status,
          shipping_address
        ) VALUES (
          ${session.id},
          ${customerId},
          ${(session.payment_intent as string) || null},
          ${session.customer_details?.email || ""},
          ${session.customer_details?.name || null},
          ${session.customer_details?.phone || null},
          ${batch},
          ${depositCents},
          ${remainingCents},
          ${totalCents},
          'paid',
          'pending',
          ${shippingAddress ? JSON.stringify(shippingAddress) : null}
        )
        ON CONFLICT (stripe_session_id) DO NOTHING
      `;

      break;
    }

    case "payment_intent.succeeded": {
      const intent = event.data.object;

      if (intent.metadata?.charge_type !== "remaining_balance") break;

      const customerId = intent.customer as string;
      const preorderId = intent.metadata?.preorder_id;

      // Update Stripe Customer metadata
      if (customerId) {
        await stripe.customers.update(customerId, {
          metadata: {
            preorder_status: "fully_paid",
          },
        });
      }

      // Update database
      if (preorderId) {
        await sql`
          UPDATE preorders
          SET remaining_status = 'charged', updated_at = NOW()
          WHERE id = ${parseInt(preorderId)}
        `;
      } else if (customerId) {
        await sql`
          UPDATE preorders
          SET remaining_status = 'charged', updated_at = NOW()
          WHERE stripe_customer_id = ${customerId}
            AND remaining_status = 'pending'
        `;
      }

      break;
    }

    case "payment_intent.payment_failed": {
      const intent = event.data.object;

      if (intent.metadata?.charge_type !== "remaining_balance") break;

      const preorderId = intent.metadata?.preorder_id;
      const customerId = intent.customer as string;

      if (preorderId) {
        await sql`
          UPDATE preorders
          SET remaining_status = 'failed', updated_at = NOW()
          WHERE id = ${parseInt(preorderId)}
        `;
      } else if (customerId) {
        await sql`
          UPDATE preorders
          SET remaining_status = 'failed', updated_at = NOW()
          WHERE stripe_customer_id = ${customerId}
            AND remaining_status = 'pending'
        `;
      }

      break;
    }
  }

  return new Response("OK", { status: 200 });
}
