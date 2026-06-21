import { formatDollars } from "@/lib/utils";

interface StatsBarProps {
  bookingsThisWeek: number;
  depositsCollected: number;
  noShowsPrevented: number;
}

export default function StatsBar({
  bookingsThisWeek,
  depositsCollected,
  noShowsPrevented,
}: StatsBarProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard label="Bookings this week" value={String(bookingsThisWeek)} />
      <StatCard label="Deposits collected" value={formatDollars(depositsCollected)} />
      <StatCard
        label="No-shows prevented*"
        value={String(noShowsPrevented)}
        footnote
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  footnote,
}: {
  label: string;
  value: string;
  footnote?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500 mt-1">
        {label}
        {footnote && <span className="text-slate-400">*</span>}
      </p>
    </div>
  );
}
