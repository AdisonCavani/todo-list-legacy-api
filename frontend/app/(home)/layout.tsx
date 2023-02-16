"use client";
import AuthWrapper from "@components/authWrapper";
import ReactQueryWrapper from "@components/reactQueryWrapper";
import type { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body>
        <ReactQueryWrapper>
          <AuthWrapper>
            <main className="w-full px-4 py-8 sm:p-8">{children}</main>
          </AuthWrapper>
        </ReactQueryWrapper>
      </body>
    </html>
  );
}

export default Layout;
