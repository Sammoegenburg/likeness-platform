import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Echelon — AI Likeness Licensing Platform",
  description:
    "Enterprise-grade platform for licensing creator likeness in AI-generated advertising.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
