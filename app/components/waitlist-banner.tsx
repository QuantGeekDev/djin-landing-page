"use client";

import { useState } from "react";

export default function WaitlistBanner() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-accent-warm/90 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        {!submitted ? (
          <>
            <span className="label text-white/90 tracking-[0.1em] text-[10px]">
              Get notified when Batch 3 opens
            </span>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white placeholder:text-white/50 text-xs focus:outline-none focus:ring-1 focus:ring-white/40 w-44 font-mono"
              />
              <button
                type="submit"
                className="px-4 py-1 rounded-full bg-white text-accent-warm font-medium text-xs hover:bg-white/90 transition"
              >
                Notify Me
              </button>
            </form>
          </>
        ) : (
          <span className="label text-white/90 tracking-[0.1em] text-[10px] flex items-center gap-2">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
            You&apos;re on the list
          </span>
        )}
      </div>
    </div>
  );
}
