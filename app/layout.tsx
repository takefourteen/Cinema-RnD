import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

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
  title: "Movie Streaming App",
  description:
    "Welcome to the streaming platform where you can enjoy a vast selection of movies and TV series without any cost.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${maxSans.variable} font-sans`}>{children}</body>
    </html>
  );
}
