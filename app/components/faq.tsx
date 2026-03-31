"use client";

import { useState } from "react";

const faqs = [
  { q: "What is Djin?", a: "An AI agent inside the HoloBox \u2014 a smart display for your counter, desk, or nightstand. It listens for your voice, manages your day, controls your smart home, and connects to your apps." },
  { q: "Do I need a subscription?", a: "No. Bring your own LLM API key (OpenAI, Anthropic, etc.) and pay only for usage \u2014 typically a few dollars/month. The optional Djin Cloud ($9/mo) adds remote access." },
  { q: "How is this different from a smart speaker?", a: "Smart speakers run pre-built skills. Djin is a full AI agent \u2014 it reasons, chains actions, remembers context, drafts emails, browses the web, and controls your home in one conversation. Open source." },
  { q: "Why not a chatbot app?", a: "Chatbot apps are text boxes on your phone. Djin is a physical device with real-time voice that takes real actions \u2014 sends messages, updates calendars, controls lights. No screen time required." },
  { q: "Why hardware instead of cloud hosting?", a: "Cloud AI costs $20\u201380/month \u2014 $240\u2013960/year. Djin is $299 once. After a few months you\u2019ve saved money, plus your data stays local and there\u2019s no vendor lock-in." },
  { q: "Is my data private?", a: "Yes. Runs on your local network. Wake word detection is on-device via NPU. Only data sent to your chosen LLM provider leaves your home." },
  { q: "Can I customize it?", a: "Fully. Open-source agent core. Write plugins, swap LLM providers, add MCP tools, modify the system prompt. If you can code, no limits. If you can\u2019t, defaults work great." },
  { q: "What LLMs are supported?", a: "OpenAI, Anthropic, Google out of the box. Any OpenAI-compatible API works, including local models via Ollama." },
  { q: "When does it ship?", a: "Summer 2026. Pre-orders ship first. Full refund if we don\u2019t deliver." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 sm:py-32 md:py-40 px-5 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="label text-muted text-center mb-4 sm:mb-6">FAQ</div>
        <h2 className="heading-lg text-2xl sm:text-3xl md:text-4xl text-center mb-12 sm:mb-20">
          Questions
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
      </div>
    </section>
  );
}
