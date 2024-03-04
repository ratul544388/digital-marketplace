import { FooterItemType } from "@/types";
import { Mode } from "@prisma/client";
import { FaFacebook, FaIcons, FaInstagram, FaTwitter } from "react-icons/fa6";
import { IoFileTrayStackedOutline, IoHomeOutline } from "react-icons/io5";
import { PiComputerTower } from "react-icons/pi";
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
          label: "Home",
          href: "/",
          icon: IoHomeOutline,
        },
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

export const footerItems: FooterItemType[] = [
  {
    label: "Customer Service",
    links: [
      {
        label: "FAQ",
        href: "#",
      },
      {
        label: "Return & refunds",
        href: "#",
      },
      {
        label: "Terms and conditions",
        href: "#",
      },
      {
        label: "Privacy Policy",
        href: "#",
      },
    ],
  },
  {
    label: "Our Store",
    links: [
      {
        label: "Store locations",
        href: "#",
      },
      {
        label: "Store hours",
        href: "#",
      },
      {
        label: "Store events",
        href: "#",
      },
      {
        label: "Support center",
        href: "#",
      },
    ],
  },
  {
    label: "About us",
    links: [
      {
        label: "Our story",
        href: "#",
      },
      {
        label: "News",
        href: "#",
      },
      {
        label: "Careers with us",
        href: "#",
      },
    ],
  },
  {
    label: "Follow us",
    isIcon: true,
    links: [
      {
        icon: FaFacebook,
        href: "#",
      },
      {
        icon: FaTwitter,
        href: "#",
      },
      {
        icon: FaInstagram,
        href: "#",
      },
    ],
  },
];
