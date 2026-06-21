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

export default function DispatchBoard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Stats>({
    bookingsThisWeek: 0,
    depositsCollected: 0,
    noShowsPrevented: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Booking["status"] | "all">("all");

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
    // Poll every 30 seconds for live updates
    const interval = setInterval(fetchData, 30_000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleStatusChange = (id: string, status: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    // Refresh stats
    fetchData();
  };

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const FILTERS: { label: string; value: Booking["status"] | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Completed", value: "completed" },
    { label: "No-show", value: "no-show" },
    { label: "Cancelled", value: "cancelled" },
  ];

  return (
    <div className="space-y-6">
      <StatsBar
        bookingsThisWeek={stats.bookingsThisWeek}
        depositsCollected={stats.depositsCollected}
        noShowsPrevented={stats.noShowsPrevented}
      />

      <div>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Upcoming jobs</h2>
          <div className="flex gap-1 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                  filter === f.value
                    ? "bg-slate-900 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-36 rounded-xl border border-slate-100 bg-slate-50 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white py-16 text-center">
            <p className="text-slate-400 text-sm">No bookings yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((booking) => (
              <JobRow
                key={booking.id}
                booking={booking}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 text-center">
        *No-shows prevented estimated from industry averages — your real number tracks live once deposits are required.
        Updates every 30 seconds.
      </p>
    </div>
  );
}
