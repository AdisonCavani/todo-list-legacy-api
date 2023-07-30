"use client";

import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";

function AuthWrapper({ children }: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthWrapper;
