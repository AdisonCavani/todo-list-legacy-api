"use client";

import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

function NextThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="system" enableSystem enableColorScheme>
      {children}
    </ThemeProvider>
  );
}

export default NextThemeProvider;
