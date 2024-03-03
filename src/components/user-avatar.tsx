"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";

interface UserAvatarProps {
  alt?: string | null;
  src: string;
  className?: string;
}

export const UserAvatar = ({ src, alt, className }: UserAvatarProps) => {
  const fallback = alt?.split(" ").map((word) => word.charAt(0));
  return (
    <Avatar className={cn("w-[35px] h-[35px]", className)}>
      <AvatarImage src={src} className="object-cover"/>
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};
