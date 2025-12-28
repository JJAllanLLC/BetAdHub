import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BetAdHub - Advertise Your Betting Site",
  description: "Affordable dofollow advertising for sportsbooks, casinos, and betting sites",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://betadhub.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="a_UUuxsoxXxNv4sVs7U5X-JR2mgwC6knVjw5IfbCwkI" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
