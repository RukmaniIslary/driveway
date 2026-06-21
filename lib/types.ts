export interface BookingFormData {
  serviceId: string;
  date: string;
  time: string;
  customerName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  petName: string;
  breedSize: string;
  notes: string;
}

export interface Booking extends BookingFormData {
  id: string;
  ticketNumber: string;
  depositAmount: number;
  totalAmount: number;
  serviceName: string;
  createdAt: string;
  status: "confirmed" | "completed" | "no-show" | "cancelled";
  paddleTransactionId?: string;
}
