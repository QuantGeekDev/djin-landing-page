"use client";

import { login } from "./actions";
import { useState } from "react";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <h1 className="heading-lg text-2xl text-center mb-8">Jinn Admin</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-[13px] text-muted mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground text-[14px] focus:outline-none focus:border-accent-warm/50 transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-[13px]">{error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full py-3 rounded-lg bg-foreground text-background text-[14px] font-medium hover:bg-accent-warm hover:text-white transition-all duration-200 disabled:opacity-50"
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
