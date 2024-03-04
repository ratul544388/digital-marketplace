import { Image, Product } from "@prisma/client";

export type productWithImages = Product & {
  images: Image[];
};