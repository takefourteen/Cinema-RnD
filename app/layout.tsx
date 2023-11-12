import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

import { Toaster } from "sonner";
import Providers from "@/providers/Providers";

const maxSans = localFont({
  src: [
    {
      path: "../public/fonts/MaxSans-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/MaxSans-Semi.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "../public/fonts/MaxSans-Bold.woff2",
      style: "normal",
      weight: "700",
    },
  ],
  display: "swap",
  adjustFontFallback: "Arial",
  variable: "--font-max-sans",
});

// ===== METADATA ===== //
export const metadata: Metadata = {
  title: {
    default: "CozyCinema - Stream Movies and TV Shows for Free",
    template: "%s - CozyCinema",
    
  },
  description:
    "Indulge in a cozy streaming experience at CozyCinema. Watch unlimited movies and TV series for free, anytime, anywhere. Discover a vast collection of cinematic gems tailored for your comfort. No subscription required. Your ultimate destination for premium, cost-free entertainment.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${maxSans.variable} bg-gradient-to-tr from-[#070739] via-black to-[#060212] font-sans text-white`}
      >
        <Providers session={session}>
          {children}

          {/* Get Toast Notifications */}
          <Suspense fallback={null}>
            <Toaster richColors position="top-center" expand closeButton />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
