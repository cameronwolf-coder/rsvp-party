import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "You're Invited — Housewarming / Birthday",
  description: "RSVP for Cam's housewarming and birthday celebration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
