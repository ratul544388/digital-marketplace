"use client";

import { productWithImages } from "@/types";
import { User } from "@prisma/client";
import { HeartButton } from "./heart-button";
import { ImageSlider } from "./image-slider";
import Link from "next/link";

interface ProductCardProps {
  product: productWithImages;
  user: User | null;
}

export const ProductCard = ({ product, user }: ProductCardProps) => {
  const initialFavorite = user?.favorites.some((item) => item === product.id);
  const href =
    user?.mode === "SELLER"
      ? `/seller/products/${product.slug}/edit`
      : `/products/${product.slug}`;
  return (
    <Link
      href={href}
      className="relative text-sm shadow_sm hover:shadow_lg dark:border rounded-md"
    >
      <ImageSlider images={product.images} />
      <div className="p-3">
        <h3 className="font-medium line-clamp-1">{product.name}</h3>
        <p className="text-muted-foreground mt-1">{product.category}</p>
        <h3 className="font-bold mt-1">${product.price}</h3>
      </div>
      {user?.mode !== "SELLER" && (
        <HeartButton
          className="absolute top-0.5 right-0.5"
          initialFavorite={!!initialFavorite}
          productId={product.id}
        />
      )}
    </Link>
  );
};
