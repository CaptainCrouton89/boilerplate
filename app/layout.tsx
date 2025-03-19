import SmoothScroll from "@/components/SmoothScroll";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevBounty - Code-First Freelance Platform",
  description:
    "A code-first freelance platform that connects clients with developers through direct code submissions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <meta property="og:title" content="Mavero" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mavero.dev/" />
        <meta
          property="og:image"
          content="https://d3fcqgp9jd8oav.cloudfront.net/mavero/logo.png"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          {children}
          {/* <CustomCursor /> */}
        </SmoothScroll>
      </body>
    </html>
  );
}
