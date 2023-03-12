"use client";

import { ThemeProvider } from "next-themes";
import { useSelectedLayoutSegment } from "next/navigation";
import type { PropsWithChildren } from "react";

function NextThemeProvider({ children }: PropsWithChildren) {
  const segment = useSelectedLayoutSegment();
  const forcedTheme =
    segment === "(home)" ? "dark" : segment === "auth" ? "light" : undefined;

  return (
    <ThemeProvider
      defaultTheme="system"
      enableSystem
      enableColorScheme
      forcedTheme={forcedTheme}
    >
      {children}
    </ThemeProvider>
  );
}

export default NextThemeProvider;
