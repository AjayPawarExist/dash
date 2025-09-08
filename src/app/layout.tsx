import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-gist-serif',
})

export const metadata: Metadata = {
  title: "Nirikshan — Verified, Geo‑Tagged Field Inspections",
  description:
    "Secure, geo‑tagged field inspections with device‑verified media, reviewer workflows, and citizen feedback within 4 km for transparent, accountable governance.",
  keywords: [
    "field inspections",
    "geo-tagged media",
    "citizen feedback",
    "governance",
    "auditable records",
    "watermark",
    "PostGIS",
  ],
  openGraph: {
    title: "Nirikshan — Verified, Geo‑Tagged Field Inspections",
    description:
      "Secure, geo‑tagged inspections with reviewer workflows and citizen feedback for accountable governance.",
    url: "https://",
    siteName: "Nirikshan",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirikshan — Verified, Geo‑Tagged Field Inspections",
    description:
      "Secure, geo‑tagged inspections with reviewer workflows and citizen feedback.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} antialiased`}
      >
        <main>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
