"use client";

import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useOnClickOutside } from "../hooks/use-on-click-outside";

interface SelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));
  return (
    <div ref={ref} className="relative">
      <Button
        disabled={disabled}
        onClick={() => setOpen(!open)}
        type="button"
        variant="outline"
        className={cn(
          "justify-start w-full hover:bg-transparent capitalize",
          !value && "text-muted-foreground font-normal pl-3"
        )}
      >
        {value || placeholder}
        <ChevronDownIcon
          className={cn(
            "h-4 w-4 ml-auto text-muted-foreground transition ease-in",
            open && "rotate-180"
          )}
        />
      </Button>
      <motion.section
        variants={{
          open: { y: 0, opacity: 1, pointerEvents: "auto" },
          closed: { y: 15, opacity: 0, pointerEvents: "none" },
        }}
        transition={{ ease: [0.32, 0, 0.67, 0], duration: 0.15 }}
        initial="closed"
        animate={open ? "open" : "closed"}
        className="w-full absolute z-50 flex flex-col py-2 bg-background border rounded-md shadow-md"
      >
        {options.map((option) => (
          <Button
            onClick={() => {
              onChange(option);
              setOpen(false);
            }}
            type="button"
            variant="ghost"
            key={option}
            className="px-4 py-2 rounded-none justify-start font-medium text_light capitalize"
          >
            {option}
            {value === option && (
              <CheckIcon className="ml-auto text-muted-foreground" />
            )}
          </Button>
        ))}
      </motion.section>
    </div>
  );
};
