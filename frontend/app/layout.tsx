import "./globals.css";
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
  themeColor: "#ffffff",

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
    <html lang="en" className={cn("font-sans antialiased", fontInter.variable)}>
      <head />
      <body className="bg-neutral-50">{children}</body>
    </html>
  );
}

export default RootLayout;
