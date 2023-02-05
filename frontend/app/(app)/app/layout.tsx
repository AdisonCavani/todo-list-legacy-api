import { Inter } from "@next/font/google";
import type { PropsWithChildren } from "react";
import Header from "@components/Header";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`font-sans ${fontInter.variable} antialiased`}>
      <head />
      <body className="bg-[#f9fafe]">
        <Header />
        <main className="w-full px-4 py-8 sm:p-8">{children}</main>
      </body>
    </html>
  );
}

export default Layout;
