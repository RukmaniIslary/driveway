"use client";

import { SERVICES } from "@/lib/constants";
import type { ServiceId } from "@/lib/constants";

interface ServiceCardProps {
  selected: ServiceId | "";
  onSelect: (id: ServiceId) => void;
}

export default function ServiceCard({ selected, onSelect }: ServiceCardProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {SERVICES.map((service) => {
        const isSelected = selected === service.id;
        return (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelect(service.id)}
            aria-pressed={isSelected}
            className="rounded-xl text-left w-full"
            style={{
              border: isSelected
                ? "2px solid var(--accent)"
                : "2px solid var(--border)",
              background: isSelected ? "#fffbf2" : "var(--surface)",
              padding: "18px 20px",
              boxShadow: isSelected ? "0 0 0 4px rgba(232,184,109,0.12)" : "var(--shadow-sm)",
              transition: "all 0.15s ease",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p
                  className="font-semibold text-base"
                  style={{ color: "var(--text)" }}
                >
                  {service.name}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {service.duration}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xl font-bold" style={{ color: "var(--text)" }}>
                  ${service.price}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-light)" }}>
                  ${service.deposit} deposit
                </p>
              </div>
            </div>

            {isSelected && (
              <div
                className="mt-3 flex items-center gap-1.5 text-xs font-medium"
                style={{ color: "var(--accent-hover)" }}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Selected
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
