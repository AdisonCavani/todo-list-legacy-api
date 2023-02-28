import Header from "@components/app/header";
import { Toaster } from "@ui/toaster";
import type { PropsWithChildren } from "react";

export const dynamic = "force-dynamic";

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {/* @ts-expect-error */}
      <Header />
      <main className="w-full px-6 py-8">{children}</main>
      <Toaster />
    </>
  );
}

export default Layout;
