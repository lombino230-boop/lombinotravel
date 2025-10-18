import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const inter = Inter({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Omio - Biglietti economici per treni, autobus e voli",
  description: "Prenota biglietti treno, autobus, aereo e traghetto in un'unica app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <ClientBody className={inter.className}>{children}</ClientBody>
    </html>
  );
}
