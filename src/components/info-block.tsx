"use client";

import { cn, formatPrice } from "@/lib/utils";

interface InfoBlockProps {
  label: string;
  value: number;
  className?: string;
}

export const InfoBlock = ({ label, value, className }: InfoBlockProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between text-muted-foreground",
        className
      )}
    >
      {label}
      <p className="text-foreground">{formatPrice(value)}</p>
    </div>
  );
};
