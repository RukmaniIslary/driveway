"use client";

import { useState } from "react";
import BookingFlow from "@/components/booking/BookingFlow";
import DispatchBoard from "@/components/dispatch/DispatchBoard";

type Tab = "booking" | "dispatch";

export default function Home() {
  const [tab, setTab] = useState<Tab>("booking");

  return (
    <div className="min-h-screen" style={{ background: "var(--surface-2)" }}>
      {/* Top nav */}
      <header style={{ background: "var(--brand)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mx-auto max-w-4xl px-6 py-0 flex items-center justify-between" style={{ height: 64 }}>
          <div className="flex items-center gap-3">
            <span
              className="font-bold text-xl tracking-tight"
              style={{ color: "var(--accent)" }}
            >
              Driveway
            </span>
            <span
              className="hidden sm:block text-xs px-2 py-0.5 rounded font-medium"
              style={{ background: "rgba(232,184,109,0.15)", color: "var(--accent)" }}
            >
              Mobile Grooming
            </span>
          </div>

          <nav className="flex gap-1" aria-label="Main navigation">
            <NavTab active={tab === "booking"} onClick={() => setTab("booking")}>
              Book
            </NavTab>
            <NavTab active={tab === "dispatch"} onClick={() => setTab("dispatch")}>
              Dispatch
            </NavTab>
          </nav>
        </div>
      </header>

      {/* Hero — only on booking tab */}
      {tab === "booking" && (
        <div style={{ background: "var(--brand-mid)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="mx-auto max-w-4xl px-6 py-10">
            <h1 className="text-3xl font-bold text-white leading-tight">
              Book your appointment
            </h1>
            <p className="mt-2 text-base" style={{ color: "rgba(255,255,255,0.55)" }}>
              We come to you. Secure your slot with a small deposit — refundable up to 24 hours before your appointment.
            </p>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {tab === "booking" ? <BookingFlow /> : <DispatchBoard />}
      </main>

      {/* Footer */}
      <footer className="border-t mt-16" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="mx-auto max-w-4xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm font-semibold" style={{ color: "var(--brand)" }}>Driveway</span>
          <p className="text-xs" style={{ color: "var(--text-light)" }}>
            Deposits applied to your total. Refundable if you reschedule 24+ hours in advance.
          </p>
          <p className="text-xs" style={{ color: "var(--text-light)" }}>Payments secured by Paddle</p>
        </div>
      </footer>
    </div>
  );
}

function NavTab({
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
      className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
      style={
        active
          ? { background: "var(--accent)", color: "#1a1a1a" }
          : { color: "rgba(255,255,255,0.6)", background: "transparent" }
      }
    >
      {children}
    </button>
  );
}
