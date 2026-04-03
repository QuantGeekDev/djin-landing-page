# Resume Prompt: Generate All Planned Blog Content

Copy and paste everything below the line into a new Claude Code session.

---

## Task

Generate all 26 PLANNED blog posts from `CONTENT_PLAN.md` for the Jinn HoloBox landing page at `/home/user/Documents/Coding/misc/jinn/site/`. Add them to the existing `posts` array in `app/blog/posts.ts`.

## Context

**Product:** Jinn HoloBox — a $299 (pre-order, $449 retail) AI smart display. 5-inch IPS touchscreen, quad-core ARM (RK3566), on-device wake word, runs Linux/Armbian, open source. Uses Home Assistant for smart home. Users bring their own LLM API keys (OpenAI, Anthropic, Google) or subscribe to Jinn Cloud ($9/mo). NOT a smart speaker — it's a full AI agent that reasons, plans, and takes multi-step actions.

**Competitor:** ClawStage — $399 MSRP cube-shaped AI companion, Raspberry Pi 5, 3.95" holographic display, OpenClaw framework, developer-focused. Kickstarter: 848 backers, $100K in 12 hours.

**Existing posts (5, already published):** what-is-an-ai-agent, jinn-holobox-vs-echo-show-vs-google-nest-hub, how-to-set-up-ai-smart-home, on-device-ai-vs-cloud-ai-privacy, best-ai-smart-displays-2026

**Blog data format:** Posts are defined as objects in the `posts` array in `app/blog/posts.ts`. Each post has: `slug`, `title`, `description`, `date` (use "2026-04-04" or stagger dates), `category` (one of: "AI Agents" | "Smart Home" | "Product" | "Engineering" | "Comparisons" | "Guides"), `tags` (string[]), `author` ("Jinn Team"), `readingTime`, `content` (markdown string with `##` headings, `|` tables, `- ` lists, `**bold**`, `*italic*`).

## Instructions

1. Read `CONTENT_PLAN.md` and `app/blog/posts.ts` to understand the full plan and data format.
2. Read one of the existing posts (e.g., the first one) to match the exact writing style, tone, and markdown formatting.
3. **Launch parallel agents** — one agent per cluster (4 agents total). Each agent writes ALL the posts for its cluster. Each agent should:
   - Research the web for current facts, statistics, pricing, and product details relevant to its cluster topics
   - Write each post as a complete `BlogPost` object matching the existing format
   - Follow these SEO/GEO rules for EVERY post:
     - First 50-70 words: direct answer to the main question (for AI Overview citation)
     - H2s in question format where possible
     - One statistic or data point per 150-200 words (with source mention in text)
     - Comparison tables (using `|` markdown) in comparison/guide posts
     - 1500-2500 words per cluster post, 3000+ for pillar posts
     - Natural mention of Jinn HoloBox where relevant (not forced)
     - Honest tone — acknowledge trade-offs, don't oversell
   - Return the complete BlogPost objects as valid TypeScript

4. **Agent assignments:**
   - **Agent 1 — Cluster 1 (AI Agents):** Write 6 posts (items 2-7 from the plan). Research current AI agent landscape, LLM capabilities, multi-agent patterns.
   - **Agent 2 — Cluster 2 (Smart Home):** Write 8 posts (items 1-8). Research Matter/Zigbee/Z-Wave specs, device prices, Home Assistant features, smart home market stats.
   - **Agent 3 — Cluster 3 (Comparisons):** Write 5 posts (items 2-6). Research ClawStage features/pricing, Echo Show specs, tablet vs display market, smart speaker capabilities.
   - **Agent 4 — Cluster 4 (Engineering):** Write 5 posts (items 1-5). Research RK3566 benchmarks, Linux vs Android IoT tradeoffs, wake word detection methods, hardware startup stories.

5. After all agents return, combine all 26 new posts with the existing 5 posts in `app/blog/posts.ts`. Update `CONTENT_PLAN.md` to mark all posts as PUBLISHED.

6. Update `app/sitemap.ts` if needed (it auto-generates from the posts array, so it should just work).

7. Run `npx next build` to verify everything compiles. Fix any issues.

8. Commit with message: "Add 26 blog posts across 4 content clusters for SEO/GEO" and push to main.

## Quality checklist (verify before committing)

- [ ] Every post has a unique slug, title, and description
- [ ] Every post has 4-6 tags matching target keywords
- [ ] Every post has accurate readingTime (estimate: 1 min per 250 words)
- [ ] No post mentions "no subscription" or "subscription-free" (Jinn has optional subscription)
- [ ] ClawStage comparison post is fair and factual (they use OpenClaw, Pi 5, 3.95" display, $399 MSRP)
- [ ] Dates are staggered across April 2026 (not all the same date)
- [ ] Content is markdown using `##`, `###`, `**bold**`, `- ` lists, `| table |` format
- [ ] Build passes with zero errors
