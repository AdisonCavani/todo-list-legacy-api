import { Inter } from "@next/font/google";
import type { PropsWithChildren } from "react";
import Header from "@components/Header";

export const dynamic = "force-dynamic";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`font-sans ${fontInter.variable} antialiased`}>
      <head />
      <body className="bg-neutral-100">
        <Header />
        <main className="w-full px-6 py-8">{children}</main>
      </body>
    </html>
  );
}

export default Layout;
