import React from "react";

export function Textarea({
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={
        "w-full rounded-md border border-border bg-bg px-3 py-2 text-text resize-none " +
        className
      }
    />
  );
}
