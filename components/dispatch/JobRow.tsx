"use client";

import { useState } from "react";
import { formatDate, formatTime } from "@/lib/utils";
import type { Booking } from "@/lib/types";

const STATUS: Record<Booking["status"], { bg: string; text: string; label: string }> = {
  confirmed:  { bg: "#eff6ff", text: "#2563eb", label: "Confirmed" },
  completed:  { bg: "#f0fdf4", text: "#16a34a", label: "Completed" },
  "no-show":  { bg: "#fef2f2", text: "#dc2626", label: "No-show" },
  cancelled:  { bg: "#f8fafc", text: "#94a3b8", label: "Cancelled" },
};

interface JobRowProps {
  booking: Booking;
  onStatusChange: (id: string, status: Booking["status"]) => void;
}

export default function JobRow({ booking, onStatusChange }: JobRowProps) {
  const [loading, setLoading] = useState(false);
  const s = STATUS[booking.status];

  const handleStatus = async (status: Booking["status"]) => {
    setLoading(true);
    try {
      await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      onStatusChange(booking.id, status);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "var(--surface)", border: "1.5px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
    >
      {/* Row header */}
      <div className="px-5 py-4 flex items-start justify-between gap-4 flex-wrap"
        style={{ borderBottom: "1px solid var(--border)" }}>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-base" style={{ color: "var(--text)" }}>{booking.customerName}</p>
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
              style={{ background: s.bg, color: s.text }}
            >
              {s.label}
            </span>
          </div>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
            {formatDate(booking.date)} at {formatTime(booking.time)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold" style={{ color: "var(--text)" }}>{booking.serviceName}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-light)" }}>
            ${booking.depositAmount} deposit paid
          </p>
        </div>
      </div>

      {/* Row details */}
      <div className="px-5 py-4 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
        <Detail label="Phone" value={booking.phone} />
        <Detail label="Pet" value={`${booking.petName} (${booking.breedSize})`} />
        <div className="col-span-2">
          <Detail label="Address" value={`${booking.street}, ${booking.city}, ${booking.state} ${booking.zip}`} />
        </div>
        {booking.notes && (
          <div className="col-span-2">
            <Detail label="Notes" value={booking.notes} />
          </div>
        )}
        <Detail label="Ticket" value={booking.ticketNumber} mono />
        <Detail label="Balance due" value={`$${booking.totalAmount - booking.depositAmount}`} />
      </div>

      {/* Actions */}
      {booking.status === "confirmed" && (
        <div className="px-5 pb-4 flex gap-2 flex-wrap">
          <ActionBtn
            onClick={() => handleStatus("completed")}
            loading={loading}
            style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}
          >
            Mark completed
          </ActionBtn>
          <ActionBtn
            onClick={() => handleStatus("no-show")}
            loading={loading}
            style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}
          >
            No-show
          </ActionBtn>
          <ActionBtn
            onClick={() => handleStatus("cancelled")}
            loading={loading}
            style={{ background: "var(--surface-2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
          >
            Cancel
          </ActionBtn>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-light)" }}>
        {label}:{" "}
      </span>
      <span className={mono ? "font-mono text-xs" : ""} style={{ color: "var(--text)" }}>
        {value}
      </span>
    </div>
  );
}

function ActionBtn({
  onClick, loading, style, children,
}: {
  onClick: () => void;
  loading: boolean;
  style: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="rounded-lg px-3 py-1.5 text-xs font-semibold"
      style={{ ...style, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}
    >
      {children}
    </button>
  );
}
