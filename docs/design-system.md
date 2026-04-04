# Design System

This document defines the design tokens, typography, components, and guidelines used across the Jinn site. All values are defined in `app/globals.css` and consumed via Tailwind CSS v4's `@theme inline` system.

## Architecture

```
:root (CSS custom properties)
  --> @theme inline (maps to Tailwind utilities)
        --> @layer components (reusable multi-property classes)
              --> Component files (consume via class names)
```

Changing a token in `:root` updates every component that uses it. No per-file edits needed.

---

## Color Tokens

### Backgrounds

| Token | Value | Tailwind class | Use |
|---|---|---|---|
| `--background` | `#000000` | `bg-background` | Page background |
| `--surface` | `#0a0a0a` | `bg-surface` | Card/section backgrounds (e.g., FAQ items) |
| `--surface-2` | `#111111` | `bg-surface-2` | Deeper surface (e.g., progress bar tracks) |
| `--frost` | `rgba(255,255,255,0.04)` | `bg-frost` | Subtle frosted overlays |
| `--frost-strong` | `rgba(255,255,255,0.08)` | `bg-frost-strong` | Stronger frost |

### Text Colors (contrast hierarchy on `#000`)

| Token | Value | Contrast | Tailwind class | Use |
|---|---|---|---|---|
| `--foreground` | `#e8e4de` | ~15.3:1 | `text-foreground` | Headings, primary text, emphasized content |
| `--foreground-secondary` | `#b0aca6` | ~8.5:1 | `text-foreground-secondary` | Body copy, descriptions, paragraphs |
| `--foreground-tertiary` | `#858178` | ~5.0:1 | `text-foreground-tertiary` | Labels, captions, nav links, table headers |
| `--foreground-muted` | `#605c58` | ~3.1:1 | `text-foreground-muted` | Fine print, decorative-but-readable, disabled |
| `--foreground-faint` | `#3d3a37` | ~1.8:1 | `text-foreground-faint` | Copyright, purely decorative separators |

### Accent Colors

| Token | Value | Contrast | Tailwind class | Use |
|---|---|---|---|---|
| `--accent-warm` | `#ff6b35` | ~5.5:1 | `text-accent-warm` | CTA text, active badges, category labels |
| `--accent-warm-dim` | `#cc5a30` | ~4.0:1 | `text-accent-warm-dim` | Dimmed accent: step numbers, sub-labels |

### Borders

| Token | Value | Tailwind class | Use |
|---|---|---|---|
| `--border` | `rgba(255,255,255,0.08)` | `border-border` | Card borders, dividers, table rows |

---

## Typography

### Fonts

| Variable | Font | Weights | Use |
|---|---|---|---|
| `--font-sans` | Inter | 200, 300, 400, 500, 600 | All UI text |
| `--font-mono` | JetBrains Mono | 400 | Labels, code, data values |

### Heading Classes (defined in `globals.css`)

Apply these alongside Tailwind size utilities. They set weight, letter-spacing, and line-height only.

| Class | Weight | Letter-spacing | Line-height | Typical sizes |
|---|---|---|---|---|
| `.heading-xl` | 200 | -0.025em (mobile) / -0.035em (md+) | 1.05 / 1.0 | `text-[2.5rem]` to `text-[6.5rem]` |
| `.heading-lg` | 200 | -0.02em / -0.03em | 1.15 / 1.1 | `text-2xl` to `text-5xl` |
| `.heading-md` | 300 | -0.02em / -0.025em | 1.2 / 1.15 | `text-lg` to `text-2xl` |

**Example:**
```html
<h1 class="heading-xl text-[2.5rem] sm:text-5xl md:text-[5.5rem]">...</h1>
<h2 class="heading-lg text-2xl sm:text-3xl md:text-4xl">...</h2>
```

### Label Class

```css
.label  /* mono, 11px (12px sm+), uppercase, tracking 0.08em, weight 400 */
```

Used for section tags, meta labels, and small UI chrome. Pair with a text color:
```html
<div class="label text-foreground-tertiary">Section label</div>
<div class="label text-accent-warm">Active badge</div>
<div class="label text-foreground-muted">Fine print label</div>
```

### Body Text Class

```css
.body-lg  /* weight 300, line-height 1.7, letter-spacing -0.01em */
```

For hero subtitles and large descriptive text. Pair with size and color:
```html
<p class="body-lg text-foreground-secondary text-base sm:text-lg">...</p>
```

### Component Typography Classes (`@layer components`)

These bundle size + color + weight + line-height. Tailwind utilities can override any property.

