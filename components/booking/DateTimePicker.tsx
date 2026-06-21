"use client";

import { cn, formatDate, formatTime, getAvailableDates, TIME_SLOTS } from "@/lib/utils";

interface DateTimePickerProps {
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export default function DateTimePicker({
  date,
  time,
  onDateChange,
  onTimeChange,
}: DateTimePickerProps) {
  const dates = getAvailableDates();

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">Select a date</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {dates.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onDateChange(d)}
              className={cn(
                "rounded-lg border px-3 py-2 text-xs text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900",
                date === d
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
              )}
              aria-pressed={date === d}
            >
              {formatDate(d).split(",")[0]}<br />
              <span className="font-semibold">{formatDate(d).split(",")[1]?.trim()}</span>
            </button>
          ))}
        </div>
      </div>

      {date && (
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Select a time</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {TIME_SLOTS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onTimeChange(t)}
                className={cn(
                  "rounded-lg border px-2 py-2 text-xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900",
                  time === t
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                )}
                aria-pressed={time === t}
              >
                {formatTime(t)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
