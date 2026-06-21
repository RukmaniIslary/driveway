"use client";

import { formatDate, formatTime } from "@/lib/utils";
import type { Booking } from "@/lib/types";

interface ConfirmationTicketProps {
  booking: Booking;
  onBookAnother: () => void;
}

export default function ConfirmationTicket({ booking, onBookAnother }: ConfirmationTicketProps) {
  return (
    <div className="space-y-4">
      {/* Success banner */}
      <div
        className="rounded-2xl px-6 py-5 text-center"
        style={{ background: "var(--brand)", color: "#fff" }}
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-3"
          style={{ background: "var(--accent)" }}>
          <svg className="w-6 h-6" fill="#1a1a1a" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-xl font-bold">Booking confirmed</h2>
        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.65)" }}>
          Deposit of ${booking.depositAmount} received
        </p>
      </div>

      {/* Ticket */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1.5px solid var(--border)", background: "var(--surface)", boxShadow: "var(--shadow)" }}
      >
        {/* Ticket header */}
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-light)" }}>Ticket</p>
            <p className="font-mono font-bold text-sm mt-0.5" style={{ color: "var(--text)" }}>{booking.ticketNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>{booking.serviceName}</p>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
              {formatDate(booking.date)} at {formatTime(booking.time)}
            </p>
          </div>
        </div>

        {/* Ticket body */}
        <div className="px-6 py-5 grid grid-cols-2 gap-x-8 gap-y-4">
          <Field label="Customer" value={booking.customerName} />
          <Field label="Phone" value={booking.phone} />
          <div className="col-span-2">
            <Field label="Address" value={`${booking.street}, ${booking.city}, ${booking.state} ${booking.zip}`} />
          </div>
          <Field label="Pet" value={booking.petName} />
          <Field label="Breed / size" value={booking.breedSize} />
          {booking.notes && (
            <div className="col-span-2">
              <Field label="Notes" value={booking.notes} />
            </div>
          )}
        </div>

        {/* Dashed divider */}
        <div className="mx-6 border-t border-dashed" style={{ borderColor: "var(--border)" }} />

        {/* Amounts */}
        <div className="px-6 py-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span style={{ color: "var(--text-muted)" }}>Deposit paid</span>
            <span className="font-semibold" style={{ color: "var(--text)" }}>${booking.depositAmount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: "var(--text-muted)" }}>Balance at appointment</span>
            <span className="font-semibold" style={{ color: "var(--text)" }}>
              ${booking.totalAmount - booking.depositAmount}
            </span>
          </div>
        </div>

        {/* Footer note */}
        <div className="px-6 py-4" style={{ background: "var(--surface-2)", borderTop: "1px solid var(--border)" }}>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-light)" }}>
            No-shows forfeit the deposit. Reschedule free up to 24 hrs before your slot.
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--text-light)" }}>
            Customer copy — duplicate sent to dispatch board
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onBookAnother}
        className="w-full rounded-xl font-medium text-sm"
        style={{
          height: 44,
          border: "1.5px solid var(--border)",
          background: "var(--surface)",
          color: "var(--text-muted)",
          cursor: "pointer",
        }}
      >
        Book another appointment
      </button>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-light)" }}>{label}</p>
      <p className="text-sm font-medium mt-0.5" style={{ color: "var(--text)" }}>{value}</p>
    </div>
  );
}
