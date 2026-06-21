"use client";

import { useFormContext } from "react-hook-form";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { US_STATES } from "@/lib/constants";
import type { BookingFormData } from "@/lib/types";

export default function CustomerForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookingFormData>();

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Your name"
          placeholder="Jane Smith"
          error={errors.customerName?.message}
          {...register("customerName", { required: "Name is required" })}
        />
        <Input
          label="Phone"
          type="tel"
          placeholder="(555) 000-0000"
          error={errors.phone?.message}
          {...register("phone", {
            required: "Phone is required",
            pattern: {
              value: /^[\d\s\-().+]{7,20}$/,
              message: "Enter a valid phone number",
            },
          })}
        />
      </div>

      <p className="text-sm font-medium text-slate-700">Service address</p>
      <Input
        label="Street"
        placeholder="123 Main St"
        error={errors.street?.message}
        {...register("street", { required: "Street is required" })}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <Input
          label="City"
          placeholder="Austin"
          error={errors.city?.message}
          {...register("city", { required: "City is required" })}
        />
        <Select
          label="State"
          error={errors.state?.message}
          {...register("state", { required: "State is required" })}
        >
          <option value="">Select state</option>
          {US_STATES.map((s) => (
            <option key={s.code} value={s.code}>
              {s.name}
            </option>
          ))}
        </Select>
        <Input
          label="ZIP"
          placeholder="78701"
          maxLength={10}
          error={errors.zip?.message}
          {...register("zip", {
            required: "ZIP is required",
            pattern: { value: /^\d{5}(-\d{4})?$/, message: "Enter a valid ZIP" },
          })}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Pet name"
          placeholder="Max"
          error={errors.petName?.message}
          {...register("petName", { required: "Pet name is required" })}
        />
        <Input
          label="Breed / size"
          placeholder="Labrador, large"
          error={errors.breedSize?.message}
          {...register("breedSize", { required: "Breed / size is required" })}
        />
      </div>

      <Textarea
        label="Notes for the groomer (optional)"
        placeholder="Any allergies, behavioral notes, or special requests..."
        {...register("notes")}
      />
    </div>
  );
}
