"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Button } from "./ui/button";

interface MotionButtonProps {
  variant: "default" | "outline" | "secondary";
  size: "default" | "icon" | "sm";
  onClick: () => void;
  children?: ReactNode;
}

export const MotionButton = ({
  variant,
  size,
  onClick,
  children,
}: MotionButtonProps) => {
  const Comp = motion(Button);
  return (
    <Comp variant={variant} size={size} whileTap={{ scale: 1.05 }}>
      {children}
    </Comp>
  );
};
