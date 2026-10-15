import React from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "ghost"
  | "status"
  | "badge";

type ButtonSize = "sm" | "md" | "lg" | "icon" | "none";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "rounded-lg border border-primary bg-primary text-white hover:opacity-90",
    secondary: "rounded-lg bg-slate-100 text-slate-900 hover:bg-slate-200",
    outline:
      "rounded-lg border border-border bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-primary",
    danger:
      "rounded-lg border border-border  text-red-400 hover:bg-red-50 hover:text-red-500",
    ghost: "rounded-lg bg-transparent text-slate-600 hover:bg-slate-100",
    status: "rounded-full transition hover:opacity-80", // Custom overrides for things like emerald-50 amber-100
    badge: "rounded-lg font-medium transition",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2",
    icon: "h-9 w-9 p-0",
    none: "",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
