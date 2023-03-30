interface Button2Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "default" | "blue";
}

function Button2({ variant, ...props }: Button2Props) {
  return (
    <button
      className={variant === "default" ? "bg-black" : "bg-blue-600"}
      {...props}
    />
  );
}

Button2.displayName = "Button";

export { Button2 };
