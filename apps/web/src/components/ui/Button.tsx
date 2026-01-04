import React from "react";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors cursor-pointer";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover",
    ghost: "bg-transparent text-text hover:bg-bg",
  };

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    />
  );
}
