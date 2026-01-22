import type { Metadata } from "next";
import { Sora, Unbounded } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vocabulary Image Generator",
  description:
    "AI-powered tool that generates educational flashcard images for vocabulary words",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${unbounded.variable} antialiased`}>
        <div className="min-h-screen bg-background app-shell">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
