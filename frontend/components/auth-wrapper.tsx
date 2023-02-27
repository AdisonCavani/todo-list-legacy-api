"use client";

import type { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

function AuthWrapper({ children }: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthWrapper;
