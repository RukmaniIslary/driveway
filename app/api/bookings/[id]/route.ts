import { NextResponse } from "next/server";
import { getBookingById, updateBookingStatus } from "@/lib/bookings";
import type { Booking } from "@/lib/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const booking = getBookingById(id);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }
  return NextResponse.json({ booking });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await request.json()) as { status: Booking["status"] };
  const validStatuses: Booking["status"][] = ["confirmed", "completed", "no-show", "cancelled"];
  if (!validStatuses.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const updated = updateBookingStatus(id, body.status);
  if (!updated) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
