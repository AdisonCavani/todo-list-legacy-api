import { Fragment, PropsWithChildren } from "react";
import "./globals.css";

function RootLayout({ children }: PropsWithChildren) {
  return <Fragment>{children}</Fragment>;
}

export default RootLayout;
