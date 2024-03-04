"use client";

import { footerItems } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-slate-100 dark:bg-gray-900">
      <div className="p-10 flex flex-wrap justify-between gap-12 max-w-screen-md mx-auto">
        {footerItems.map(({ label, links, isIcon }, index) => (
          <div key={index} className="flex flex-col gap-5 text-sm">
            <h4 className="font-bold">{label}</h4>
            <div className={cn("flex flex-col gap-3.5", isIcon && "flex-row")}>
              {links.map(({ label, href, icon: Icon }, index) => (
                <Link
                  href={href}
                  key={index}
                  className="font-medium hover:underline"
                >
                  {label}
                  {Icon && (
                    <Icon className="h-6 w-6 hover:text-primary transition-colors" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="p-5 text-sm bg-slate-200/60 dark:bg-gray-800 flex items-center justify-center">
        Copyright © 2024 DigitalDepot. All rights reserved.
      </div>
    </footer>
  );
};
