import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { GlobalErrorHandler } from "@/components/GlobalErrorHandler";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider/ToastProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RinSetu | Premium Digital Lending Platform",
  description: "Experience fast, transparent, and secure digital lending. RinSetu connects you with RBI-registered partners for instant loan approvals.",
  keywords: ["loan", "fintech", "personal loan", "digital lending", "RinSetu", "credit"],
  authors: [{ name: "RinSetu Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col bg-background text-foreground font-sans scroll-smooth"
        cz-shortcut-listen="true"
      
      >
        
          <Providers>{children}</Providers>
          <ToastProvider />
          <GlobalErrorHandler />
      
      </body>
    </html>
  );
}
