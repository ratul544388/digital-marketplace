import { getProducts } from "@/actions/products";
import { PageHeading } from "@/components/page-heading";
import { Products } from "@/components/products";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/current-user";
import React from "react";

const FavoritesPage = async () => {
  const user = await currentUser();
  const products = await getProducts({ favorites: user?.favorites });
  return (
    <div className="space-y-4">
      <PageHeading>Favorites</PageHeading>
      <Separator />
      <Products products={products} user={user} />
    </div>
  );
};

export default FavoritesPage;
