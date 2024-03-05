"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchInputProps {
  type: "button" | "input";
}

export const SearchInput = ({ type }: SearchInputProps) => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (type === "button") {
      router.push("/search");
      e.stopPropagation();
      e.preventDefault();
    }
  };
  return (
    <div
      role="button"
      onClick={handleClick}
      className="flex border rounded-md shadow-sm w-full max-w-[400px] group overflow-hidden"
    >
      <Input
        placeholder="Explore Icons and Logos..."
        className="shadow-none border-0 w-full peer focus-visible:ring-0"
      />
      <button className="h-9 min-w-9 flex items-center justify-center text-muted-foreground group-hover:text-primary peer-focus:text-primary">
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
};
