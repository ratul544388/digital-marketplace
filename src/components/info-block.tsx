"use client";

import { cn } from "@/lib/utils";

interface InfoBlockProps {
  label: string;
  value: number;
  className?: string;
}

export const InfoBlock = ({ label, value, className }: InfoBlockProps) => {
  return (
    <div className={cn("flex items-center justify-between text-muted-foreground", className)}>
      {label}
      <p className="text-foreground">${value.toFixed(2)}</p>
    </div>
  );
};
