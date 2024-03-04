"use client";

import { useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { User } from "@prisma/client";
import { navLinks } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

export const MobileSidebar = ({ user }: { user: User | null }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <HiMenuAlt2 className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="text-sm" side="left">
        <Logo onClick={handleClose} />
        <nav className="flex flex-col mt-6">
          {navLinks(user?.mode).map(({ label, href, icon: Icon }) => {
            const isActive =
              pathname === href ||
              searchParams.get("category") === label.toLowerCase();
            return (
              <Link
                onClick={handleClose}
                href={href}
                key={label}
                className={cn(
                  "relative flex items-center gap-4 px-3 py-2.5 font-medium hover:bg-secondary transition-colors rounded-md text-base",
                  isActive && "bg-secondary"
                )}
              >
                <Icon className="h-[18px] w-[18px]" />
                {label}
                {isActive && (
                  <span className="right-0 h-full w-1.5 rounded-full bg-primary absolute top-0" />
                )}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
