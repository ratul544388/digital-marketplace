"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function ThemeToggler() {
  const { setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleClick = (theme: "light" | "dark" | "system") => {
    setTheme(theme);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="px-0 py-2 w-[140px]">
        <Button
          variant="ghost"
          className="rounded-none w-full justify-start"
          onClick={() => handleClick("light")}
        >
          Light
        </Button>
        <Button
          variant="ghost"
          className="rounded-none w-full justify-start"
          onClick={() => handleClick("dark")}
        >
          Dark
        </Button>
        <Button
          variant="ghost"
          className="rounded-none w-full justify-start"
          onClick={() => handleClick("system")}
        >
          System
        </Button>
      </PopoverContent>
    </Popover>
  );
}
