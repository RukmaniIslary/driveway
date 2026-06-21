import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing — XoxoCafe",
  description:
    "Transparent, flat-rate pricing for every XoxoCafe mobile pet grooming service. No hidden fees. Secure your spot with a small deposit.",
  alternates: { canonical: "https://xoxocafe.xyz/prices" },
};

const INCLUDES: Record<string, string[]> = {
  "full-mobile-groom": [
    "Shampoo & conditioning treatment",
    "Blow-dry & brush-out",
    "Full haircut & styling",
    "Ear cleaning",
    "Nail trim & filing",
  ],
  "bath-brush": [
    "Shampoo & conditioning treatment",
    "Blow-dry & brush-out",
    "Ear cleaning",
    "Nail trim",
  ],
  "nail-trim-ears": [
    "Nail trim & filing",
    "Ear cleaning",
  ],
  "de-shed-treatment": [
    "De-shedding shampoo & conditioner",
    "High-velocity blow-dry",
    "Thorough brush-out",
    "Reduces shedding by up to 90%",
  ],
};

export default function PricesPage() {
  return (
    <div style={{ background: "var(--surface-2)" }}>
      {/* Hero */}
      <div style={{ background: "var(--brand-mid)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="mx-auto max-w-5xl px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
            Pricing
          </p>
          <h1 className="text-3xl font-bold text-white leading-tight">
            Simple, transparent pricing
          </h1>
          <p className="mt-3 text-base max-w-xl" style={{ color: "rgba(255,255,255,0.55)" }}>
            Flat-rate prices with no hidden fees. A small deposit secures your slot — it is applied to your total at the appointment.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12 space-y-16">

        {/* Service cards */}
        <section>
          <div className="grid sm:grid-cols-2 gap-5">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "var(--surface)",
                  border: "1.5px solid var(--border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {/* Card header */}
                <div
                  className="px-6 py-5 flex items-start justify-between"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <div>
                    <h2 className="text-lg font-bold" style={{ color: "var(--text)" }}>
                      {service.name}
                    </h2>
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {service.duration}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-2xl font-bold" style={{ color: "var(--brand)" }}>
                      ${service.price}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-light)" }}>
                      ${service.deposit} deposit to book
                    </p>
                  </div>
                </div>

                {/* Includes */}
                <div className="px-6 py-5">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-light)" }}>
                    Includes
                  </p>
                  <ul className="space-y-2">
                    {(INCLUDES[service.id] ?? []).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                        <svg
                          className="w-4 h-4 shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{ color: "var(--accent-hover)" }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Book CTA */}
                <div className="px-6 pb-6">
                  <Link
                    href="/"
                    className="block w-full text-center rounded-xl font-semibold text-sm py-3 no-underline"
                    style={{ background: "var(--brand)", color: "#fff" }}
                  >
                    Book this service
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deposit policy note */}
        <section
          className="rounded-2xl p-6"
          style={{ background: "var(--surface)", border: "1.5px solid var(--border)" }}
        >
          <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>About deposits</h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            A deposit is collected at the time of booking to secure your appointment slot. It is applied in full to the cost of your service on the day. If you need to reschedule, you can do so free of charge up to 24 hours before your appointment and your deposit carries over to the new slot. Cancellations or no-shows within 24 hours of the appointment forfeit the deposit.
          </p>
        </section>

      </main>
    </div>
  );
}
