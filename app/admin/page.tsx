import { getPreorderStats, getPreorders } from "@/app/lib/admin-actions";
import { logout } from "@/app/admin/login/actions";
import StatsCards from "./components/stats-cards";
import OrderTable from "./components/order-table";
import BatchActions from "./components/batch-actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [stats, initialOrders] = await Promise.all([
    getPreorderStats(),
    getPreorders({}),
  ]);

  // Build batch action data from stats
  const batchActionData = stats.batchStats.map((b) => {
    const batch = b.batch as string;
    const remainingPerUnit = batch === "batch_3" ? 30000 : 25000;
    const pendingCount = initialOrders.orders.filter(
      (o) => o.batch === batch && o.remaining_status === "pending"
    ).length;
    return { batch, pendingCount, remainingPerUnit };
  });

  return (
    <div className="min-h-screen p-6 sm:p-10 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="heading-lg text-2xl">Jinn Admin</h1>
        <form action={logout}>
          <button
            type="submit"
            className="text-[13px] text-muted hover:text-foreground transition-colors"
          >
            Logout
          </button>
        </form>
      </div>

      <StatsCards totals={stats.totals} batchStats={stats.batchStats} />

      <BatchActions batches={batchActionData} />

      <h2 className="text-[15px] font-normal mb-4">Pre-Orders</h2>
      <OrderTable initialData={initialOrders} />
    </div>
  );
}
