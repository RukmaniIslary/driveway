import { NextResponse } from "next/server";
import { getAllBookings, addBooking, getWeeklyStats } from "@/lib/bookings";
import { SERVICES } from "@/lib/constants";
import { generateId, generateTicketNumber } from "@/lib/utils";
import type { Booking, BookingFormData } from "@/lib/types";

export async function GET() {
  const bookings = getAllBookings();
  const stats = getWeeklyStats();
  return NextResponse.json({ bookings, stats });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingFormData & {
      paddleTransactionId?: string;
    };

    const service = SERVICES.find((s) => s.id === body.serviceId);
    if (!service) {
      return NextResponse.json({ error: "Invalid service" }, { status: 400 });
    }

    // Basic field validation
    const required: (keyof BookingFormData)[] = [
      "serviceId", "date", "time", "customerName", "phone",
      "street", "city", "state", "zip", "petName", "breedSize",
    ];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const booking: Booking = {
      id: generateId(),
      ticketNumber: generateTicketNumber(),
      serviceId: body.serviceId,
      serviceName: service.name,
      date: body.date,
      time: body.time,
      customerName: body.customerName,
      phone: body.phone,
      street: body.street,
      city: body.city,
      state: body.state,
      zip: body.zip,
      petName: body.petName,
      breedSize: body.breedSize,
      notes: body.notes ?? "",
      depositAmount: service.deposit,
      totalAmount: service.price,
      createdAt: new Date().toISOString(),
      status: "confirmed",
      paddleTransactionId: body.paddleTransactionId,
    };

    addBooking(booking);
    return NextResponse.json({ booking }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
