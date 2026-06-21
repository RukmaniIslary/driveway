interface StatsBarProps {
  bookingsThisWeek: number;
  depositsCollected: number;
  noShowsPrevented: number;
}

export default function StatsBar({ bookingsThisWeek, depositsCollected, noShowsPrevented }: StatsBarProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard label="Bookings this week" value={String(bookingsThisWeek)} />
      <StatCard label="Deposits collected" value={`$${depositsCollected}`} />
      <StatCard label="No-shows prevented" value={String(noShowsPrevented)} footnote />
    </div>
  );
}

function StatCard({ label, value, footnote }: { label: string; value: string; footnote?: boolean }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "var(--surface)", border: "1.5px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
    >
      <p className="text-3xl font-bold" style={{ color: "var(--brand)" }}>{value}</p>
      <p className="text-xs mt-1.5 leading-tight" style={{ color: "var(--text-muted)" }}>
        {label}{footnote && <span style={{ color: "var(--text-light)" }}>*</span>}
      </p>
    </div>
  );
}
