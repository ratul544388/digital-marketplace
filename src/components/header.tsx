"use client";

import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Logo } from "./logo";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { buttonVariants } from "./ui/button";
import { UserButton } from "./user-button";
import { Cart } from "./cart";

interface HeaderProps {
  user: User | null;
}

export const Header = ({ user }: HeaderProps) => {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isAuthRoute = ["/sign-in", "/sign-up"].includes(pathname);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b h-[60px]">
      <MaxWidthWrapper className="h-full flex items-center justify-between bg-background">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="flex items-center gap-3">
            {navLinks(user?.mode).map(({ label, href }) => {
              const isActive =
                pathname === href ||
                (pathname === "/products" &&
                  searchParams.get("category") === label.toLowerCase());
              return (
                <Link
                  href={href}
                  key={label}
                  className={cn(
                    "relative text-sm font-medium px-4 py-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="ActiveLink"
                      className="inset-x-3 h-1 top-[100%] absolute bg-primary z-50 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Cart />
          {isSignedIn ? (
            <UserButton mode={user?.mode!} />
          ) : (
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({ size: "sm" }),
                isAuthRoute && "hidden"
              )}
            >
              <SignInButton>Get Started</SignInButton>
            </Link>
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  );
};
