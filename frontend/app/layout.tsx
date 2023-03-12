import "./globals.css";
import NextThemeProvider from "@components/theme-provider";
import { ColorRecordType, twindConfig } from "@lib/twind";
import { cn } from "@lib/utils";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: {
    default: "To-do list",
    template: "%s | To-do list",
  },
  description: "Managing your tasks has never been simpler before.",

  manifest: "/static/manifest.json",
  themeColor: [
    {
      color: (twindConfig.colors.neutral as ColorRecordType)[50],
      media: "(prefers-color-scheme: light)",
    },
    {
      color: (twindConfig.colors.neutral as ColorRecordType)[900],
      media: "(prefers-color-scheme: dark)",
    },
  ],

  icons: {
    icon: [
      {
        url: "/static/favicons/favicon.ico",
      },
    ],
    apple: [
      {
        url: "/static/favicons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={cn("font-sans antialiased", fontInter.variable)}
      suppressHydrationWarning
    >
      <head />
      <body className="bg-neutral-50 dark:bg-neutral-900">
        <NextThemeProvider>{children}</NextThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
