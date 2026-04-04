"use server";

import { redirect } from "next/navigation";
import { stripe } from "./stripe";

const BATCH_CONFIG: Record<
  string,
  { priceId: string; totalCents: number }
> = {
  batch_2: {
    priceId: process.env.STRIPE_BATCH2_DEPOSIT_PRICE_ID!,
    totalCents: 29900,
  },
  batch_3: {
    priceId: process.env.STRIPE_BATCH3_DEPOSIT_PRICE_ID!,
    totalCents: 34900,
  },
};

const DEPOSIT_CENTS = 4900;

export async function createPreorderCheckout(batch: string, source: string) {
  const config = BATCH_CONFIG[batch];
  if (!config) {
    throw new Error("Invalid batch");
  }

  const remainingCents = config.totalCents - DEPOSIT_CENTS;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jinn.ai";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: config.priceId, quantity: 1 }],
    payment_intent_data: {
      setup_future_usage: "off_session",
    },
    customer_creation: "always",
    billing_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: [
        "AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR",
        "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG",
        "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT",
        "BV", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CK",
        "CL", "CM", "CN", "CO", "CR", "CV", "CW", "CY", "CZ", "DE", "DJ",
        "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET",
        "FI", "FJ", "FK", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG",
        "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU",
        "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM",
        "IN", "IO", "IQ", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG",
        "KH", "KI", "KM", "KN", "KR", "KW", "KY", "KZ", "LA", "LB", "LC",
        "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD",
        "ME", "MF", "MG", "MK", "ML", "MM", "MN", "MO", "MQ", "MR", "MS",
        "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NG",
        "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF",
        "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PY", "QA",
        "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SE", "SG", "SH",
        "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV",
        "SX", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL",
        "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US",
        "UY", "UZ", "VA", "VC", "VE", "VG", "VN", "VU", "WF", "WS", "XK",
        "YE", "YT", "ZA", "ZM", "ZW",
      ],
    },
    phone_number_collection: { enabled: true },
    custom_text: {
      submit: {
        message:
          "This is a $49 deposit to reserve your Jinn HoloBox. The remaining balance will be charged when your device is ready to ship.",
      },
    },
    metadata: {
      batch,
      deposit_cents: String(DEPOSIT_CENTS),
      remaining_cents: String(remainingCents),
      total_cents: String(config.totalCents),
      product: "holobox",
      order_type: "preorder",
      source,
    },
    success_url: `${siteUrl}/preorder/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/preorder/cancel`,
  });

  redirect(session.url!);
}
