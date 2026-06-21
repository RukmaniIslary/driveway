import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — XoxoCafe",
  description:
    "Answers to common questions about XoxoCafe mobile pet grooming — deposits, scheduling, what to expect, breed sizes, and more.",
  alternates: { canonical: "https://xoxocafe.com/faq" },
};

const FAQS = [
  {
    q: "What areas do you serve?",
    a: "We currently serve customers across the United States. Enter your address during booking and we will confirm availability in your area.",
  },
  {
    q: "How does the deposit work?",
    a: "A small deposit is charged at the time of booking to hold your appointment slot. It is applied directly to the total cost of your service on the day. It is not an extra charge.",
  },
  {
    q: "Can I reschedule or cancel?",
    a: "Yes. You can reschedule for free up to 24 hours before your appointment — just text the number in your confirmation and your deposit carries over to the new slot. Cancellations or no-shows within 24 hours forfeit the deposit.",
  },
  {
    q: "What does the groomer bring?",
    a: "Our mobile unit is fully self-contained. We bring everything needed including water, professional-grade shampoos, conditioners, dryers, and all grooming tools. You do not need to provide anything.",
  },
  {
    q: "How long does a grooming appointment take?",
    a: "Appointment lengths depend on the service and your pet. Bath & Brush takes around 45 minutes, Full Mobile Groom around 90 minutes, De-Shed Treatment around 60 minutes, and Nail Trim & Ears around 20 minutes.",
  },
  {
    q: "What breeds and sizes do you groom?",
    a: "We groom all breeds and sizes. Please include your pet's breed and approximate size when booking so we can plan accordingly.",
  },
  {
    q: "Do I need to be home during the appointment?",
    a: "We ask that an adult be present or reachable for the duration of the appointment. For safety, we require consent before proceeding with any service.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Deposits are paid online via Paddle, which accepts all major credit and debit cards. The balance at the appointment can be paid by card or cash.",
  },
  {
    q: "Is my payment information safe?",
    a: "Yes. Deposits are processed through Paddle, a PCI-compliant payment gateway. We never store your card details.",
  },
  {
    q: "What if my pet has special needs or anxiety?",
    a: "Please add notes about your pet's temperament or health conditions in the booking form. Our groomers are experienced with anxious pets and will always put your pet's comfort first.",
  },
];

export default function FAQPage() {
  return (
    <div style={{ background: "var(--surface-2)" }}>
      {/* Hero */}
      <div style={{ background: "var(--brand-mid)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="mx-auto max-w-5xl px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
            FAQ
          </p>
          <h1 className="text-3xl font-bold text-white leading-tight">
            Frequently asked questions
          </h1>
          <p className="mt-3 text-base max-w-xl" style={{ color: "rgba(255,255,255,0.55)" }}>
            Everything you need to know before booking. Can't find your answer? Reach out via the contact on your confirmation.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-12 rounded-2xl px-8 py-10 text-center"
          style={{ background: "var(--brand)", boxShadow: "var(--shadow-lg)" }}
        >
          <h2 className="text-xl font-bold text-white mb-3">Still have questions?</h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Book an appointment and your confirmation will include our direct contact number.
          </p>
          <Link
            href="/"
            className="inline-block rounded-xl font-semibold text-sm no-underline px-8 py-3"
            style={{ background: "var(--accent)", color: "#1a1a1a" }}
          >
            Book now
          </Link>
        </div>
      </main>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details
      className="rounded-2xl group"
      style={{
        background: "var(--surface)",
        border: "1.5px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <summary
        className="px-6 py-5 cursor-pointer flex items-center justify-between gap-4 list-none font-semibold text-base"
        style={{ color: "var(--text)" }}
      >
        <span>{q}</span>
        <svg
          className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: "var(--text-light)" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div
        className="px-6 pb-5 text-sm leading-relaxed"
        style={{ color: "var(--text-muted)", borderTop: "1px solid var(--border)", paddingTop: 16 }}
      >
        {a}
      </div>
    </details>
  );
}
