import Header from "@components/home/header";
import type { PropsWithChildren } from "react";

export const dynamic = "force-dynamic";

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {/* @ts-expect-error */}
      <Header />
      <main className="w-full px-4 py-8 sm:p-8">{children}</main>
    </>
  );
}

export default Layout;
