import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Driveway — Mobile Pet Grooming Booking",
  description:
    "Book your mobile pet grooming appointment and secure your spot with a deposit. Powered by Driveway.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
