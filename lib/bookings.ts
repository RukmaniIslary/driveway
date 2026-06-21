/**
 * In-memory booking store.
 * Replace with a real database (Postgres, Supabase, etc.) for production.
 */
import type { Booking } from "./types";

declare global {
  // eslint-disable-next-line no-var
  var __bookings: Booking[] | undefined;
}

function getStore(): Booking[] {
  if (!global.__bookings) global.__bookings = [];
  return global.__bookings;
}

export function getAllBookings(): Booking[] {
  return [...getStore()].sort(
    (a, b) => new Date(a.date + "T" + a.time).getTime() - new Date(b.date + "T" + b.time).getTime()
  );
}

export function getBookingById(id: string): Booking | undefined {
  return getStore().find((b) => b.id === id);
}

export function addBooking(booking: Booking): void {
  getStore().push(booking);
}

export function updateBookingStatus(id: string, status: Booking["status"]): boolean {
  const store = getStore();
  const idx = store.findIndex((b) => b.id === id);
  if (idx === -1) return false;
  store[idx] = { ...store[idx], status };
  return true;
}

export function getWeeklyStats() {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const weekBookings = getStore().filter(
    (b) => new Date(b.createdAt) >= startOfWeek
  );

  const depositsCollected = weekBookings.reduce((sum, b) => sum + b.depositAmount, 0);
  const noShowsPrevented = weekBookings.filter((b) => b.status === "no-show").length;

  return {
    bookingsThisWeek: weekBookings.length,
    depositsCollected,
    noShowsPrevented,
  };
}
