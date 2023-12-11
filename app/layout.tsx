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
  metadataBase: new URL("https://cozycinema.vercel.app/"),
  title: {
    default: "CozyCinema - Stream Movies and TV Shows for Free",
    template: "%s - CozyCinema",
  },
  verification: {
    google: "fJtqvykAw1qD_OU9FtxauJHsoE-r9dLhYACgaq022sw",
  },
  keywords:
    "cozy cinema, cozy, cinema, cozycinema, movies, tv shows, free, streaming, watch, online, stream, watch movies, watch tv shows, watch online, watch free, watch free movies, watch free tv shows, watch free online, watch free stream, watch free streaming, watch free movies online, watch free tv shows online, watch free movies stream, watch free tv shows stream, watch free movies streaming, watch free tv shows streaming, watch free movies online stream, watch free tv shows online stream, watch free movies online streaming, watch free tv shows online streaming, Free movie streaming, On-demand TV shows, HD movie quality, Watch movies online free, Binge-worthy TV series, Family-friendly film selection, New release streaming, Personalized watchlist feature, No subscription movie access, Genre-specific movie recommendations, High-quality video streaming, Accessible movie library, Exclusive TV series catalog, Ad-free streaming experience, User-friendly movie platform, Latest movie releases online, Unlimited streaming access, Dynamic content categories, Customizable viewing preferences, Instant access to diverse genres, Cinematic entertainment, Cozy streaming experience, Premium movie selection, Diverse film genres, Cost-free movie access, Anywhere, anytime viewing, Cinematic escape at home",
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
