"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { productWithImages } from "@/types";
import { Products } from "./products";
import { User } from "@prisma/client";

interface CategorySectionProps {
  title: string;
  description: string;
  shopAllUrl: string;
  products: productWithImages[];
  user: User | null;
}

export const CategorySection = ({
  title,
  description,
  shopAllUrl,
  products,
  user,
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
      <p className="text-muted-foreground text-sm mb-5">{description}</p>
      <Products products={products} user={user} />
    </section>
  );
};
