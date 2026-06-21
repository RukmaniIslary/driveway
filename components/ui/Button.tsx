import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, children, disabled, style, className, ...props }, ref) => {
    const base: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 600,
      borderRadius: 10,
      border: "none",
      cursor: disabled || loading ? "not-allowed" : "pointer",
      opacity: disabled || loading ? 0.55 : 1,
      transition: "all 0.15s ease",
      fontSize: size === "lg" ? 15 : size === "sm" ? 13 : 14,
      height: size === "lg" ? 48 : size === "sm" ? 34 : 42,
      padding: size === "lg" ? "0 24px" : size === "sm" ? "0 12px" : "0 18px",
      ...style,
    };

    const variantStyle: React.CSSProperties =
      variant === "primary"
        ? { background: "var(--accent)", color: "#1a1a1a" }
        : variant === "secondary"
        ? { background: "var(--surface)", color: "var(--text)", border: "1.5px solid var(--border)" }
        : variant === "danger"
        ? { background: "#fee2e2", color: "#dc2626", border: "1.5px solid #fecaca" }
        : { background: "transparent", color: "var(--text-muted)" };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        style={{ ...base, ...variantStyle }}
        className={className}
        {...props}
      >
        {loading ? (
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg className="animate-spin" style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
