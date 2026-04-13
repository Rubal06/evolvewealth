import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import "@/styles/globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";

const syne = Syne({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-display"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "EvolveWealth",
  description: "Stop Collecting Pennies. Start Building Empires."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
