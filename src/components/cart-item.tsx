"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { Image } from "./Image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { UserAvatar } from "./user-avatar";
import { User } from "@prisma/client";
import { Sue_Ellen_Francisco } from "next/font/google";

interface CartItemProps {
  name: string;
  slug?: string;
  category: string;
  onRemove?: () => void;
  price: number;
  image: string;
  blurDataUrl: string;
  className?: string;
  seller?: User | null;
  fileUrl?: string;
}

export const CartItem = ({
  name,
  slug,
  category,
  onRemove,
  price,
  blurDataUrl,
  image,
  className,
  seller,
  fileUrl,
}: CartItemProps) => {
  return (
    <div
      className={cn(
        "relative flex text-sm h-fit items-center gap-3 px-3 py-2 hover:bg-secondary transition-colors",
        className
      )}
    >
      <Image
        src={image}
        alt={name}
        blurDataURL={blurDataUrl}
        className="max-w-[100px]"
      />
      <div className="text-sm w-full">
        {slug ? (
          <Link
            href={`/products/${slug}`}
            className="font-medium line-clamp-2 hover:underline"
          >
            {name}
          </Link>
        ) : (
          <h3 className="font-medium line-clamp-2">{name}</h3>
        )}
        {onRemove && (
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 p-2 rounded-full mt-1 h-fit text-muted-foreground hover:bg-background"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
        <p className="font-semibold mt-1">${price.toFixed(2)}</p>
        <p className="text-muted-foreground mt-1">{category}</p>
        <div className="flex items-center justify-between">
          {seller && (
            <div className="gap-2 flex mt-1.5 text-xs text-muted-foreground">
              Seller:
              <Link
                target="_blank"
                href={`/profile/${seller.id}`}
                className="text-foreground hover:underline"
              >
                {seller.name}
              </Link>
            </div>
          )}
          {fileUrl && (
            <Link
              href={fileUrl}
              className="font-medium mt-1 text-sm text-primary underline"
            >
              Download Assets
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
