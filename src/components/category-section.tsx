"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";

interface CategorySectionProps {
  title: string;
  description: string;
  shopAllUrl: string;
}

export const CategorySection = ({
  title,
  description,
  shopAllUrl,
}: CategorySectionProps) => {
  return (
    <section className="mt-16 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <Link
          href={shopAllUrl}
          className={cn(
            buttonVariants({ variant: "link" }),
            "group text-primary hover:text-primary"
          )}
        >
          Shop the collection
          <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition duration-300" />
        </Link>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </section>
  );
};
