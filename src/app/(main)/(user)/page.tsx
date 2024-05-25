import { getProducts } from "@/actions/products";
import { CategorySection } from "@/components/category-section";
import { MotionLink } from "@/components/motion-link";
import { buttonVariants } from "@/components/ui/button";
import { currentUser } from "@/lib/current-user";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();
  const brandNew = await getProducts({ category: "brand new", take: 6 });
  const uiKits = await getProducts({ category: "ui kits", take: 6 });
  const icons = await getProducts({ category: "icons", take: 6 });
  return (
    <div className="h-full flex flex-col items-center pt-16">
      <h1 className="font-bold text-5xl text-center leading-[56px] max-w-screen-sm">
        Your marketplace for high-quality{" "}
        <span className="text-primary">digital assets.</span>
      </h1>
      <p className="text-muted-foreground text-center max-w-screen-sm">
        Welcome to DigitalDepot Marketplace. Every asset on our platform is
        verified by our team to ensure our highest quality standards.
      </p>
      <div className="flex justify-center gap-4 mt-8">
        <MotionLink href="/products">Browse Tranding</MotionLink>
        <Link
          className={cn(buttonVariants({ variant: "ghost" }), "group")}
          href="/products"
        >
          Our Quality Promise
          <ArrowRight className="h-4 w-4 text-muted-foreground ml-2 group-hover:translate-x-1 transition duration-300" />
        </Link>
      </div>
      <CategorySection
        title="UI Kits"
        description="Get started building professional looking web apps"
        shopAllUrl="/products"
        products={uiKits}
        user={user}
      />
      <CategorySection
        title="Icons"
        description="Upgrade you designs with high qulity icon sets"
        shopAllUrl="/products"
        products={icons}
        user={user}
      />
    </div>
  );
}
