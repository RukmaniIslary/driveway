import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://xoxocafe.xyz"),
  title: {
    default: "XoxoCafe — Mobile Pet Grooming",
    template: "%s | XoxoCafe",
  },
  description:
    "XoxoCafe brings professional mobile pet grooming right to your door. Book online in minutes and secure your spot with a small deposit.",
  keywords: [
    "mobile pet grooming",
    "dog grooming",
    "pet grooming near me",
    "mobile groomer",
    "XoxoCafe",
    "pet care",
    "dog bath",
    "nail trim",
    "de-shed treatment",
  ],
  authors: [{ name: "XoxoCafe" }],
  creator: "XoxoCafe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://xoxocafe.xyz",
    siteName: "XoxoCafe",
    title: "XoxoCafe — Mobile Pet Grooming",
    description:
      "Professional mobile pet grooming delivered to your door. Book online and secure your spot with a deposit.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "XoxoCafe Mobile Pet Grooming",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XoxoCafe — Mobile Pet Grooming",
    description:
      "Professional mobile pet grooming delivered to your door. Book online and secure your spot with a deposit.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
