"use client";

import { useState } from "react";
import BookingFlow from "@/components/booking/BookingFlow";
import DispatchBoard from "@/components/dispatch/DispatchBoard";

type Tab = "booking" | "dispatch";

export default function Home() {
  const [tab, setTab] = useState<Tab>("booking");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-5">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Driveway</h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Booking + deposits for mobile and home-service businesses
              </p>
            </div>
            <nav className="flex rounded-xl border border-slate-200 bg-slate-100 p-1 gap-1" aria-label="Main navigation">
              <TabButton active={tab === "booking"} onClick={() => setTab("booking")}>
                Customer booking
              </TabButton>
              <TabButton active={tab === "dispatch"} onClick={() => setTab("dispatch")}>
                Dispatch board
              </TabButton>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-4 py-8">
        {tab === "booking" ? (
          <>
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Book with Sudsy Mobile Grooming
            </h2>
            <BookingFlow />
          </>
        ) : (
          <DispatchBoard />
        )}
      </main>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
        active
          ? "bg-white shadow-sm text-slate-900"
          : "text-slate-500 hover:text-slate-700"
      }`}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </button>
  );
}
