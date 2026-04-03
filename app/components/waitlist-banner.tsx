"use client";

import { useState } from "react";
import { trackEvent } from "@/app/lib/analytics";

export default function WaitlistBanner() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    trackEvent("waitlist_signup", { location: "banner" });
    setSubmitted(true);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-accent-warm/90 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-center gap-2 sm:gap-3">
        {!submitted ? (
          <>
            <span className="label text-white/90 tracking-[0.1em] hidden sm:inline">
              Get notified when Batch 3 opens
            </span>
            <span className="label text-white/90 tracking-[0.1em] sm:hidden">
              Batch 3 waitlist
            </span>
            <form onSubmit={handleSubmit} className="flex gap-1.5 sm:gap-2 flex-1 sm:flex-none max-w-[220px] sm:max-w-none">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white placeholder:text-white/50 text-xs focus:outline-none focus:ring-1 focus:ring-white/40 min-w-0 flex-1 sm:w-40 font-mono"
              />
              <button
                type="submit"
                className="px-3 sm:px-4 py-1.5 rounded-full bg-white text-accent-warm font-medium text-xs hover:bg-white/90 transition shrink-0"
              >
                Notify Me
              </button>
            </form>
          </>
        ) : (
          <span className="label text-white/90 tracking-[0.1em] flex items-center gap-2">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
            You&apos;re on the list
          </span>
        )}
      </div>
    </div>
  );
}