| Class | Size | Color | Weight | Use |
|---|---|---|---|---|
| `.text-body` | `text-sm` (14px) | `foreground-secondary` | 400 | Standard body copy |
| `.text-body-lg` | `text-base` / `sm:text-lg` | `foreground-secondary` | 400 | Large body copy |
| `.text-caption` | `text-xs` (12px) | `foreground-tertiary` | inherit | Captions, small labels |
| `.text-fine` | `text-xs` (12px) | `foreground-muted` | inherit | Fine print, disclaimers |

**Example:**
```html
<p class="text-body">Feature description goes here.</p>
<p class="text-body-lg">Hero subtitle with more detail.</p>
<span class="text-caption">Table header or caption</span>
<span class="text-fine">Specifications may vary</span>
```

**Overriding:** Since these are `@layer components`, any Tailwind utility wins:
```html
<p class="text-body text-foreground">Override color to primary</p>
<p class="text-body font-medium">Override weight to medium</p>
```

---

## Visual Components

### Frost Glass

Two levels of frosted glass for floating UI (nav, modals, banners):

| Class | Background | Blur | Border | Use |
|---|---|---|---|---|
| `.frost` | `rgba(10,10,10,0.7)` | 40px | 1px `--border` | Nav bar, mobile menu, cookie consent |
| `.frost-light` | `rgba(255,255,255,0.03)` | 40px | none | Chat bubbles in device mockup |

### Warm Glow

```css
.glow-warm  /* subtle orange box-shadow */
```

Used sparingly on the device mockup. Do not apply to cards or sections.

### Gradient Text

```css
.gradient-text  /* cream-to-orange gradient fill */
```

Used only on the hero "lives in your home" span. Do not use elsewhere.

### Divider

```css
.divider  /* 1px height, --border color */
```

A subtle horizontal rule. Use with max-width for centered dividers:
```html
<div class="divider max-w-24 mx-auto my-16" />
```

### Animations

| Class | Effect | Duration | Use |
|---|---|---|---|
| `.animate-pulse-soft` | Opacity 1 -> 0.5 -> 1 | 2s infinite | Status dots ("Now accepting pre-orders") |
| `.animate-fade-up` | Fade in + slide up 16px | 0.5s once | Entry animations (cookie consent) |

---

## Layout Patterns

### Section Spacing

Every major section follows this pattern:
```html
<section class="py-20 sm:py-32 md:py-40 px-5 sm:px-6">
  <div class="max-w-5xl mx-auto">
    <!-- content -->
  </div>
</section>
```

Common max-widths: `max-w-5xl` (default), `max-w-4xl` (comparison, pricing), `max-w-3xl` (specs, kickstarter), `max-w-2xl` (FAQ).

### Section Header Pattern

Every section starts with a label + heading, optionally followed by a subtitle:
```html
<div class="label text-foreground-tertiary text-center mb-4 sm:mb-6">Section label</div>
<h2 class="heading-lg text-2xl sm:text-3xl md:text-4xl text-center mb-4 sm:mb-6">
  Section heading
</h2>
<p class="text-center text-foreground-secondary text-[14px] sm:text-[15px] mb-12 sm:mb-20">
  Optional subtitle or description.
</p>
```

### Grid Card Pattern

Features, testimonials, and use cases use a gap-px grid with border wrapper:
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
  <div class="bg-background p-5 sm:p-6 md:p-8">
    <!-- card content -->
  </div>
</div>
```

The `gap-px bg-border` trick creates 1px dividers between cards without extra markup.

### Batch / Pricing Card Pattern

Cards with conditional styling based on state:
```html
<div class={`rounded-xl border p-5 ${
  isActive ? "border-accent-warm/30 bg-accent-warm/[0.03]" : "border-border"
}`}>
```

---

## Guidelines

### Contrast Rules

All text must meet WCAG AA contrast requirements on `#000`:

| Text type | Minimum ratio | Allowed tokens |
|---|---|---|
| Body copy (< 18px) | 4.5:1 | `foreground`, `foreground-secondary` |
| Large text (>= 18px bold or >= 24px) | 3:1 | Above + `foreground-tertiary` |
| Labels/captions (11-13px) | 4.5:1 | `foreground-secondary`, `foreground-tertiary` |
| Fine print (non-essential) | 3:1 | `foreground-muted` |
| Decorative only (copyright, dots) | none | `foreground-faint` |

### Do NOT Use Opacity Modifiers on Text

```html
<!-- BAD: opacity creates unpredictable contrast -->
<p class="text-foreground/50">...</p>
<p class="text-accent-warm/40">...</p>

<!-- GOOD: use semantic tokens with known contrast -->
<p class="text-foreground-tertiary">...</p>
<p class="text-accent-warm-dim">...</p>
```

