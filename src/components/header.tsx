"use client";

import { ChevronDown } from "lucide-react";
import { Logo } from "./logo";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { Button } from "./ui/button";
import { UserButton } from "./user-button";

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b h-[60px]">
      <MaxWidthWrapper className="h-full flex items-center justify-between bg-background">
        <div className="flex items-center gap-8">
          <Logo />
          <Button variant="ghost">
            UI Kits
            <ChevronDown className="h-4 w-4 ml-2 text-muted-foreground" />
          </Button>
        </div>
        <UserButton/>
      </MaxWidthWrapper>
    </header>
  );
};
