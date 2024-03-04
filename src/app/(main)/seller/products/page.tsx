import { MotionLink } from "@/components/motion-link";
import { PageHeading } from "@/components/page-heading";
import { Products } from "@/components/products";
import { ProductSkeletons } from "@/components/skeletons/product-skeletons";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { PlusCircle } from "lucide-react";
import { Suspense } from "react";

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
      <Suspense fallback={<ProductSkeletons count={12} />}>
        <Products products={products} user={user} />
      </Suspense>
    </div>
  );
};

export default Page;
