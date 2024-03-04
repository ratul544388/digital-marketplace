import { getProducts } from "@/actions/products";
import Await from "@/components/await";
import { PageHeading } from "@/components/page-heading";
import { Products } from "@/components/products";
import { ProductSkeletons } from "@/components/skeletons/product-skeletons";
import { Separator } from "@/components/ui/separator";
import { categories } from "@/constants";
import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const category = searchParams.category as (typeof categories)[number];
  if (category && !categories.includes(category)) {
    redirect("/products");
  }

  const user = await currentUser();
  const promise = getProducts({ category });

  return (
    <div className="space-y-4">
      <PageHeading className="capitalize">
        {category || "All Products"}
      </PageHeading>
      <Separator />
      <Suspense fallback={<ProductSkeletons count={12} />} key={Math.random()}>
        <Await promise={promise}>
          {(products) => <Products products={products} user={user} />}
        </Await>
      </Suspense>
    </div>
  );
};

export default Page;
