import Await from "@/components/await";
import { Products } from "@/components/products";
import { SearchInput } from "@/components/search-input";
import { ProductSkeletons } from "@/components/skeletons/product-skeletons";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { Suspense } from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const user = await currentUser();
  const q = searchParams.q || "";

  const promise = db.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          category: {
            contains: q,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      images: true,
    },
    take: 12,
  });

  return (
    <div className="h-full flex flex-col items-center pt-10">
      <h1 className="text-3xl font-bold">
        Search <span className="text-primary">Icons</span> <span>or</span>{" "}
        <span className="text-primary">UI Kits</span>
      </h1>
      <p className="text-sm text-muted-foreground">
        Search your favorites icons or logos and get it now
      </p>
      <SearchInput className="mb-8" />
      <Suspense fallback={<ProductSkeletons count={12} />} key={Math.random()}>
        <Await promise={promise}>
          {(products) => <Products products={products} user={user} />}
        </Await>
      </Suspense>
    </div>
  );
};

export default SearchPage;
