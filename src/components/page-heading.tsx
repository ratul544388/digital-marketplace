"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HeadingProps {
  children?: ReactNode;
  className?: string;
}

export const PageHeading = ({ children, className }: HeadingProps) => {
  return <h1 className={cn("text-2xl font-bold", className)}>{children}</h1>;
};
