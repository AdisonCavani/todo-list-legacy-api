import Header from "@components/Header";
import type { PropsWithChildren } from "react";

function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="w-full px-6 py-8">{children}</main>
    </>
  );
}

export default AppLayout;
