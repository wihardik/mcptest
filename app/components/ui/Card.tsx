import React from "react";

export default function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 border rounded-lg bg-white ${className}`.trim()}>{children}</div>;
}
