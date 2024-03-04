import { Image, Product } from "@prisma/client";
import { IconType } from "react-icons/lib";

export type productWithImages = Product & {
  images: Image[];
};

export type FooterItemType = {
  label: string;
  isIcon?: boolean;
  links: {
    label?: string;
    icon?: IconType;
    href: string;
  }[]
};
