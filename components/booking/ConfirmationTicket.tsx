"use client";

import { formatDate, formatTime, formatDollars } from "@/lib/utils";
import Button from "@/components/ui/Button";
import type { Booking } from "@/lib/types";

interface ConfirmationTicketProps {
  booking: Booking;
  onBookAnother: () => void;
}

export default function ConfirmationTicket({
  booking,
  onBookAnother,
}: ConfirmationTicketProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border-2 border-slate-900 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase opacity-70">Ticket</p>
            <p className="text-xl font-bold">{booking.ticketNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-70">Deposit paid</p>
            <p className="text-lg font-bold">{formatDollars(booking.depositAmount)}</p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div className="text-center pb-4 border-b border-dashed border-slate-200">
            <p className="text-2xl font-bold text-slate-900">{booking.serviceName}</p>
            <p className="text-slate-600 mt-1">
              {formatDate(booking.date)} at {formatTime(booking.time)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Customer</p>
              <p className="text-slate-900 font-medium">{booking.customerName}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Phone</p>
              <p className="text-slate-900 font-medium">{booking.phone}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Address</p>
              <p className="text-slate-900 font-medium">
                {booking.street}, {booking.city}, {booking.state} {booking.zip}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Pet</p>
              <p className="text-slate-900 font-medium">{booking.petName}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Breed / size</p>
              <p className="text-slate-900 font-medium">{booking.breedSize}</p>
            </div>
            {booking.notes && (
              <div className="col-span-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Notes</p>
                <p className="text-slate-900">{booking.notes}</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-dashed border-slate-200">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Deposit paid</span>
              <span className="font-semibold">{formatDollars(booking.depositAmount)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-slate-600">Balance at appointment</span>
              <span className="font-semibold">
                {formatDollars(booking.totalAmount - booking.depositAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4">
          <p className="text-xs text-slate-500 leading-relaxed">
            No-shows forfeit the deposit. Reschedule free up to 24 hrs before your slot — just
            text the number in your confirmation.
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Customer copy — duplicate sent to dispatch board
          </p>
        </div>
      </div>

      <Button
        variant="secondary"
        size="lg"
        className="w-full"
        onClick={onBookAnother}
      >
        Book another appointment
      </Button>
    </div>
  );
}
