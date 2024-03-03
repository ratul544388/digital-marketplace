import { CategorySection } from "@/components/category-section";
import { MotionLink } from "@/components/motion-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center pt-16">
      <h1 className="font-bold text-5xl text-center leading-[56px] max-w-screen-sm">
        Your marketplace for high-quality{" "}
        <span className="text-primary">digital assets.</span>
      </h1>
      <p className="text-muted-foreground text-center max-w-screen-sm">
        Welcome to digital Digital Marketplace. Every asset on our platform is
        verified by our team to ensure our highest quality standards.
      </p>
      <div className="flex justify-center gap-4 mt-8">
        <MotionLink href="/">Browse Tranding</MotionLink>
        <Link
          className={cn(buttonVariants({ variant: "ghost" }), "group")}
          href="/"
        >
          Our Quality Promise
          <ArrowRight className="h-4 w-4 text-muted-foreground ml-2 group-hover:translate-x-1 transition duration-300" />
        </Link>
      </div>
      <CategorySection
        title="Brand new"
        description="Explore more than 10000 icons and ui kits to use in websites, logos and social media"
        shopAllUrl="/explore"
      />
    </div>
  );
}
