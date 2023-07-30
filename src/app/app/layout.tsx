import Header from "@components/app/header";
import { Toaster } from "@ui/toaster";
import type { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <Toaster />
    </>
  );
}

export default Layout;
