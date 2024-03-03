"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MotionLinkProps {
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "icon" | "sm";
  href: string;
  children: ReactNode;
  className?: string;
}

export const MotionLink = ({
  variant,
  size,
  href,
  children,
  className,
}: MotionLinkProps) => {
  const Comp = motion(Link);
  return (
    <Comp
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      whileTap={{ scale: 1.05 }}
    >
      {children}
    </Comp>
  );
};
