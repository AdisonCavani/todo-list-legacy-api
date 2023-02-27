import type { PropsWithChildren } from "react";
import ToastWrapper from "@components/toastWrapper";
import Header from "@components/app/header";

export const dynamic = "force-dynamic";

// TODO: pick a nice font

function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="font-sans">
      <head />
      <body className="bg-neutral-50">
        {/* @ts-expect-error */}
        <Header />
        <main className="w-full px-6 py-8">{children}</main>
        <ToastWrapper />
      </body>
    </html>
  );
}

export default Layout;
