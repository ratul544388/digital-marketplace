"use client";
import NextImage from "next/image";
import { cn } from "@/lib/utils";

interface ImageProps {
  src: string;
  alt: string;
  blurDataURL?: string;
  className?: string;
}

export const Image = ({ src, alt, blurDataURL, className }: ImageProps) => {
  return (
    <div
      className={cn(
        "w-full relative aspect-square border rounded-md overflow-hidden",
        className
      )}
    >
      <NextImage
        src={src}
        alt={alt}
        fill
        {...(blurDataURL ? { placeholder: "blur", blurDataURL } : {})}
        className="object-cover"
      />
    </div>
  );
};
