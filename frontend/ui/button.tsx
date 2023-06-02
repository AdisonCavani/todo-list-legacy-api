import { cn } from "@lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { IconLoader2 } from "@tabler/icons-react";
import { cva, VariantProps } from "cva";
import React from "react";

const buttonVariants = cva(
  "gap-x-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-900",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline:
          "bg-transparent border border-neutral-200 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800",
        subtle:
          "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-600 dark:text-neutral-100 dark:hover:bg-neutral-700",
        ghost:
          "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-neutral-900 dark:text-neutral-100 hover:bg-transparent dark:hover:bg-transparent",
        blue: "bg-blue-100 text-blue-900 hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-700",
        yellow:
          "bg-yellow-300 dark:bg-yellow-400 text-neutral-900 dark:text-neutral-900 hover:bg-yellow-400 dark:hover:bg-yellow-500 dark:hover:active:bg-yellow-600",
      },
      size: {
        default: "h-10 py-2 px-4",
        xxs: "h-6 px-1 rounded-md",
        xs: "h-8 px-3 rounded-md",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      disabled,
      loading,
      icon,
      children,
      variant,
      size,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        aria-busy={loading}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {loading && <IconLoader2 className="h-4 w-4 animate-spin" />}
        {icon}
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
