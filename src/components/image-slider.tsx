"use client";

import { Image as DBImage } from "@prisma/client";
import { Image } from "./Image";
import { cn } from "@/lib/utils";

interface ImageSliderProps {
  images: DBImage[];
  className?: string;
}

export const ImageSlider = ({ images, className }: ImageSliderProps) => {
  return (
    <div className={cn(className)}>
      <Image
        src={images[0].url}
        alt="product Image"
        blurDataURL={images[0].blurDataUrl}
        className=""
      />
    </div>
  );
};
