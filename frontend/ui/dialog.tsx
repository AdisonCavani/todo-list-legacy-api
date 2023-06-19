import { cn } from "@lib/utils";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  HTMLAttributes,
} from "react";

const Dialog = forwardRef<
  ElementRef<"dialog">,
  ComponentPropsWithoutRef<"dialog">
>(({ className, children, ...props }, ref) => (
  <dialog
    ref={ref}
    onClick={(event) => event.currentTarget.close()}
    className={cn(
      "rounded-lg p-0 sm:max-w-lg",
      "animate-in zoom-in-90",
      "backdrop:bg-black/30 backdrop:backdrop-blur-sm",
      className
    )}
    {...props}
  >
    <div onClick={(event) => event.stopPropagation()} className="space-y-4 p-6">
      {children}
    </div>
  </dialog>
));

const DialogHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-left", className)}
    {...props}
  />
);

const DialogFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse gap-y-2 sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);

const DialogTitle = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
);

const DialogDescription = ({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);

export { Dialog, DialogHeader, DialogFooter, DialogTitle, DialogDescription };