Opacity modifiers (`/30`, `/50`, etc.) are acceptable on **backgrounds and borders** for translucency effects (e.g., `bg-accent-warm/[0.03]`, `border-accent-warm/30`). Never use them on `text-*` classes.

### Minimum Text Sizes

| Context | Minimum size | Notes |
|---|---|---|
| Body copy | 14px (`text-sm`) | Use `font-normal` (400) weight |
| Labels (`.label`) | 11px (12px sm+) | Mono font + uppercase compensates |
| Spec values, metadata | 13px | Mono font at `font-normal` |
| Nothing should be | < 11px | No `text-[9px]` or `text-[10px]` |

### Font Weight Rules

| Size range | Minimum weight | Notes |
|---|---|---|
| < 14px | 400 (`font-normal`) | Thin text at small sizes disappears on dark backgrounds |
| 14-17px | 300 (`font-light`) OK | But prefer 400 for body copy |
| >= 18px | 200 (`font-extralight`) OK | Headings only |

### Accent Usage

- `text-accent-warm` (#ff6b35) -- CTA text, active state badges, category labels. Use full strength.
- `text-accent-warm-dim` (#cc5a30) -- Step numbers, sub-labels, decorative bullets. Use for secondary accent.
- `bg-accent-warm` -- Only on the waitlist banner and CTA buttons (on hover).
- `bg-accent-warm/[0.03]` -- Subtle tinted card backgrounds for highlighted items (pricing, Jinn row).

### Adding New Components

When creating a new section or component:

1. Use `<Section>` for the wrapper -- it handles padding and max-width
2. Use `<SectionHeader>` for the label + heading + optional subtitle pattern
3. Use `<Button>` or `<ButtonLink>` for CTAs -- choose `variant` and `shape`
4. Use `<CardGrid>` for bordered card grids with the `gap-px` divider trick
5. Use `<BorderedContainer>` for bordered containers with optional row dividers
6. Pick text colors from the **5-tier hierarchy** -- don't invent new grays
7. Use `text-body` or `text-body-lg` for descriptive copy instead of assembling classes
8. Use `label` class for small uppercase chrome text
9. Test contrast on `#000` before shipping

---

## UI Components

Reusable UI primitives live in `app/components/ui/`. Import from the barrel:
```tsx
import { Section, SectionHeader, Button, ButtonLink, CardGrid, CardGridItem, BorderedContainer } from "@/app/components/ui";
```

### Section

Wraps a `<section>` with consistent padding (`section-padding` class) and a max-width inner container.

```tsx
<Section id="features" maxWidth="5xl">
  {/* content */}
</Section>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string?` | — | Scroll anchor ID |
| `maxWidth` | `"xl" \| "2xl" \| "3xl" \| "4xl" \| "5xl" \| "6xl"` | `"5xl"` | Inner container max-width |
| `className` | `string?` | — | Additional classes on `<section>` |

**Not for:** Hero (custom layout), Footer (unique padding), Nav (fixed positioning), blog pages (different padding pattern).

### SectionHeader

Renders the standard label + heading + optional subtitle cluster. Automatically sets bottom margin on the last element (`mb-12 sm:mb-20`).

```tsx
<SectionHeader
  label="Capabilities"
  heading="One device. Everything handled."
  subtitle="Optional description text."
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Uppercase mono label text |
| `heading` | `ReactNode` | — | Heading content (supports JSX for `<br/>`, `<span>`) |
| `subtitle` | `string?` | — | Optional subtitle paragraph |
| `labelClassName` | `string?` | — | Override label classes |
| `headingClassName` | `string?` | — | Override heading classes (e.g., `"md:text-5xl"`) |

### Button / ButtonLink

Two-axis variant system: `variant` (primary/secondary) x `shape` (pill/rect).

```tsx
<Button variant="primary" shape="pill">Click me</Button>
<ButtonLink href="#pricing" variant="secondary" shape="rect" fullWidth>Learn more</ButtonLink>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "secondary"` | `"primary"` | Color scheme |
| `shape` | `"pill" \| "rect"` | `"pill"` | Border radius style |
| `fullWidth` | `boolean` | `false` | Full-width (`w-full`) |
| `className` | `string?` | — | Override/extend styles |

- `Button` renders a `<button>` element
- `ButtonLink` renders an `<a>` element (use for navigation CTAs)
- For `PreorderButton` (Stripe checkout), pass styles via its `className` prop directly

### CardGrid / CardGridItem

Grid with 1px borders between cards using the `gap-px bg-border` trick.

```tsx
<CardGrid columns={4}>
  <CardGridItem className="group">Card content</CardGridItem>
</CardGrid>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `2 \| 3 \| 4` | `3` | Column count at largest breakpoint |

### BorderedContainer

Rounded bordered container, optionally with `space-y-px` row dividers.

```tsx
<BorderedContainer divided>
  <div className="bg-surface">Row 1</div>
  <div className="bg-surface">Row 2</div>
</BorderedContainer>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `divided` | `boolean` | `false` | Add `space-y-px` for row dividers |

### Accordion (shadcn/Base UI)

Accessible accordion with smooth height animation, keyboard navigation, and ARIA attributes. Used in the FAQ section.

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/app/components/ui/accordion";

<Accordion>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question</AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
</Accordion>
```

Styled to match the site aesthetic: `+` icon that rotates 45deg, `bg-surface` items, `space-y-px` dividers.

---

## Extended Design Tokens

### Radius Tokens

| Token | Value | Tailwind utility | Use |
|---|---|---|---|
| `--radius-container` | `1rem` (16px) | `rounded-container` | Section containers, card grids, modals |
| `--radius-card` | `0.75rem` (12px) | `rounded-card` | Individual cards (batch cards, comparison) |
| `--radius-button` | `9999px` | `rounded-button` | Pill buttons, nav bar |
| `--radius-button-rect` | `0.5rem` (8px) | `rounded-button-rect` | Rectangular buttons (pricing, cookie) |

### Duration Tokens

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | `150ms` | Subtle color changes |
| `--duration-normal` | `200ms` | Interactive elements |
| `--duration-slow` | `300ms` | Emphasis transitions |

### Transition Utilities

| Utility | Properties | Duration | Use |
|---|---|---|---|
| `transition-interactive` | color, bg, border, opacity, transform | 200ms | Buttons, links, interactive elements |
| `transition-emphasis` | all | 300ms | Hero CTAs, prominent animations |

### Section Spacing

```css
.section-padding  /* py-20 sm:py-32 md:py-40 px-5 sm:px-6 */
```

Applied automatically by `<Section>`. Override via `className` for exceptions (e.g., CTA section uses `md:py-48`).

### shadcn Bridge Variables

The site maps its existing tokens to shadcn's expected variable names for compatibility:

| shadcn variable | Maps to |
|---|---|
| `--primary` | `var(--accent-warm)` |
| `--muted` | `var(--surface)` |
| `--card` | `var(--surface)` |
| `--ring` | `var(--accent-warm)` |

These are defined in `:root` and registered in `@theme inline`. Only the Accordion component currently uses them.

---

### Utility: cn()

Class merging utility (clsx + tailwind-merge). Used by all UI components for className composition:

```tsx
import { cn } from "@/app/lib/cn";
cn("text-sm font-bold", condition && "text-red-500", className)
```

### File Organization

```
app/
  globals.css          -- All tokens, typography, component classes, and utilities
  layout.tsx           -- Font loading (Inter, JetBrains Mono), metadata
  page.tsx             -- Landing page composition
  lib/
    cn.ts              -- Class merging utility (clsx + tailwind-merge)
    analytics.ts       -- Event tracking
  components/
    ui/                -- Reusable UI primitives
      index.ts         -- Barrel export
      section.tsx      -- Section wrapper
      section-header.tsx -- Label + heading + subtitle
      button.tsx       -- Button + ButtonLink
      card-grid.tsx    -- CardGrid + CardGridItem
      bordered-container.tsx -- Bordered wrapper
      accordion.tsx    -- Accessible accordion (shadcn/Base UI)
    hero.tsx           -- Hero with Aurora + Orb
    problem-solution.tsx
    comparison.tsx     -- Feature comparison table
    features.tsx       -- Capability grid
    how-it-works.tsx   -- 4-step process
    testimonials.tsx   -- Quote grid
    use-cases.tsx      -- Use case grid
    specs.tsx          -- Hardware spec table
    pricing.tsx        -- Pricing tiers
    kickstarter-tracker.tsx  -- Campaign progress + batch cards
    faq.tsx            -- Accordion FAQ (uses shadcn Accordion)
    cta.tsx            -- Final CTA with particles
    nav.tsx            -- Floating frost nav bar
    footer.tsx         -- Footer with link columns
    waitlist-banner.tsx -- Top banner (different context: white-on-orange)
    cookie-consent.tsx  -- GDPR consent banner
    aurora.tsx / orb.tsx / particles.tsx  -- Canvas animations
  blog/
    page.tsx           -- Blog index
    [slug]/page.tsx    -- Blog post renderer with inline markdown
    posts.ts           -- Blog post content data
```
