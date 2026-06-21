"use client";

import { useState, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ServiceCard from "./ServiceCard";
import DateTimePicker from "./DateTimePicker";
import CustomerForm from "./CustomerForm";
import PaddleCheckout from "./PaddleCheckout";
import ConfirmationTicket from "./ConfirmationTicket";
import type { Booking, BookingFormData } from "@/lib/types";
import type { ServiceId } from "@/lib/constants";

type Step = 1 | 2 | 3 | 4 | 5;

const STEPS: { num: Step; label: string }[] = [
  { num: 1, label: "Choose a service" },
  { num: 2, label: "Pick a time" },
  { num: 3, label: "Your details" },
  { num: 4, label: "Secure your spot" },
];

export default function BookingFlow() {
  const [step, setStep] = useState<Step>(1);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [paymentError, setPaymentError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<BookingFormData>({
    defaultValues: {
      serviceId: "", date: "", time: "",
      customerName: "", phone: "",
      street: "", city: "", state: "", zip: "",
      petName: "", breedSize: "", notes: "",
    },
  });

  const { watch, setValue, getValues, trigger } = methods;
  const serviceId = watch("serviceId") as ServiceId | "";
  const date = watch("date");
  const time = watch("time");

  const handlePaymentSuccess = useCallback(async (transactionId: string) => {
    setIsSubmitting(true);
    setPaymentError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...getValues(), paddleTransactionId: transactionId }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to save booking");
      }
      const { booking } = await res.json();
      setConfirmedBooking(booking);
      setStep(5);
    } catch (e) {
      setPaymentError((e as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }, [getValues]);

  const handlePaymentError = useCallback((msg: string) => setPaymentError(msg), []);

  const handleReset = () => {
    methods.reset();
    setConfirmedBooking(null);
    setPaymentError("");
    setStep(1);
  };

  const advanceStep = async () => {
    if (step === 3) {
      const valid = await trigger(["customerName","phone","street","city","state","zip","petName","breedSize"]);
      if (!valid) return;
    }
    setStep((s) => (s + 1) as Step);
  };

  if (step === 5 && confirmedBooking) {
    return (
      <div className="max-w-2xl mx-auto">
        <ConfirmationTicket booking={confirmedBooking} onBookAnother={handleReset} />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="max-w-2xl mx-auto space-y-4">

        {/* Step 1 */}
        <StepCard
          stepNum={1}
          label="Choose a service"
          active={step === 1}
          complete={step > 1}
          locked={false}
          onEdit={() => setStep(1)}
        >
          <ServiceCard
            selected={serviceId}
            onSelect={(id) => {
              setValue("serviceId", id);
              if (step === 1) setTimeout(() => setStep(2), 250);
            }}
          />
        </StepCard>

        {/* Step 2 */}
        {step >= 2 && (
          <StepCard
            stepNum={2}
            label="Pick a time"
            active={step === 2}
            complete={step > 2}
            locked={step < 2}
            onEdit={() => setStep(2)}
          >
            <DateTimePicker
              date={date}
              time={time}
              onDateChange={(d) => setValue("date", d)}
              onTimeChange={(t) => {
                setValue("time", t);
                if (step === 2) setTimeout(() => setStep(3), 300);
              }}
            />
          </StepCard>
        )}

        {/* Step 3 */}
        {step >= 3 && (
          <StepCard
            stepNum={3}
            label="Your details"
            active={step === 3}
            complete={step > 3}
            locked={step < 3}
            onEdit={() => setStep(3)}
          >
            <CustomerForm />
            {step === 3 && (
              <div className="mt-6">
                <Button onClick={advanceStep}>Continue to payment</Button>
              </div>
            )}
          </StepCard>
        )}

        {/* Step 4 */}
        {step >= 4 && (
          <StepCard
            stepNum={4}
            label="Secure your spot"
            active={step === 4}
            complete={false}
            locked={false}
            onEdit={undefined}
          >
            {paymentError && (
              <div className="mb-4 rounded-lg px-4 py-3 text-sm"
                style={{ background: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca" }}>
                {paymentError}
              </div>
            )}
            {isSubmitting ? (
              <div className="py-10 text-center text-sm" style={{ color: "var(--text-muted)" }}>
                Saving your booking...
              </div>
            ) : (
              <PaddleCheckout
                formData={getValues()}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            )}
          </StepCard>
        )}
      </div>
    </FormProvider>
  );
}

/* ── Internal helpers ── */

function StepCard({
  stepNum, label, active, complete, locked, onEdit, children,
}: {
  stepNum: number;
  label: string;
  active: boolean;
  complete: boolean;
  locked: boolean;
  onEdit?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "var(--surface)",
        border: active ? "1.5px solid var(--accent)" : "1.5px solid var(--border)",
        boxShadow: active ? "var(--shadow)" : "var(--shadow-sm)",
        opacity: locked ? 0.5 : 1,
      }}
    >
      {/* Card header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: active ? "1px solid rgba(232,184,109,0.2)" : "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold shrink-0"
            style={
              complete
                ? { background: "var(--brand)", color: "#fff" }
                : active
                ? { background: "var(--accent)", color: "#1a1a1a" }
                : { background: "var(--border)", color: "var(--text-muted)" }
            }
          >
            {complete ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : stepNum}
          </span>
          <h2 className="font-semibold text-base" style={{ color: active || complete ? "var(--text)" : "var(--text-muted)" }}>
            {label}
          </h2>
        </div>
        {complete && onEdit && (
          <button
            onClick={onEdit}
            className="text-xs font-medium"
            style={{ color: "var(--accent-hover)" }}
          >
            Edit
          </button>
        )}
      </div>

      {/* Card body */}
      {active && (
        <div className="px-5 py-5">{children}</div>
      )}
    </div>
  );
}

function Button({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full font-semibold rounded-xl text-base"
      style={{
        height: 50,
        background: "var(--brand)",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </button>
  );
}
