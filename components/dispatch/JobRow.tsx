"use client";

import { useState } from "react";
import { formatDate, formatTime, formatDollars, cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import type { Booking } from "@/lib/types";

const STATUS_STYLES: Record<Booking["status"], string> = {
  confirmed: "bg-blue-50 text-blue-700 border border-blue-200",
  completed: "bg-green-50 text-green-700 border border-green-200",
  "no-show": "bg-red-50 text-red-700 border border-red-200",
  cancelled: "bg-slate-100 text-slate-500 border border-slate-200",
};

const STATUS_LABELS: Record<Booking["status"], string> = {
  confirmed: "Confirmed",
  completed: "Completed",
  "no-show": "No-show",
  cancelled: "Cancelled",
};

interface JobRowProps {
  booking: Booking;
  onStatusChange: (id: string, status: Booking["status"]) => void;
}

export default function JobRow({ booking, onStatusChange }: JobRowProps) {
  const [loading, setLoading] = useState(false);

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
    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-slate-900">{booking.customerName}</p>
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-medium",
                STATUS_STYLES[booking.status]
              )}
            >
              {STATUS_LABELS[booking.status]}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            {formatDate(booking.date)} at {formatTime(booking.time)}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-bold text-slate-900">{booking.serviceName}</p>
          <p className="text-xs text-slate-500">
            {formatDollars(booking.depositAmount)} deposit paid
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm border-t border-slate-100 pt-3">
        <div>
          <span className="text-slate-500">Phone: </span>
          <span className="text-slate-900">{booking.phone}</span>
        </div>
        <div>
          <span className="text-slate-500">Pet: </span>
          <span className="text-slate-900">
            {booking.petName} ({booking.breedSize})
          </span>
        </div>
        <div className="col-span-2">
          <span className="text-slate-500">Address: </span>
          <span className="text-slate-900">
            {booking.street}, {booking.city}, {booking.state} {booking.zip}
          </span>
        </div>
        {booking.notes && (
          <div className="col-span-2">
            <span className="text-slate-500">Notes: </span>
            <span className="text-slate-900">{booking.notes}</span>
          </div>
        )}
        <div>
          <span className="text-slate-500">Ticket: </span>
          <span className="font-mono text-xs text-slate-700">{booking.ticketNumber}</span>
        </div>
        <div>
          <span className="text-slate-500">Balance due: </span>
          <span className="font-medium text-slate-900">
            {formatDollars(booking.totalAmount - booking.depositAmount)}
          </span>
        </div>
      </div>

      {booking.status === "confirmed" && (
        <div className="flex gap-2 pt-2 flex-wrap">
          <Button
            size="sm"
            variant="secondary"
            loading={loading}
            onClick={() => handleStatus("completed")}
          >
            Mark completed
          </Button>
          <Button
            size="sm"
            variant="danger"
            loading={loading}
            onClick={() => handleStatus("no-show")}
          >
            No-show
          </Button>
          <Button
            size="sm"
            variant="ghost"
            loading={loading}
            onClick={() => handleStatus("cancelled")}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
