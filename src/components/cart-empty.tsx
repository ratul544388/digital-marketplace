"use client";

import Link from "next/link";
import { Image } from "./Image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { FaArrowRightLong } from "react-icons/fa6";

interface CartEmptyProps {
  onClose?: () => void;
}

export const CartEmpty = ({ onClose }: CartEmptyProps) => {
  return (
    <div className="h-full flex flex-col items-center p-8">
      <Image
        src="/images/empty-cart.png"
        alt="Empty cart"
        className="border-0 max-w-[250px]"
      />
      <p className="mt-5 text-sm text-muted-foreground">Your cart is empty</p>
      <Link
        onClick={onClose}
        href="/products"
        className={cn(buttonVariants(), "w-full mt-3 group max-w-[400px]")}
      >
        Continue shopping
        <FaArrowRightLong className="h-4 w-4 ml-2 group-hover:translate-x-2 transition duration-300" />
      </Link>
    </div>
  );
};
