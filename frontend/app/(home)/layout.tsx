import Header from "@components/home/header";
import type { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="pt-12">{children}</main>
    </>
  );
}

export default Layout;
