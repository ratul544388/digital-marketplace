import { Mode } from "@prisma/client";
import { FaIcons } from "react-icons/fa6";
import { PiComputerTower, PiComputerTowerBold } from "react-icons/pi";
import { IoFileTrayStackedOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

export const transitionFee = 1.0;

export const navLinks = (mode?: Mode) => {
  return mode === "SELLER"
    ? [
        {
          label: "Dashboard",
          href: "/seller/dashboard",
          icon: RxDashboard,
        },
        {
          label: "Products",
          href: "/seller/products",
          icon: IoFileTrayStackedOutline,
        },
      ]
    : [
        {
          label: "Ui Kits",
          href: "/products?category=ui kits",
          icon: PiComputerTower,
        },
        {
          label: "Icons",
          href: "/products?category=icons",
          icon: FaIcons,
        },
      ];
};

export const categories = [
  "ui kits",
  "icons",
  "brand new",
  "tranding",
] as const;
