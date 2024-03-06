"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useDebounceValue } from "usehooks-ts";
import { use, useEffect, useRef, useState } from "react";
import { RotateCounterClockwiseIcon } from "@radix-ui/react-icons";

interface SearchInputProps {
  className?: string;
  initialFocus?: boolean;
}

export const SearchInput = ({
  className,
  initialFocus = false,
}: SearchInputProps) => {
  const [value, setValue] = useState("");
  const [debounceValue] = useDebounceValue(value, 500);
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debounceValue) {
      router.push(`${pathname}?q=${debounceValue}`);
    } else {
      router.push(pathname);
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [debounceValue, pathname, router]);

  return (
    <div
      role="button"
      className={cn("w-full max-w-[500px] mt-5 relative group", className)}
    >
      <Input
        ref={inputRef}
        placeholder="Explore Icons and Logos..."
        className="focus-visible:ring-primary"
        autoFocus={initialFocus}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="absolute right-0 top-0 h-9 min-w-9 flex items-center justify-center text-muted-foreground group-hover:text-primary peer-focus:text-primary">
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
};
