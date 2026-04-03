"use client";

import { useState } from "react";

const faqs = [
  { q: "What is Jinn?", a: "An AI agent inside the HoloBox \u2014 a smart display for your counter, desk, or nightstand. It listens for your voice, manages your day, controls your smart home, and connects to your apps." },
  { q: "How much does it cost?", a: "The HoloBox device is $299 \u2014 that\u2019s yours to keep forever. Plans start at $9/mo, which covers the AI runtime and updates. Cancel anytime \u2014 the hardware is still yours and continues to work." },
  { q: "How is this different from a smart speaker?", a: "Smart speakers run pre-built skills. Jinn is a full AI agent \u2014 it reasons, chains actions, remembers context, drafts emails, browses the web, and controls your home in one conversation. And it\u2019s open source." },
  { q: "Why not a chatbot app?", a: "Chatbot apps are text boxes on your phone. Jinn is a physical device with real-time voice that takes real actions \u2014 sends messages, updates calendars, controls lights. No screen time required." },
  { q: "Why hardware instead of cloud-only?", a: "Cloud-only AI costs $20\u201380/month for a chatbot that could disappear tomorrow. With Jinn, you own the hardware. After a few months, the total cost is lower than any cloud subscription \u2014 and your data stays local." },
  { q: "Is my data private?", a: "Yes. Runs on your local network. Wake word detection is on-device. Only data sent to your chosen LLM provider leaves your home. You control exactly what goes where." },
  { q: "Can I customize it?", a: "Fully. Open-source agent core. Write plugins, swap LLM providers, add MCP tools, modify the system prompt. If you can code, no limits. If you can\u2019t, defaults work great." },
  { q: "What LLMs are supported?", a: "OpenAI, Anthropic, Google out of the box. Any OpenAI-compatible API works, including local models via Ollama." },
  { q: "What happens if I cancel my plan?", a: "The device is still yours. Core functionality continues to work on your local network. The plan covers cloud-powered AI features and ongoing updates \u2014 without it, the device runs in local-only mode." },
  { q: "What if I don\u2019t like it?", a: "60-day money-back guarantee. Full refund, we cover return shipping. No questions asked." },
  { q: "When does it ship?", a: "Summer 2026. Pre-orders ship first. Full refund if we don\u2019t deliver." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 sm:py-32 md:py-40 px-5 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="label text-muted text-center mb-4 sm:mb-6">FAQ</div>
        <h2 className="heading-lg text-2xl sm:text-3xl md:text-4xl text-center mb-12 sm:mb-20">
          Still deciding? Read this.
        </h2>

        <div className="space-y-px rounded-2xl overflow-hidden border border-border">
          {faqs.map((f, i) => (
            <div key={i} className="bg-surface">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left group"
              >
                <span className="text-[14px] font-light group-hover:text-accent-warm transition-colors duration-200">{f.q}</span>
                <svg
                  className={`w-3.5 h-3.5 text-muted/30 flex-shrink-0 ml-4 transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-[13px] text-muted leading-relaxed font-light">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10 sm:mt-12">
          <a
            href="#preorder"
            className="px-8 py-3 rounded-full bg-foreground text-background font-medium text-[13px] hover:bg-accent-warm hover:text-white transition-all duration-200"
          >
            Pre-Order for $299
          </a>
        </div>
      </div>
    </section>
  );
}
