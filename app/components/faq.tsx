"use client";

import { trackEvent } from "@/app/lib/analytics";
import { Section, SectionHeader, ButtonLink } from "@/app/components/ui";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/accordion";

const faqs = [
  { q: "What is Jinn?", a: "An AI agent inside the HoloBox \u2014 a smart display for your counter, desk, or nightstand. It listens for your voice, manages your day, controls your smart home, and connects to your apps." },
  { q: "How much does it cost?", a: "The HoloBox retails for $449, but early backers get it for $299 \u2014 a $150 discount. The device is yours to keep forever. You can bring your own LLM API keys (OpenAI, Anthropic, etc.) or subscribe to Jinn Cloud ($9/mo) and we handle everything." },
  { q: "How is this different from a smart speaker?", a: "Smart speakers run pre-built skills. Jinn is a full AI agent \u2014 it reasons, chains actions, remembers context, drafts emails, browses the web, and controls your home in one conversation. And it\u2019s open source." },
  { q: "Why not a chatbot app?", a: "Chatbot apps are text boxes on your phone. Jinn is a physical device with real-time voice that takes real actions \u2014 sends messages, updates calendars, controls lights. No screen time required." },
  { q: "Why hardware instead of cloud-only?", a: "Cloud-only AI costs $20\u201380/month for a chatbot that could disappear tomorrow. With Jinn, you own the hardware. Your data stays local on your network, and you\u2019re never locked into a single AI provider." },
  { q: "Is my data private?", a: "Yes. Runs on your local network. Wake word detection is on-device. Only data sent to your chosen LLM provider leaves your home. You control exactly what goes where." },
  { q: "Can I customize it?", a: "Fully. Open-source agent core. Write plugins, swap LLM providers, add MCP tools, modify the system prompt. If you can code, no limits. If you can\u2019t, defaults work great." },
  { q: "What LLMs are supported?", a: "OpenAI, Anthropic, Google out of the box. Any OpenAI-compatible API works, including local models via Ollama." },
  { q: "Do I need Jinn Cloud?", a: "No. If you have your own LLM API keys (OpenAI, Anthropic, Google, etc.), you can use them directly \u2014 no subscription needed. Jinn Cloud ($9/mo) is for people who want a managed experience without dealing with API keys." },
  { q: "What if I don\u2019t like it?", a: "60-day money-back guarantee. Full refund, we cover return shipping. No questions asked." },
  { q: "When does it ship?", a: "Summer 2026. Pre-orders ship first. Full refund if we don\u2019t deliver." },
];

export default function FAQ() {
  return (
    <Section id="faq" maxWidth="2xl">
      <SectionHeader
        label="FAQ"
        heading="Still deciding? Read this."
      />

      <Accordion>
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{f.q}</AccordionTrigger>
            <AccordionContent>{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex justify-center mt-10 sm:mt-12">
        <ButtonLink
          href="#preorder"
          onClick={() => trackEvent("preorder_click", { location: "faq" })}
          className="py-3 text-[13px]"
        >
          Pre-Order for $299 &mdash; Save $150
        </ButtonLink>
      </div>
    </Section>
  );
}
