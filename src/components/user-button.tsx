"use client";

import { changeAccountMode } from "@/actions/change-account-mode";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { useClerk, useUser } from "@clerk/nextjs";
import { Mode } from "@prisma/client";
import { motion } from "framer-motion";
import { ArrowLeftRight, Heart, LogOut, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { UserAvatar } from "./user-avatar";
import { cn } from "@/lib/utils";

interface UserButtonProps {
  mode: Mode;
}

export const UserButton = ({ mode }: UserButtonProps) => {
  const [_, startTransition] = useTransition();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useOnClickOutside(ref, () => setOpen(false));

  if (!isSignedIn) return;

  const animate = open ? "open" : "closed";

  const items = [
    {
      label: "Profile",
      icon: User2,
      onclick: () => router.push("/profile"),
    },
    {
      label: "Favorites",
      icon: Heart,
      onclick: () => router.push("/favorites"),
      buyerOnly: true,
    },
    {
      label:
        mode === "BUYER" ? "Switch to Seller Mode" : "Switch to Buyer Mode",
      icon: ArrowLeftRight,
      onclick: () => handleModeChange(),
    },
    {
      label: "Logout",
      icon: LogOut,
      onclick: () => signOut(() => router.push("/")),
    },
  ];

  const handleModeChange = () => {
    startTransition(() => {
      changeAccountMode().then(({ success, mode, error }) => {
        if (success) {
          toast.success(`You are now on ${mode.toLowerCase()} mode`);
          const url = mode === "SELLER" ? "/seller/dashboard" : "/";
          router.push(url);
          router.refresh();
        } else {
          toast.error(error);
        }
      });
    });
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full p-1 bg-transparent hover:bg-transparent focus:bg-blue-400"
      >
        <UserAvatar src={user.imageUrl} alt={user.fullName} />
      </button>
      <motion.div
        variants={{
          closed: { opacity: 0, y: 10, pointerEvents: "none" },
          open: { opacity: 1, y: 0, pointerEvents: "auto" },
        }}
        initial="closed"
        animate={animate}
        className="absolute pb-2 top-[calc(100%_+_5px)] right-0 w-[280px] bg-background dark:border shadow_sm rounded-lg"
      >
        <div className="flex items-center gap-3 px-4 pt-3 pb-5">
          <UserAvatar src={user.imageUrl} className="h-10 w-10" />
          <div className="text-sm">
            <p className="line-clamp-1 text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
            <h3 className="font-medium">{user.fullName}</h3>
          </div>
        </div>
        {items.map(({ label, icon: Icon, onclick, buyerOnly }) => (
          <Button
            onClick={() => {
              onclick();
              setOpen(false);
            }}
            variant="ghost"
            key={label}
            className={cn(
              "w-full rounded-none justify-start gap-4",
              buyerOnly && mode === "SELLER" && "hidden"
            )}
          >
            <Icon className="h-4 w-4 text-muted-foreground" />
            {label}
          </Button>
        ))}
        <span className="absolute top-0 right-3 bg-background -translate-y-1/2 h-4 w-4 shadow-[-3px_-3px_6px_rgba(0,0,0,0.05)] rotate-45 border border-r-0 border-b-0" />
      </motion.div>
    </div>
  );
};
