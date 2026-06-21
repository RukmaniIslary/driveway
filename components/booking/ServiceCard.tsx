"use client";

import { cn, formatDollars } from "@/lib/utils";
import { SERVICES } from "@/lib/constants";
import type { ServiceId } from "@/lib/constants";

interface ServiceCardProps {
  selected: ServiceId | "";
  onSelect: (id: ServiceId) => void;
}

export default function ServiceCard({ selected, onSelect }: ServiceCardProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {SERVICES.map((service) => (
        <button
          key={service.id}
          type="button"
          onClick={() => onSelect(service.id)}
          className={cn(
            "rounded-xl border-2 p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900",
            selected === service.id
              ? "border-slate-900 bg-slate-50"
              : "border-slate-200 bg-white hover:border-slate-400"
          )}
          aria-pressed={selected === service.id}
        >
          <p className="font-semibold text-slate-900">{service.name}</p>
          <p className="text-xs text-slate-500 mt-0.5">{service.duration}</p>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">{service.description}</p>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-lg font-bold text-slate-900">{formatDollars(service.price)}</span>
            <span className="text-xs text-slate-500">{formatDollars(service.deposit)} deposit</span>
          </div>
        </button>
      ))}
    </div>
  );
}
