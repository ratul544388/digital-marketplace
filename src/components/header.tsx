"use client";

import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Cart } from "./cart";
import { Logo } from "./logo";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { MobileSidebar } from "./mobile-sidebar";
import { ThemeToggler } from "./theme-toggler";
import { buttonVariants } from "./ui/button";
import { UserButton } from "./user-button";

interface HeaderProps {
  user: User | null;
}

export const Header = ({ user }: HeaderProps) => {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isAuthRoute = ["/sign-in", "/sign-up"].includes(pathname);

  return (
    <header className="fixed inset-x-0 top-0 z-[9999] border-b h-[60px]">
      <MaxWidthWrapper className="h-full flex items-center justify-between bg-background">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="sm:hidden">
              <MobileSidebar user={user} />
            </div>
            <Logo />
          </div>
          <nav className="sm:flex items-center gap-1 hidden">
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
                    "relative whitespace-nowrap text-sm font-medium px-4 py-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
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
          {pathname !== "/search" && user?.mode !== "SELLER" && (
            <>
              <Link
                href="/search"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "gap-20 justify-between group hidden lg:flex"
                )}
              >
                <span className="text-muted-foreground">
                  Explore Icons and Logos...
                </span>
                <Search className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link
                href="/search"
                className="lg:hidden text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-accent"
              >
                <Search className="h-5 w-5" />
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-6">
          <ThemeToggler />
          {isSignedIn ? (
            <>
              {user?.mode !== "SELLER" && <Cart />}
              <UserButton mode={user?.mode!} />
            </>
          ) : (
            <>
              <SignUpButton>
                <Link
                  href="/sign-in"
                  className={cn(
                    buttonVariants({ size: "sm", variant: "ghost" }),
                    "hidden sm:flex",
                    isAuthRoute && "sm:hidden"
                  )}
                >
                  Create an account
                </Link>
              </SignUpButton>
              <SignInButton>
                <Link
                  href="/sign-in"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    isAuthRoute && "hidden"
                  )}
                >
                  Login
                </Link>
              </SignInButton>
            </>
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  );
};
