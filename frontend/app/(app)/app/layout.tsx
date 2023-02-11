import { Inter } from "@next/font/google";
import type { PropsWithChildren } from "react";
import Header from "@components/header";
import ToastWrapper from "@components/toastWrapper";

export const dynamic = "force-dynamic";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`font-sans ${fontInter.variable} antialiased`}>
      <head />
      <body className="bg-neutral-50">
        <Header />
        <main className="w-full px-6 py-8">{children}</main>
        <ToastWrapper />
      </body>
    </html>
  );
}

export default Layout;
