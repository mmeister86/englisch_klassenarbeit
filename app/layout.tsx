import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/contexts/ProgressContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Englisch Lern-App - 5. Klasse",
  description: "Interaktive Englisch-Lern-WebApp für die 5. Klasse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          defer
          src="https://umami.matthias.lol/script.js"
          data-website-id="41a02324-9d86-43d4-9974-9464d35f6940"
        ></script>
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  );
}
