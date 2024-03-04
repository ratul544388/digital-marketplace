import { Mode } from "@prisma/client";

export const transitionFee = 1.00

export const navLinks = (mode?: Mode) => {
  return mode === "SELLER"
    ? [
        {
          label: "Dashboard",
          href: "/seller/dashboard",
        },
        {
          label: "Products",
          href: "/seller/products",
        },
      ]
    : [
        {
          label: "Ui Kits",
          href: "/products?category=ui kits",
        },
        {
          label: "Icons",
          href: "/products?category=icons",
        },
      ];
};

export const categories = [
  "ui kits",
  "icons",
  "brand new",
  "tranding",
] as const;
