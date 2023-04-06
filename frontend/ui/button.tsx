import { cn } from "@lib/utils";
import { IconLoader2 } from "@tabler/icons-react";
import React from "react";

const sizeClassnames = {
  default: "h-10 py-2 px-4",
  xxs: "h-6 px-1 rounded-md",
  xs: "h-8 px-3 rounded-md",
  sm: "h-9 px-3 rounded-md",
  lg: "h-11 px-8 rounded-md",
};

const colorClassnames = {
  default:
    "bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-900",
  destructive: "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
  outline:
    "bg-transparent border border-neutral-200 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100",
  subtle:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-600 dark:text-neutral-100 dark:hover:bg-neutral-700",
  ghost:
    "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:text-neutral-100 dark:hover:text-neutral-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
  link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-neutral-900 dark:text-neutral-100 hover:bg-transparent dark:hover:bg-transparent",
  blue: "bg-blue-100 text-blue-900 hover:bg-blue-200 dark:bg-blue-600 dark:text-blue-100 dark:hover:bg-blue-700",
  yellow:
    "bg-yellow-300 dark:bg-yellow-400 text-neutral-900 dark:text-neutral-900 hover:bg-yellow-400 dark:hover:bg-yellow-500 focus:outline-none focus:ring-2 dark:focus:ring-yellow-600 focus:ring-yellow-500 active:bg-yellow-400 hover:active:bg-yellow-500 dark:hover:active:bg-yellow-600",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof sizeClassnames;
  color?: keyof typeof colorClassnames;
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      size = "default",
      color = "default",
      disabled,
      loading,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        aria-busy={loading}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-x-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:bg-neutral-100 dark:hover:bg-neutral-800 dark:focus:ring-neutral-400 dark:focus:ring-offset-neutral-900 dark:data-[state=open]:bg-neutral-800",
          sizeClassnames[size],
          colorClassnames[color],
          loading && "disabled:cursor-progress",
          className
        )}
        {...props}
      >
        {loading && <IconLoader2 className="h-4 w-4 animate-spin" />}
        {icon}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
