"use client";

import { useState, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ServiceCard from "./ServiceCard";
import DateTimePicker from "./DateTimePicker";
import CustomerForm from "./CustomerForm";
import PaddleCheckout from "./PaddleCheckout";
import ConfirmationTicket from "./ConfirmationTicket";
import { cn } from "@/lib/utils";
import type { Booking, BookingFormData } from "@/lib/types";
import type { ServiceId } from "@/lib/constants";

type Step = 1 | 2 | 3 | 4 | 5;

const STEP_LABELS: Record<Step, string> = {
  1: "Choose a service",
  2: "Pick a time",
  3: "Your details",
  4: "Secure your spot",
  5: "Confirmed",
};

export default function BookingFlow() {
  const [step, setStep] = useState<Step>(1);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [paymentError, setPaymentError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<BookingFormData>({
    defaultValues: {
      serviceId: "",
      date: "",
      time: "",
      customerName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      petName: "",
      breedSize: "",
      notes: "",
    },
  });

  const { watch, setValue, getValues, trigger } = methods;
  const serviceId = watch("serviceId") as ServiceId | "";
  const date = watch("date");
  const time = watch("time");

  const canProceedFrom = (s: Step): boolean => {
    if (s === 1) return !!serviceId;
    if (s === 2) return !!date && !!time;
    return true;
  };

  const handlePaymentSuccess = useCallback(
    async (transactionId: string) => {
      setIsSubmitting(true);
      setPaymentError("");
      try {
        const data = getValues();
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, paddleTransactionId: transactionId }),
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
    },
    [getValues]
  );

  const handlePaymentError = useCallback((msg: string) => {
    setPaymentError(msg);
  }, []);

  const handleReset = () => {
    methods.reset();
    setConfirmedBooking(null);
    setPaymentError("");
    setStep(1);
  };

  const advanceStep = async () => {
    if (step === 3) {
      const valid = await trigger([
        "customerName", "phone", "street", "city", "state", "zip", "petName", "breedSize",
      ]);
      if (!valid) return;
    }
    setStep((s) => (s + 1) as Step);
  };

  if (step === 5 && confirmedBooking) {
    return (
      <div className="max-w-2xl mx-auto">
        <StepHeader step={5} />
        <ConfirmationTicket booking={confirmedBooking} onBookAnother={handleReset} />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Step 1 */}
        <section aria-labelledby="step1-heading">
          <StepHeader step={1} active={step === 1} complete={step > 1} />
          {(step === 1 || step > 1) && (
            <div className={cn("mt-4", step !== 1 && "opacity-50 pointer-events-none")}>
              <ServiceCard
                selected={serviceId}
                onSelect={(id) => {
                  setValue("serviceId", id);
                  if (step === 1) setStep(2);
                }}
              />
            </div>
          )}
        </section>

        {/* Step 2 */}
        {step >= 2 && (
          <section aria-labelledby="step2-heading">
            <StepHeader step={2} active={step === 2} complete={step > 2} />
            <div className={cn("mt-4", step !== 2 && "opacity-50 pointer-events-none")}>
              <DateTimePicker
                date={date}
                time={time}
                onDateChange={(d) => setValue("date", d)}
                onTimeChange={(t) => {
                  setValue("time", t);
                  if (step === 2) setTimeout(() => setStep(3), 300);
                }}
              />
            </div>
          </section>
        )}

        {/* Step 3 */}
        {step >= 3 && (
          <section aria-labelledby="step3-heading">
            <StepHeader step={3} active={step === 3} complete={step > 3} />
            <div className={cn("mt-4", step !== 3 && "opacity-50 pointer-events-none")}>
              <CustomerForm />
              {step === 3 && (
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={advanceStep}
                    className="w-full h-12 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                  >
                    Continue to payment
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Step 4 */}
        {step >= 4 && (
          <section aria-labelledby="step4-heading">
            <StepHeader step={4} active={step === 4} complete={step > 4} />
            <div className="mt-4">
              {paymentError && (
                <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {paymentError}
                </div>
              )}
              {isSubmitting ? (
                <div className="text-center py-8 text-slate-500">Saving your booking...</div>
              ) : (
                <PaddleCheckout
                  formData={getValues()}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  disabled={!canProceedFrom(3)}
                />
              )}
            </div>
          </section>
        )}
      </div>
    </FormProvider>
  );
}

function StepHeader({
  step,
  active,
  complete,
}: {
  step: Step;
  active?: boolean;
  complete?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold",
          complete
            ? "bg-slate-900 text-white"
            : active
            ? "border-2 border-slate-900 text-slate-900"
            : "border-2 border-slate-300 text-slate-400"
        )}
      >
        {complete ? (
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          step
        )}
      </span>
      <h2
        id={`step${step}-heading`}
        className={cn(
          "font-semibold",
          active ? "text-slate-900" : complete ? "text-slate-700" : "text-slate-400"
        )}
      >
        {STEP_LABELS[step]}
      </h2>
    </div>
  );
}
