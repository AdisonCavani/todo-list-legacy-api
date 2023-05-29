"use client";

import { cn } from "@lib/utils";
import { useTheme } from "next-themes";
import { PropsWithChildren } from "react";
import { useState, useEffect } from "react";

type Props = {
  theme: "system" | "light" | "dark";
};

function ThemeButton({ theme, children }: PropsWithChildren<Props>) {
  const [mounted, setMounted] = useState(false);
  const { theme: currentTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label={`Switch theme to ${theme}`}
        className="p-1 text-neutral-400 dark:text-neutral-600"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      aria-label={`Switch theme to ${theme}`}
      onClick={() => setTheme(theme)}
      className={cn(
        "p-1",
        currentTheme != theme
          ? "text-neutral-400 dark:text-neutral-600"
          : "rounded-full bg-neutral-300 dark:bg-neutral-600"
      )}
    >
      {children}
    </button>
  );
}

export default ThemeButton;
