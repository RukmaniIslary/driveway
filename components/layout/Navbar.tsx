"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Book" },
  { href: "/about", label: "About" },
  { href: "/prices", label: "Prices" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        background: "var(--brand)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="mx-auto max-w-5xl px-6 flex items-center justify-between"
        style={{ height: 64 }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <span
            className="font-bold text-xl tracking-tight"
            style={{ color: "var(--accent)" }}
          >
            XoxoCafe
          </span>
          <span
            className="hidden sm:block text-xs px-2 py-0.5 rounded font-medium"
            style={{
              background: "rgba(232,184,109,0.15)",
              color: "var(--accent)",
            }}
          >
            Mobile Grooming
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all no-underline"
                style={
                  active
                    ? { background: "var(--accent)", color: "#1a1a1a" }
                    : { color: "rgba(255,255,255,0.65)" }
                }
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/"
            className="ml-3 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all no-underline"
            style={{ background: "var(--accent)", color: "#1a1a1a" }}
          >
            Book now
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: "rgba(255,255,255,0.8)" }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-4 flex flex-col gap-1"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium no-underline"
                style={
                  active
                    ? { background: "var(--accent)", color: "#1a1a1a" }
                    : { color: "rgba(255,255,255,0.7)" }
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
