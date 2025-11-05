"use client";

import Link from "next/link";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  className?: string;
  href?: string;
};

export default function Button({ children, variant = "primary", className = "", href, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium";
  const variants =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-100 text-gray-800 hover:bg-gray-200";

  const cls = `${base} ${variants} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
