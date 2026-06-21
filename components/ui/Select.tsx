import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, children, className, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: "var(--text-muted)" }}
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full rounded-lg px-3.5 text-sm appearance-none ${className ?? ""}`}
          style={{
            height: 44,
            border: error ? "1.5px solid #ef4444" : "1.5px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text)",
            outline: "none",
          }}
          onFocus={(e) => {
            e.currentTarget.style.border = "1.5px solid var(--accent)";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,184,109,0.15)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = error ? "1.5px solid #ef4444" : "1.5px solid var(--border)";
            e.currentTarget.style.boxShadow = "none";
          }}
          {...props}
        >
          {children}
        </select>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
