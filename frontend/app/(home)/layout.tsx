import type { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body>
        <main className="w-full px-4 py-8 sm:p-8">{children}</main>
      </body>
    </html>
  );
}

export default Layout;
