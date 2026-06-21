"use client";

import { useState, useEffect, useCallback } from "react";
import StatsBar from "./StatsBar";
import JobRow from "./JobRow";
import type { Booking } from "@/lib/types";

interface Stats {
  bookingsThisWeek: number;
  depositsCollected: number;
  noShowsPrevented: number;
}

type Filter = Booking["status"] | "all";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "No-show", value: "no-show" },
  { label: "Cancelled", value: "cancelled" },
];

export default function DispatchBoard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Stats>({ bookingsThisWeek: 0, depositsCollected: 0, noShowsPrevented: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/bookings");
      if (!res.ok) return;
      const data = await res.json();
      setBookings(data.bookings);
      setStats(data.stats);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30_000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleStatusChange = (id: string, status: Booking["status"]) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    fetchData();
  };

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <StatsBar
        bookingsThisWeek={stats.bookingsThisWeek}
        depositsCollected={stats.depositsCollected}
        noShowsPrevented={stats.noShowsPrevented}
      />

      {/* Jobs list */}
      <div>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-lg font-bold" style={{ color: "var(--text)" }}>Upcoming jobs</h2>
          <div className="flex gap-1.5 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
                style={
                  filter === f.value
                    ? { background: "var(--brand)", color: "#fff", border: "1.5px solid var(--brand)" }
                    : { background: "var(--surface)", color: "var(--text-muted)", border: "1.5px solid var(--border)" }
                }
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-40 rounded-2xl animate-pulse"
                style={{ background: "var(--surface)", border: "1.5px solid var(--border)" }}
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="rounded-2xl py-20 text-center"
            style={{ background: "var(--surface)", border: "1.5px solid var(--border)" }}
          >
            <p className="text-sm" style={{ color: "var(--text-light)" }}>No bookings yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((booking) => (
              <JobRow key={booking.id} booking={booking} onStatusChange={handleStatusChange} />
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-center" style={{ color: "var(--text-light)" }}>
        *No-shows prevented estimated from industry averages. Updates every 30 seconds.
      </p>
    </div>
  );
}
