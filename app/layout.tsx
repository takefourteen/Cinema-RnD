import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";

import { Toaster } from "sonner";
import Providers from "@/providers/Providers";
import Footer from "@/components/Footer";
import Script from "next/script";

const maxSans = localFont({
  src: [
    {
      path: "../assets/fonts/MaxSans-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../assets/fonts/MaxSans-Semi.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "../assets/fonts/MaxSans-Bold.woff2",
      style: "normal",
      weight: "700",
    },
  ],
  display: "swap",
  adjustFontFallback: "Arial",
  variable: "--font-max-sans",
});

export const metadata: Metadata = {
  title: "CozyCinema - Where Every Screen Feels Like Home",
  description:
    "Welcome to CozyCinema, where the magic of movies and the comfort of your favorite couch come together. Explore a vast selection of movies and TV series, all designed to wrap you in the cozy embrace of entertainment. Enjoy the cinematic escape without any cost. Your comfort, our priority.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${maxSans.variable} bg-gradient-to-tr from-[#070739] via-black to-[#060212] font-sans text-white`}
      >
        <Providers>
          {children}

          {/* Get Toast Notifications */}
          <Suspense fallback={null}>
            <Toaster richColors position="top-center" closeButton expand />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
