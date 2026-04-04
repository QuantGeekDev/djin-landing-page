CREATE TABLE IF NOT EXISTS preorders (
  id                    SERIAL PRIMARY KEY,
  stripe_session_id     TEXT UNIQUE NOT NULL,
  stripe_customer_id    TEXT NOT NULL,
  stripe_payment_intent TEXT,
  customer_email        TEXT NOT NULL,
  customer_name         TEXT,
  phone                 TEXT,
  batch                 TEXT NOT NULL,
  deposit_cents         INTEGER NOT NULL,
  remaining_cents       INTEGER NOT NULL,
  total_cents           INTEGER NOT NULL,
  deposit_status        TEXT NOT NULL DEFAULT 'paid',
  remaining_status      TEXT NOT NULL DEFAULT 'pending',
  shipping_address      JSONB,
  notes                 TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_preorders_batch ON preorders(batch);
CREATE INDEX IF NOT EXISTS idx_preorders_remaining_status ON preorders(remaining_status);
CREATE INDEX IF NOT EXISTS idx_preorders_customer_email ON preorders(customer_email);
CREATE INDEX IF NOT EXISTS idx_preorders_stripe_customer ON preorders(stripe_customer_id);
