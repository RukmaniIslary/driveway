import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About XoxoCafe",
  description:
    "Learn about XoxoCafe — a mobile pet grooming service that brings professional care right to your driveway. Our story, our values, and why pet owners trust us.",
  alternates: { canonical: "https://xoxocafe.com/about" },
};

const VALUES = [
  {
    title: "We come to you",
    body: "No more stressful car rides for your pet. We park right outside and bring the full salon experience to your driveway.",
  },
  {
    title: "One pet at a time",
    body: "Your pet is never left in a cage waiting. They get our full, undivided attention from start to finish.",
  },
  {
    title: "Trained professionals",
    body: "Every groomer on our team is certified and passionate about animal welfare. We treat every pet like our own.",
  },
  {
    title: "Transparent pricing",
    body: "What you see is what you pay. No hidden fees, no surprise charges — just honest, upfront pricing.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ background: "var(--surface-2)" }}>
      {/* Hero */}
      <div style={{ background: "var(--brand-mid)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="mx-auto max-w-5xl px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
            About us
          </p>
          <h1 className="text-3xl font-bold text-white leading-tight">
            Grooming that comes to you
          </h1>
          <p className="mt-3 text-base max-w-xl" style={{ color: "rgba(255,255,255,0.55)" }}>
            XoxoCafe is a mobile pet grooming service built around one idea: your pet deserves a calm, stress-free experience — and so do you.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12 space-y-16">

        {/* Mission */}
        <section className="max-w-2xl">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>Our story</h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            <p>
              XoxoCafe was founded by pet lovers who were tired of the traditional grooming salon experience — the long waits, the anxiety in their dogs, and the uncertainty of how their pet was being treated behind closed doors.
            </p>
            <p>
              We built a mobile service where every appointment is one-on-one, every groomer is fully certified, and every pet goes home happy. We park at your door, we do the work, and we send you a happy, clean pet.
            </p>
            <p>
              Today we serve pet owners across the US, and every booking is backed by our simple deposit policy that keeps appointments running on time for everyone.
            </p>
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text)" }}>What we stand for</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl p-6"
                style={{
                  background: "var(--surface)",
                  border: "1.5px solid var(--border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text)" }}>
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className="rounded-2xl px-8 py-10 text-center"
          style={{ background: "var(--brand)", boxShadow: "var(--shadow-lg)" }}
        >
          <h2 className="text-2xl font-bold text-white mb-3">Ready to book?</h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Secure your appointment in minutes. Deposit applied to your total.
          </p>
          <Link
            href="/"
            className="inline-block rounded-xl font-semibold text-sm no-underline px-8 py-3"
            style={{ background: "var(--accent)", color: "#1a1a1a" }}
          >
            Book an appointment
          </Link>
        </section>

      </main>
    </div>
  );
}
