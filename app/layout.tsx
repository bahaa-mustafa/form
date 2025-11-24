import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Login / Register Form",
  description: "Authentication form with validation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

