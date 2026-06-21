"use client";

import { useEffect, useRef, useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import Button from "@/components/ui/Button";
import { formatDollars } from "@/lib/utils";
import type { BookingFormData } from "@/lib/types";
import { SERVICES } from "@/lib/constants";

interface PaddleCheckoutProps {
  formData: BookingFormData;
  onSuccess: (transactionId: string) => void;
  onError: (message: string) => void;
  disabled?: boolean;
}

export default function PaddleCheckout({
  formData,
  onSuccess,
  onError,
  disabled,
}: PaddleCheckoutProps) {
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
          const txId = event.data?.transaction_id ?? "";
          onSuccess(txId);
        }
        if (event.name === "checkout.error") {
          onError("Payment failed. Please try a different card.");
        }
        if (event.name === "checkout.closed") {
          setLoading(false);
        }
      },
    }).then((p) => {
      if (p) {
        paddleRef.current = p;
        setPaddleReady(true);
      }
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
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">{service.name}</span>
          <span className="font-medium text-slate-900">{formatDollars(service.price)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Deposit due now</span>
          <span className="font-bold text-slate-900">{formatDollars(service.deposit)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Balance at appointment</span>
          <span className="text-slate-600">{formatDollars(service.price - service.deposit)}</span>
        </div>
        <p className="text-xs text-slate-500 pt-1 border-t border-slate-200">
          Deposit applied to your total. Refunded in full if you reschedule more than 24 hours out.
        </p>
      </div>

      <Button
        size="lg"
        className="w-full"
        onClick={handlePay}
        loading={loading}
        disabled={disabled || !paddleReady || loading}
      >
        {paddleReady
          ? `Pay ${formatDollars(service.deposit)} deposit and confirm`
          : "Loading payment..."}
      </Button>

      <p className="text-center text-xs text-slate-500">
        Secured by Paddle. No-shows forfeit the deposit.
      </p>
    </div>
  );
}
