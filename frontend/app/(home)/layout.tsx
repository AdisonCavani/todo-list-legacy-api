import type { PropsWithChildren } from "react";
import Header from "@components/home/header";

function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* @ts-expect-error */}
        <Header />
        <main className="w-full px-4 py-8 sm:p-8">{children}</main>
      </body>
    </html>
  );
}

export default Layout;
