"use client";

import { getPreorders } from "@/app/lib/admin-actions";
import type { Preorder } from "@/app/lib/admin-actions";
import ChargeButton from "./charge-button";
import { useState, useTransition, useEffect } from "react";

interface OrderData {
  orders: Preorder[];
  totalCount: number;
  page: number;
  totalPages: number;
}

export default function OrderTable({
  initialData,
}: {
  initialData: OrderData;
}) {
  const [data, setData] = useState<OrderData>(initialData);
  const [batch, setBatch] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await getPreorders({
        batch: batch || undefined,
        status: status || undefined,
        search: search || undefined,
        page,
      });
      setData(result as OrderData);
    });
  }, [batch, status, search, page]);

  const statusBadge = (s: string) => {
    switch (s) {
      case "paid":
        return "text-green-400 bg-green-400/10";
      case "charged":
        return "text-green-400 bg-green-400/10";
      case "pending":
        return "text-yellow-400 bg-yellow-400/10";
      case "failed":
        return "text-red-400 bg-red-400/10";
      default:
        return "text-foreground-muted bg-surface-2";
    }
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={batch}
          onChange={(e) => { setBatch(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded-lg bg-surface border border-border text-[13px] text-foreground"
        >
          <option value="">All Batches</option>
          <option value="batch_2">Batch 2</option>
          <option value="batch_3">Batch 3</option>
        </select>

        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded-lg bg-surface border border-border text-[13px] text-foreground"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="charged">Charged</option>
          <option value="failed">Failed</option>
        </select>

        <input
          type="text"
          placeholder="Search by email or name..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded-lg bg-surface border border-border text-[13px] text-foreground min-w-[200px] focus:outline-none focus:border-accent-warm/50"
        />

        {isPending && (
          <span className="text-foreground-muted text-[12px] self-center">Loading...</span>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-foreground-muted font-medium">#</th>
              <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-foreground-muted font-medium">Customer</th>
              <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-foreground-muted font-medium">Batch</th>
              <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-foreground-muted font-medium">Deposit</th>
              <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-foreground-muted font-medium">Remaining</th>
              <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-foreground-muted font-medium">Date</th>
              <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-foreground-muted font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-foreground-muted">
                  No pre-orders yet
                </td>
              </tr>
            ) : (
              data.orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border/50 hover:bg-surface/50"
                >
                  <td className="px-4 py-3 text-foreground-muted">{order.id}</td>
                  <td className="px-4 py-3">
                    <div>{order.customer_name || "—"}</div>
                    <div className="text-[11px] text-foreground-muted">
                      {order.customer_email}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {order.batch.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] ${statusBadge(order.deposit_status)}`}
                    >
                      {order.deposit_status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] ${statusBadge(order.remaining_status)}`}
                    >
                      {order.remaining_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground-muted">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <ChargeButton
                        preorderId={order.id}
                        remainingCents={order.remaining_cents}
                        disabled={order.remaining_status !== "pending"}
                      />
                      <a
                        href={`https://dashboard.stripe.com/customers/${order.stripe_customer_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-foreground-muted hover:text-accent-warm transition-colors"
                      >
                        Stripe
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-[13px]">
          <span className="text-foreground-muted">
            Page {data.page} of {data.totalPages} ({data.totalCount} total)
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-md border border-border text-foreground-muted hover:text-foreground disabled:opacity-30"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
              disabled={page === data.totalPages}
              className="px-3 py-1.5 rounded-md border border-border text-foreground-muted hover:text-foreground disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
