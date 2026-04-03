# Analytics

Google Tag Manager (GTM) + Google Analytics 4 (GA4) with Consent Mode v2.

## Architecture

```
Cookie Consent Banner
  |
  v
GTM Consent Mode (default: denied)
  |
  v (user accepts)
GTM Container
  |
  +-- GA4 (page views, events)
  +-- Google Ads (remarketing, conversions) [future]
  +-- Any other tags added via GTM UI
```

All tag management happens in the GTM web UI -- no code deploys needed to add or modify tags.

## Key Files

| File | Purpose |
|------|---------|
| `app/lib/analytics.ts` | `trackEvent()` helper + `Window` type declarations |
| `app/components/cookie-consent.tsx` | GDPR/CCPA consent banner, controls consent mode |
| `app/layout.tsx` | GTM script injection (consent defaults + container) |
| `.env.example` | Template for `NEXT_PUBLIC_GTM_ID` |

## Setup

### 1. Create a GTM container

Go to [tagmanager.google.com](https://tagmanager.google.com), create a new container (type: Web), and copy the container ID (e.g. `GTM-XXXXXXX`).

### 2. Set the environment variable

```bash
# .env.local
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

The site works fine without this variable -- all GTM code is gated behind `GTM_ID` being truthy.

### 3. Configure GA4 in GTM

1. In GTM, go to **Tags > New**
2. Tag type: **Google Analytics: GA4 Configuration**
3. Enter your GA4 Measurement ID (e.g. `G-XXXXXXXXXX`)
4. Trigger: **All Pages**
5. Under **Advanced Settings > Consent Settings**, require `analytics_storage`
6. Save and publish

### 4. Create event triggers in GTM

For each custom event, create a **Custom Event** trigger:

| Event Name | Trigger Type | Fires When |
|------------|-------------|------------|
| `preorder_click` | Custom Event | User clicks any pre-order button |
| `waitlist_signup` | Custom Event | User submits the waitlist form |

Then create GA4 Event tags that fire on these triggers:

1. **Tags > New > Google Analytics: GA4 Event**
2. Event name: `preorder_click` (or `waitlist_signup`)
3. Under **Event Parameters**, add `location` (from `{{DLV - location}}` data layer variable)
4. Trigger: the custom event trigger you just created

### 5. Publish

Click **Submit** in GTM to publish your container. Events will start flowing to GA4 immediately (for users who accept cookies).

## Tracked Events

### `preorder_click`

Fired when a user clicks any pre-order CTA.

| Parameter | Type | Example | Description |
|-----------|------|---------|-------------|
| `location` | string | `"hero"`, `"nav"`, `"pricing"` | Which section the button lives in |
| `batch` | string | `"Batch 2"` | Only on batch tracker buttons |
| `price` | string | `"$299"` | Only on batch tracker buttons |

Tracked in these components:

- `hero.tsx` -- "Pre-Order -- $299" button
- `nav.tsx` -- "Pre-Order" button (desktop and mobile)
- `cta.tsx` -- "Pre-Order Now" button
- `faq.tsx` -- "Pre-Order for $299" button
- `kickstarter-tracker.tsx` -- "Pre-Order with Stripe" button (includes `batch` and `price`)
- `pricing.tsx` -- "Pre-Order for $299" button

### `waitlist_signup`

Fired when a user submits a waitlist/signup form.

| Parameter | Type | Example | Description |
|-----------|------|---------|-------------|
| `location` | string | `"banner"`, `"pricing"` | Which form was submitted |
| `tier` | string | `"Jinn Cloud"` | Only on pricing page waitlist |

Tracked in:

- `waitlist-banner.tsx` -- Top banner email form
- `pricing.tsx` -- "Join Waitlist" button (Jinn Cloud tier)

## Consent Mode

Consent Mode v2 is implemented to comply with GDPR and CCPA:

1. **Before user interaction:** All consent signals default to `denied` (set via `beforeInteractive` script in `layout.tsx`)
2. **GTM loads** but tags that require consent (GA4, Ads) do not fire
3. **User clicks Accept:** Consent is updated to `granted`, GTM re-evaluates and fires gated tags
4. **User clicks Decline:** Consent stays `denied`, cookie is set so the banner doesn't reappear
5. **Returning visitors:** Consent state is read from the `cookie_consent` cookie on page load

The consent cookie (`cookie_consent`) persists for 1 year.

### Consent categories

| Signal | Covers | Default |
|--------|--------|---------|
| `analytics_storage` | GA4, analytics tags | `denied` |
| `ad_storage` | Google Ads, remarketing | `denied` |
| `ad_user_data` | Sending user data to Google for ads | `denied` |
| `ad_personalization` | Remarketing, similar audiences | `denied` |

## Adding a New Event

1. Add a `trackEvent()` call in the component:

```tsx
import { trackEvent } from "@/app/lib/analytics";

// In your click handler:
trackEvent("your_event_name", { location: "section_name" });
```

2. In GTM, create a Custom Event trigger for `your_event_name`
3. Create a GA4 Event tag that fires on that trigger
4. Publish

No code deploy is needed for step 2-4.

## Adding New Tags (Facebook Pixel, LinkedIn, etc.)

This is the main advantage of GTM -- add any tag without touching code:

1. In GTM, go to **Tags > New**
2. Choose the tag type (Facebook Pixel, LinkedIn Insight, Hotjar, etc.)
3. Configure the tag with your account ID
4. Set consent requirements under **Advanced Settings > Consent Settings**
5. Choose a trigger (All Pages, specific events, etc.)
6. Publish

## Testing

1. In GTM, click **Preview** to enter debug mode
2. Open your site -- the GTM debugger panel will appear
3. Verify:
   - Consent defaults fire on page load
   - GA4 Configuration tag fires only after accepting cookies
   - Custom events appear when clicking CTAs
4. Use **GA4 DebugView** (Admin > DebugView) to verify events arrive in real-time

## Notes

- The waitlist banner form (`waitlist-banner.tsx`) tracks the signup event but does not persist emails to a backend. You need to add an API route or external service (Mailchimp, Loops, Resend, etc.) to capture the emails.
- The `NEXT_PUBLIC_GTM_ID` variable is inlined at build time (Next.js convention for `NEXT_PUBLIC_*` vars). Changing it requires a rebuild.
- GTM loads with `afterInteractive` strategy to avoid blocking first paint.
