"use client";

import { useEffect, useRef, useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import { SERVICES } from "@/lib/constants";
import type { BookingFormData } from "@/lib/types";

interface PaddleCheckoutProps {
  formData: BookingFormData;
  onSuccess: (transactionId: string) => void;
  onError: (message: string) => void;
  disabled?: boolean;
}

export default function PaddleCheckout({ formData, onSuccess, onError, disabled }: PaddleCheckoutProps) {
  const paddleRef = useRef<Paddle | null>(null);
  const [loading, setLoading] = useState(false);
  const [paddleReady, setPaddleReady] = useState(false);

  const service = SERVICES.find((s) => s.id === formData.serviceId);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    const env = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT as "sandbox" | "production" | undefined;
    if (!token) return;

    initializePaddle({
      token,
      environment: env ?? "sandbox",
      eventCallback(event) {
        if (event.name === "checkout.completed") {
          onSuccess(event.data?.transaction_id ?? "");
        }
        if (event.name === "checkout.error") {
          onError("Payment failed. Please try a different card.");
        }
        if (event.name === "checkout.closed") {
          setLoading(false);
        }
      },
    }).then((p) => {
      if (p) { paddleRef.current = p; setPaddleReady(true); }
    });
  }, [onSuccess, onError]);

  const handlePay = async () => {
    if (!paddleRef.current || !service) return;
    setLoading(true);
    try {
      await paddleRef.current.Checkout.open({
        items: [{ priceId: service.priceId, quantity: 1 }],
        customData: {
          customerName: formData.customerName,
          phone: formData.phone,
          serviceId: formData.serviceId,
          date: formData.date,
          time: formData.time,
        },
      });
    } catch {
      onError("Could not open checkout. Please try again.");
      setLoading(false);
    }
  };

  if (!service) return null;

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="rounded-xl p-4 space-y-3" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
        <div className="flex justify-between items-center">
          <span className="font-semibold" style={{ color: "var(--text)" }}>{service.name}</span>
          <span className="font-semibold" style={{ color: "var(--text)" }}>${service.price}</span>
        </div>
        <div className="h-px" style={{ background: "var(--border)" }} />
        <div className="flex justify-between items-center">
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>Deposit due now</span>
          <span className="text-lg font-bold" style={{ color: "var(--brand)" }}>${service.deposit}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>Balance at appointment</span>
          <span className="text-sm font-medium" style={{ color: "var(--text)" }}>${service.price - service.deposit}</span>
        </div>
        <p className="text-xs pt-1" style={{ color: "var(--text-light)", borderTop: "1px solid var(--border)", paddingTop: 10 }}>
          Deposit applied to your total. Refunded in full if you reschedule more than 24 hours out.
        </p>
      </div>

      {/* Pay button */}
      <button
        type="button"
        onClick={handlePay}
        disabled={disabled || !paddleReady || loading}
        className="w-full font-semibold rounded-xl text-base flex items-center justify-center gap-2"
        style={{
          height: 52,
          background: paddleReady ? "var(--accent)" : "var(--border)",
          color: paddleReady ? "#1a1a1a" : "var(--text-light)",
          border: "none",
          cursor: !paddleReady || loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          letterSpacing: "0.01em",
        }}
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Processing...
          </>
        ) : !paddleReady ? (
          "Loading payment..."
        ) : (
          `Pay $${service.deposit} deposit and confirm`
        )}
      </button>

      <p className="text-center text-xs" style={{ color: "var(--text-light)" }}>
        Secured by Paddle. No-shows forfeit the deposit.
      </p>
    </div>
  );
}
