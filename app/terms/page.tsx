import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — XoxoCafe",
  description:
    "Read the XoxoCafe Terms and Conditions covering bookings, deposits, cancellations, liability, and your rights as a customer.",
  alternates: { canonical: "https://xoxocafe.xyz/terms" },
  robots: { index: true, follow: false },
};

const LAST_UPDATED = "June 21, 2026";

export default function TermsPage() {
  return (
    <div style={{ background: "var(--surface-2)" }}>
      {/* Hero */}
      <div style={{ background: "var(--brand-mid)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="mx-auto max-w-5xl px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
            Legal
          </p>
          <h1 className="text-3xl font-bold text-white leading-tight">
            Terms & Conditions
          </h1>
          <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <div
          className="rounded-2xl px-8 py-10 space-y-10"
          style={{ background: "var(--surface)", border: "1.5px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
        >
          <Section title="1. Agreement to terms">
            <p>
              By booking an appointment with XoxoCafe you agree to be bound by these Terms and Conditions. Please read them carefully before completing your booking. If you do not agree, do not proceed with a booking.
            </p>
          </Section>

          <Section title="2. Services">
            <p>
              XoxoCafe provides mobile pet grooming services including but not limited to Full Mobile Groom, Bath & Brush, Nail Trim & Ears, and De-Shed Treatment. Services are provided at the address specified at the time of booking.
            </p>
            <p className="mt-3">
              We reserve the right to refuse or discontinue service at any time if, in our professional judgment, proceeding would be unsafe for the pet, the groomer, or any other person.
            </p>
          </Section>

          <Section title="3. Booking and deposits">
            <p>
              All bookings require a deposit paid at the time of booking. The deposit amount is stated clearly on the booking page for each service. Deposits are processed securely through Paddle and are applied in full to the cost of your service on the appointment day.
            </p>
            <p className="mt-3">
              A booking is only confirmed once the deposit payment has been successfully processed and you have received a confirmation ticket.
            </p>
          </Section>

          <Section title="4. Cancellations and rescheduling">
            <p>
              You may reschedule your appointment free of charge provided you notify us at least 24 hours before the scheduled appointment time. Your deposit will carry over to the new appointment.
            </p>
            <p className="mt-3">
              Cancellations or no-shows occurring within 24 hours of the scheduled appointment time will result in forfeiture of the deposit. No refund will be issued in these circumstances.
            </p>
            <p className="mt-3">
              XoxoCafe reserves the right to cancel or reschedule appointments due to circumstances beyond our control including but not limited to severe weather, vehicle breakdown, or groomer illness. In such cases a full refund of the deposit will be issued or the appointment rescheduled at no charge, at your preference.
            </p>
          </Section>

          <Section title="5. Pet health and safety">
            <p>
              You confirm that your pet is in good general health and that you are not aware of any condition that may make grooming unsafe. You agree to disclose any known health conditions, behavioral issues, or special requirements at the time of booking via the notes field.
            </p>
            <p className="mt-3">
              XoxoCafe is not responsible for conditions that first become apparent during grooming (such as pre-existing skin irritations, matting, or undisclosed health issues). In the event of an emergency during grooming, we will contact you immediately and, if necessary, arrange emergency veterinary care. Any such costs are your responsibility.
            </p>
            <p className="mt-3">
              All pets must be current on vaccinations. By booking you confirm this requirement is met.
            </p>
          </Section>

          <Section title="6. Matting">
            <p>
              Severely matted coats may require additional time and cost. In cases where dematting would cause undue distress or harm to the pet, we reserve the right to shave the affected area. We will inform you before proceeding whenever possible.
            </p>
          </Section>

          <Section title="7. Limitation of liability">
            <p>
              XoxoCafe takes every precaution to ensure the safety and comfort of your pet. However, grooming inherently involves some risk. XoxoCafe is not liable for any injury, illness, or adverse reaction that occurs during or after grooming where such outcome could not reasonably have been foreseen or prevented with standard professional care.
            </p>
            <p className="mt-3">
              Our total liability to you in connection with any booking shall not exceed the total value of the service booked.
            </p>
          </Section>

          <Section title="8. Payments">
            <p>
              Deposits are processed via Paddle, a third-party payment provider. By paying a deposit you agree to Paddle's terms of service. XoxoCafe does not store card details. The balance of the service fee is due at the time of the appointment.
            </p>
          </Section>

          <Section title="9. Privacy">
            <p>
              Personal information collected during booking (name, phone number, address, and pet details) is used solely to facilitate your appointment. We do not sell or share your personal information with third parties except where required to process payment or comply with legal obligations.
            </p>
          </Section>

          <Section title="10. Changes to these terms">
            <p>
              XoxoCafe reserves the right to update these Terms and Conditions at any time. The version in force at the time of your booking applies to that booking. Continued use of the booking service after an update constitutes acceptance of the revised terms.
            </p>
          </Section>

          <Section title="11. Governing law">
            <p>
              These Terms and Conditions are governed by the laws of the United States. Any disputes arising from a booking will be subject to the jurisdiction of the courts applicable to the state in which the service was provided.
            </p>
          </Section>

          <Section title="12. Contact">
            <p>
              If you have any questions about these Terms and Conditions, please contact us via the number provided in your booking confirmation.
            </p>
          </Section>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-bold mb-3" style={{ color: "var(--text)" }}>
        {title}
      </h2>
      <div className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
        {children}
      </div>
    </section>
  );
}
