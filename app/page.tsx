import type { Metadata } from "next";
import BookingFlow from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: "Book an Appointment — XoxoCafe",
  description:
    "Book your mobile pet grooming appointment with XoxoCafe. Choose a service, pick a time, and secure your spot with a small deposit.",
  alternates: {
    canonical: "https://xoxocafe.com",
  },
};

export default function Home() {
  return (
    <div style={{ background: "var(--surface-2)" }}>
      {/* Hero */}
      <div
        style={{
          background: "var(--brand-mid)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="mx-auto max-w-5xl px-6 py-12">
          <h1 className="text-3xl font-bold text-white leading-tight">
            Book your appointment
          </h1>
          <p className="mt-2 text-base" style={{ color: "rgba(255,255,255,0.55)" }}>
            We come to you. Secure your slot with a small deposit — refundable up to 24 hours before your appointment.
          </p>
        </div>
      </div>

      {/* Booking flow */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <BookingFlow />
      </main>
    </div>
  );
}
