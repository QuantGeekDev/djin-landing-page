"use server";

import { cookies } from "next/headers";
import { stripe } from "./stripe";
import { sql } from "./db";

export interface PreorderTotals {
  total_orders: number;
  total_deposits: number;
  pending_remaining: number;
  fully_paid: number;
  failed_charges: number;
}

export interface BatchStat {
  batch: string;
  count: number;
  deposits: number;
}

export interface Preorder {
  id: number;
  stripe_session_id: string;
  stripe_customer_id: string;
  stripe_payment_intent: string | null;
  customer_email: string;
  customer_name: string | null;
  phone: string | null;
  batch: string;
  deposit_cents: number;
  remaining_cents: number;
  total_cents: number;
  deposit_status: string;
  remaining_status: string;
  shipping_address: Record<string, string> | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

async function verifyAdmin() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth");
  if (auth?.value !== process.env.ADMIN_PASSWORD) {
    throw new Error("Unauthorized");
  }
}

// --- Query functions ---

export async function getPreorderStats(): Promise<{
  totals: PreorderTotals;
  batchStats: BatchStat[];
}> {
  await verifyAdmin();

  const [totals] = await sql`
    SELECT
      COUNT(*)::int as total_orders,
      COALESCE(SUM(deposit_cents), 0)::int as total_deposits,
      COUNT(*) FILTER (WHERE remaining_status = 'pending')::int as pending_remaining,
      COUNT(*) FILTER (WHERE remaining_status = 'charged')::int as fully_paid,
      COUNT(*) FILTER (WHERE remaining_status = 'failed')::int as failed_charges
    FROM preorders
  `;

  const batchStats = await sql`
    SELECT batch, COUNT(*)::int as count, COALESCE(SUM(deposit_cents), 0)::int as deposits
    FROM preorders GROUP BY batch ORDER BY batch
  `;

  return {
    totals: totals as unknown as PreorderTotals,
    batchStats: batchStats as unknown as BatchStat[],
  };
}

export async function getPreorders(filters: {
  batch?: string;
  status?: string;
  search?: string;
  page?: number;
}): Promise<{
  orders: Preorder[];
  totalCount: number;
  page: number;
  totalPages: number;
}> {
  await verifyAdmin();

  const { batch, status, search, page = 1 } = filters;
  const limit = 50;
  const offset = (page - 1) * limit;

  const orders = await sql`
    SELECT * FROM preorders
    WHERE (${batch ?? null}::text IS NULL OR batch = ${batch ?? null})
      AND (${status ?? null}::text IS NULL OR remaining_status = ${status ?? null})
      AND (${search ?? null}::text IS NULL OR customer_email ILIKE '%' || ${search ?? null} || '%' OR customer_name ILIKE '%' || ${search ?? null} || '%')
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  const [{ count }] = await sql`
    SELECT COUNT(*)::int as count FROM preorders
    WHERE (${batch ?? null}::text IS NULL OR batch = ${batch ?? null})
      AND (${status ?? null}::text IS NULL OR remaining_status = ${status ?? null})
      AND (${search ?? null}::text IS NULL OR customer_email ILIKE '%' || ${search ?? null} || '%' OR customer_name ILIKE '%' || ${search ?? null} || '%')
  `;

  return {
    orders: orders as unknown as Preorder[],
    totalCount: count as number,
    page,
    totalPages: Math.ceil((count as number) / limit),
  };
}

// --- Charge functions ---

export async function chargeRemainingBalance(preorderId: number) {
  await verifyAdmin();

  const [order] = await sql`
    SELECT * FROM preorders WHERE id = ${preorderId}
  `;

  if (!order) {
    return { error: "Order not found" };
  }

  if (order.remaining_status !== "pending") {
    return { error: `Order already ${order.remaining_status}` };
  }

  // Get saved payment methods
  const paymentMethods = await stripe.paymentMethods.list({
    customer: order.stripe_customer_id,
    type: "card",
    limit: 1,
  });

  if (paymentMethods.data.length === 0) {
    return { error: "No payment method on file" };
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.remaining_cents,
      currency: "usd",
      customer: order.stripe_customer_id,
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
      metadata: {
        charge_type: "remaining_balance",
        batch: order.batch,
        preorder_id: String(order.id),
        product: "holobox",
      },
    });

    return { status: paymentIntent.status };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Charge failed";
    return { error: message };
  }
}

export async function chargeEntireBatch(batch: string) {
  await verifyAdmin();

  const orders = await sql`
    SELECT id FROM preorders
    WHERE batch = ${batch} AND remaining_status = 'pending'
  `;

  if (orders.length === 0) {
    return { total: 0, succeeded: 0, failed: 0, errors: [] as string[] };
  }

  const results = await Promise.allSettled(
    orders.map((order) => chargeRemainingBalance(order.id))
  );

  const errors: string[] = [];
  let succeeded = 0;
  let failed = 0;

  for (const result of results) {
    if (result.status === "fulfilled" && !result.value.error) {
      succeeded++;
    } else {
      failed++;
      if (result.status === "fulfilled" && result.value.error) {
        errors.push(result.value.error);
      } else if (result.status === "rejected") {
        errors.push(String(result.reason));
      }
    }
  }

  return { total: orders.length, succeeded, failed, errors };
}
