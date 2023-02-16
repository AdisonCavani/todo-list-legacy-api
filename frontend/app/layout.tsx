import "./globals.css";

import { Fragment, PropsWithChildren } from "react";

function RootLayout({ children }: PropsWithChildren) {
  return <Fragment>{children}</Fragment>;
}

export default RootLayout;
