"use client";

import { getAvailableDates, TIME_SLOTS, formatTime } from "@/lib/utils";

interface DateTimePickerProps {
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

const DAY_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parseLocalDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export default function DateTimePicker({ date, time, onDateChange, onTimeChange }: DateTimePickerProps) {
  const dates = getAvailableDates();

  return (
    <div className="space-y-6">
      {/* Date row */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-light)" }}>
          Select a date
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {dates.map((d) => {
            const dt = parseLocalDate(d);
            const isSelected = date === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => onDateChange(d)}
                aria-pressed={isSelected}
                className="flex flex-col items-center shrink-0 rounded-xl py-3 px-4 min-w-[64px]"
                style={{
                  border: isSelected ? "2px solid var(--accent)" : "2px solid var(--border)",
                  background: isSelected ? "var(--brand)" : "var(--surface)",
                  color: isSelected ? "#fff" : "var(--text)",
                  boxShadow: isSelected ? "var(--shadow)" : "none",
                }}
              >
                <span className="text-xs font-medium opacity-70">{DAY_ABBR[dt.getDay()]}</span>
                <span className="text-lg font-bold leading-tight">{dt.getDate()}</span>
                <span className="text-xs opacity-70">{MONTH_ABBR[dt.getMonth()]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time grid */}
      {date && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-light)" }}>
            Select a time
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {TIME_SLOTS.map((t) => {
              const isSelected = time === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => onTimeChange(t)}
                  aria-pressed={isSelected}
                  className="rounded-lg py-2.5 text-sm font-medium"
                  style={{
                    border: isSelected ? "2px solid var(--accent)" : "2px solid var(--border)",
                    background: isSelected ? "var(--brand)" : "var(--surface)",
                    color: isSelected ? "#fff" : "var(--text)",
                    boxShadow: isSelected ? "var(--shadow-sm)" : "none",
                  }}
                >
                  {formatTime(t)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
