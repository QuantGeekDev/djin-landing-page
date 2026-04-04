@AGENTS.md

# Jinn HoloBox Landing Site

## Product
Jinn HoloBox — a $299 pre-order ($449 retail) AI smart display. 5-inch IPS touchscreen, quad-core ARM (RK3566), on-device wake word, runs Linux/Armbian, open source. Users bring their own LLM API keys or subscribe to Jinn Cloud ($9/mo).

## Stack
- **Framework:** Next.js 16.2.1, React 19, TypeScript
- **Styling:** Tailwind CSS 4 (`@theme inline`, no `tailwind.config.ts`), design tokens in `app/globals.css`
- **UI Primitives:** `app/components/ui/` — Section, SectionHeader, Button, CardGrid, BorderedContainer, Accordion (shadcn/Base UI)
- **Utilities:** `cn()` from `app/lib/cn.ts` (clsx + tailwind-merge), `class-variance-authority`
- **3D:** Three.js / React Three Fiber — Aurora, Orb, Particles (all `dynamic()` with `ssr: false`)
- **Payments:** Stripe (deposit + charge later model)
- **Database:** Neon Postgres via `@neondatabase/serverless`
- **Hosting:** Vercel (`djin-landing-page` project)
- **Domain:** https://get.jinn.today

## Pre-Order System

### Flow
1. Customer clicks any "Pre-Order" button → Server Function creates Stripe Checkout Session ($49 deposit)
2. Stripe saves card via `setup_future_usage: 'off_session'`
3. Customer completes payment on Stripe-hosted page
4. Stripe webhook → inserts row in `preorders` table + updates Stripe Customer metadata
5. Admin triggers "Charge Remaining" from `/admin` → creates off-session PaymentIntent for balance

### Key Files
- `app/lib/stripe.ts` — lazy-initialized Stripe SDK
- `app/lib/db.ts` — lazy-initialized Neon Postgres client
- `app/lib/checkout.ts` — `createPreorderCheckout()` Server Function
- `app/lib/admin-actions.ts` — admin queries + charge functions (all verify admin cookie)
- `app/api/webhooks/stripe/route.ts` — webhook handler (signature verification + DB writes)
- `app/components/preorder-button.tsx` — shared pre-order button with loading state
- `proxy.ts` — admin route protection (Next.js 16 uses `proxy.ts`, NOT `middleware.ts`)

### Database
Single `preorders` table in Neon Postgres. Schema in `app/lib/schema.sql`. Migration via `npm run db:migrate`.

### Admin Panel
- URL: `/admin` (password-protected via `proxy.ts` + `ADMIN_PASSWORD` env var)
- Stats cards, filterable order table, per-customer charge button, batch charge-all
- All queries hit Postgres directly (fast), not Stripe API

### Stripe Account
- Account: **Jinn** (acct_1QPt4vI7TmN4Rtiz)
- Product: `prod_UH1TNTdmBsfkcI`
- Batch 2 price: `price_1TITQmI7TmN4Rtizk5wcX4Wn` ($49)
- Batch 3 price: `price_1TITQnI7TmN4RtizRs5Epxsv` ($49)
- Webhook: `we_1TITQuI7TmN4Rtizf1fyKcF3` → `get.jinn.today/api/webhooks/stripe`
- Currently in **test mode**

### Environment Variables
All documented in `.env.example`. Required:
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_BATCH2_DEPOSIT_PRICE_ID`, `STRIPE_BATCH3_DEPOSIT_PRICE_ID`
- `DATABASE_URL` (Neon Postgres connection string)
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_SITE_URL`

## Design System

Full reference: `docs/design-system.md`

### Rules for adding/modifying sections
- Use UI primitives from `app/components/ui/` — do not duplicate their patterns with raw Tailwind classes
- Import from barrel: `import { Section, SectionHeader, Button, ButtonLink, CardGrid, CardGridItem, BorderedContainer } from "@/app/components/ui"`
- Use `cn()` from `app/lib/cn.ts` for conditional class merging
- Use design tokens (`rounded-container`, `rounded-card`, `transition-interactive`, `transition-emphasis`) instead of raw values (`rounded-2xl`, `transition-all duration-200`)
- `PreorderButton` is a Stripe checkout component — style it via `className` prop, not `<Button>`
- The Accordion (FAQ) comes from shadcn/Base UI — don't replace with hand-rolled implementation

### Token hierarchy
- **Colors:** 5-tier text hierarchy (`foreground` → `foreground-faint`), warm accent (`accent-warm`, `accent-warm-dim`)
- **Radius:** `rounded-container` (16px), `rounded-card` (12px), `rounded-button` (pill), `rounded-button-rect` (8px)
- **Transitions:** `transition-interactive` (200ms), `transition-emphasis` (300ms)
- **Spacing:** `.section-padding` class (applied automatically by `<Section>`)

### Key constraints
- Dark theme only — all colors designed for `#000` background
- Never use opacity modifiers on text (`text-foreground/50`) — use semantic tokens
- Text contrast must meet WCAG AA on `#000`
- shadcn bridge variables map our tokens to shadcn's expected names (see `globals.css`)

## Blog
- Posts defined as TypeScript objects in `app/blog/posts.ts` + `cluster*-posts.ts`
- Content plan in `CONTENT_PLAN.md`
- Blog pages auto-generate from the posts array

## Scripts
- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run db:migrate` — run Neon Postgres migration (`scripts/migrate.ts`)
