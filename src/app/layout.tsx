import type { Metadata, Viewport } from "next"
import localFont from "next/font/local";
import "./globals.css";
import PushProvider from "@/components/providers/push-provider"
import React from "react"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Next.js PWA',
  description: 'A Progressive Web App built with Next.js',
  icons: [
    {
      url: '/icon.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      url: '/icon.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
};

export const viewport: Viewport = {
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default async function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <PushProvider>
        {children}
      </PushProvider>
      </body>
    </html>
  );
}
