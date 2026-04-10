import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type LandingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg";
};

const sizeClasses: Record<NonNullable<LandingButtonProps["size"]>, string> = {
  sm: "text-[0.65rem] tracking-[0.25em] px-6 py-3",
  md: "text-xs tracking-[0.25em] px-8 py-3",
  lg: "text-sm tracking-[0.2em] px-12 py-4",
};

export default function LandingButton({
  size = "lg",
  className,
  type = "button",
  ...props
}: LandingButtonProps) {
  return (
    <button
      type={type}
      className={cn("ghost-btn font-grotesk uppercase", sizeClasses[size], className)}
      {...props}
    />
  );
}
