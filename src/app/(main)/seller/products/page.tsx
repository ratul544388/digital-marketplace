import { MotionButton } from "@/components/motion-button";
import { MotionLink } from "@/components/motion-link";
import { PageHeading } from "@/components/page-heading";
import { Products } from "@/components/products";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { PlusCircle } from "lucide-react";
import React from "react";

const Page = async () => {
  const user = await currentUser();
  const products = await db.product.findMany({
    where: {
      sellerId: user?.id,
    },
    include: {
      images: true,
    },
  });
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <PageHeading>Your Products</PageHeading>
        <MotionLink href="/seller/products/new">
          Add new
          <PlusCircle className="h-4 w-4 ml-2" />
        </MotionLink>
      </div>
      <Separator />
      {/* <Products products={products} user={user} /> */}
    </div>
  );
};

export default Page;
