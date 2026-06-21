import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="mt-20"
      style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
    >
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <p className="font-bold text-lg" style={{ color: "var(--brand)" }}>XoxoCafe</p>
            <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Professional mobile pet grooming delivered to your door.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-light)" }}>
              Services
            </p>
            <ul className="space-y-2">
              {["Full Mobile Groom", "Bath & Brush", "Nail Trim & Ears", "De-Shed Treatment"].map((s) => (
                <li key={s}>
                  <Link
                    href="/prices"
                    className="text-sm no-underline"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-light)" }}>
              Company
            </p>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About" },
                { href: "/faq", label: "FAQ" },
                { href: "/prices", label: "Prices" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm no-underline" style={{ color: "var(--text-muted)" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-light)" }}>
              Legal
            </p>
            <ul className="space-y-2">
              {[
                { href: "/terms", label: "Terms & Conditions" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm no-underline" style={{ color: "var(--text-muted)" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-light)" }}>
            &copy; {new Date().getFullYear()} XoxoCafe. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--text-light)" }}>
            Deposits applied to your total. Payments secured by Paddle.
          </p>
        </div>
      </div>
    </footer>
  );
}
